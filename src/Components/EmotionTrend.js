import React, { useEffect } from 'react';
import anychart from 'anychart';
import 'anychart/dist/css/anychart-ui.css';
import 'anychart/dist/fonts/css/anychart-font.css';

const CustomRangeBarChart = ({ jsonData }) => {
    useEffect(() => {
        const themeSettings = {
            "bar": {
                "defaultSeriesSettings": {
                    "rangeBar": {
                        "normal": {
                            "labels": {
                                "enabled": true,
                                "anchor": "center",
                                "position": "center",
                                "fontFamily": "Courier",
                                "fontSize": 12,
                                "fontColor": "#ffffff",
                                "format": function () {
                                    return this.getData('emotion'); // Display the specific emotion
                                }
                            }
                        }
                    }
                }
            }
        };

        anychart.theme(themeSettings);

        const greenEmotions = [
            'caring', 'gratitude', 'optimism', 'approval', 'love',
            'excitement', 'joy', 'relief', 'admiration', 'pride',
            'surprise', 'amusement'
        ];

        const redEmotions = [
            'anger', 'curiosity', 'remorse', 'annoyance', 'sadness',
            'disapproval', 'disappointment', 'grief', 'fear', 'disgust',
            'nervousness', 'embarrassment', 'confusion'
        ];

        const blueEmotions = [
            'neutral', 'realization', 'desire'
        ];

        const data = [];

        const segments = jsonData.segments;
        const reorderedData = segments.slice().sort((a, b) => {
            return a.speaker_label.localeCompare(b.speaker_label);
        });

        reorderedData.forEach(item => {
            let speaker = item.speaker_label === 'spk_0' ? 'Synthesis Executive' : 'Caller';
            const entry = {
                x: speaker,
                low: parseFloat(item.start_time).toFixed(2),
                high: parseFloat(item.end_time).toFixed(2),
                emotion: item.emotion
            };

            if (greenEmotions.includes(item.emotion.toLowerCase())) {
                entry.color = '#2ecc71'; // Green
            } else if (redEmotions.includes(item.emotion.toLowerCase())) {
                entry.color = '#ff3e29'; // Red
            } else if (blueEmotions.includes(item.emotion.toLowerCase())) {
                entry.color = '#3498db'; // Blue
            }

            data.push(entry);
        });

        anychart.format.inputDateTimeFormat('yyyy-MM-dd HH:mm');

        const dataSet = anychart.data.set(data);
        const mapping = dataSet.mapAs({ x: 'x', low: 'low', high: 'high', fill: 'color', emotion: 'emotion' });

        const chart = anychart.bar();

        chart.tooltip().titleFormat(function () {
            return this.x + ' - ' + this.getData('emotion');
        });

        chart.tooltip().format(function () {
            return 'From: ' + this.low + '\nTo: ' + this.high;
        });

        const series = chart.rangeBar(mapping).xMode('scatter').name('Emotions').stroke(null);

        // Disable the legend for the actual data series
        series.legendItem(false);

        chart.barsPadding(-1);
        chart.pointWidth(30);
        chart.minPointLength(10);

        const yScale = anychart.scales.linear();
        chart.yScale(yScale);
        chart.yScale().ticks().interval(0.30);

        chart.xAxis().labels(true);
        chart.xAxis().labels().width(70);

        chart.yAxis().labels().format(function() {
            const totalSeconds = parseFloat(this.tickValue);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = Math.floor(totalSeconds % 60);
            const hundredths = Math.round((totalSeconds - Math.floor(totalSeconds)) * 100);
            return `${String(minutes).padStart(2, '0')}.${String(seconds).padStart(2, '0')}.${String(hundredths).padStart(2, '0')}`;
        });

        chart.yGrid().enabled(true);
        chart.yGrid().stroke({ color: '#cecece', dash: '10 5' });

        chart.yScroller(true);

        const legend = chart.legend();
        legend.enabled(true);
        legend.position('bottom');
        legend.padding([20, 10, 10, 10]);
        legend.listen('legendItemClick', function (event) {
            event.preventDefault();
        });

        // Add dummy series for legend
        chart.rangeBar([]).name('Positive').fill('#2ecc71').stroke(null);
        chart.rangeBar([]).name('Neutral').fill('#3498db').stroke(null);
        chart.rangeBar([]).name('Negative').fill('#ff3e29').stroke(null);

        chart.container('container').draw();

        return () => {
            chart.dispose();
        };

    }, [jsonData]);

    return <div id="container" style={{ width: '100%', height: '40vh' }}></div>;
};

export default CustomRangeBarChart;
