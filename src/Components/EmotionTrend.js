import React, { useEffect } from 'react';
import anychart from 'anychart';
import 'anychart/dist/css/anychart-ui.css';
import 'anychart/dist/fonts/css/anychart-font.css';
import jsonData from '../Data/TranscriptOutput1.json';

const CustomRangeBarChart = ({jsonData}) => {
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
                                "format": function() {
                                    return this.seriesName; // Display the emotion
                                }
                            }
                        }
                    }
                }
            }
        };

        anychart.theme(themeSettings);

        const surpriseData = [];
        const neutralData = [];
        const angerData = [];
        const sadnessData = [];

        const segments = jsonData.segments;
        // Reorder the data so that spk_0 appears first and spk_1 appears last
        const reorderedData = segments.slice().sort((a, b) => {
            return a.speaker_label.localeCompare(b.speaker_label);
        });

        reorderedData.forEach(item => {
            let speaker = item.speaker_label === 'spk_0' ? 'Synthesis Executive' : 'Caller';
            const entry = [speaker, item.start_time, item.end_time];
            const emotion = item.emotion.toLowerCase();

            // Push entry to corresponding emotion array
            if (emotion === 'surprise') {
                surpriseData.push(entry);
            } else if (emotion === 'neutral') {
                neutralData.push(entry);
            } else if (emotion === 'anger') {
                angerData.push(entry);
            } else if (emotion === 'sadness') {
                sadnessData.push(entry);
            }
        });

        anychart.format.inputDateTimeFormat('yyyy-MM-dd HH:mm');

        // create data sets
        const surpriseDataSet = anychart.data.set(surpriseData);
        const neutralDataSet = anychart.data.set(neutralData);
        const angerDataSet = anychart.data.set(angerData);
        const sadnessDataSet = anychart.data.set(sadnessData);

        // map the data
        const surpriseMapping = surpriseDataSet.mapAs({ x: 0, low: 1, high: 2 });
        const neutralMapping = neutralDataSet.mapAs({ x: 0, low: 1, high: 2 });
        const angerMapping = angerDataSet.mapAs({ x: 0, low: 1, high: 2 });
        const sadnessMapping = sadnessDataSet.mapAs({ x: 0, low: 1, high: 2 });

        // define colors for each emotion
        const surpriseColor = '#2ecc71';
        const neutralColor = '#a5a5a5';
        const angerColor = '#ff3e29';
        const sadnessColor = '#ff3e29';

        // create a chart
        const chart = anychart.bar();

        // set formatter for the chart tooltip's title
        chart.tooltip().titleFormat(function () {
            return this.x + ' - ' + this.seriesName;
        });

        // set formatter for the chart tooltip's content
        chart.tooltip().format(function () {
            return 'From: ' + this.low + '\nTo: ' + this.high;
        });

        // create series with mapped data and set the series settings
        chart.rangeBar(surpriseMapping).xMode('scatter').name('Surprise').fill(surpriseColor).stroke(null);
        chart.rangeBar(neutralMapping).xMode('scatter').name('Neutral').fill(neutralColor).stroke(null);
        chart.rangeBar(angerMapping).xMode('scatter').name('Anger').fill(angerColor).stroke(null);
        chart.rangeBar(sadnessMapping).xMode('scatter').name('Sadness').fill(sadnessColor).stroke(null);

        // set the padding between bars
        chart.barsPadding(-1);

        // Increase the width of each segment
        chart.pointWidth(30);

        // Minimum Width of bars
        chart.minPointLength(10);

        // create and adjust dateTime Y scale
        var yScale = anychart.scales.linear();
        chart.yScale(yScale);
        chart.yScale().ticks().interval(30);

        // disable xAxis labels
        chart.xAxis().labels(true);
        chart.xAxis().labels().width(70);

        // adjust Yaxis labels formatting
        chart.yAxis().labels().format(function () {
            const totalSeconds = parseFloat(this.tickValue);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        });

        // enable Y grids
        chart.yGrid().enabled(true);

        // adjust grids appearance
        chart.yGrid().stroke({ color: '#cecece', dash: '10 5' });

        chart.yScroller(true);

        // enable chart legend
        const legend = chart.legend();
        legend.enabled(true);

        // place the legend at the bottom of the chart
        legend.position('bottom');
        legend.padding([20, 10, 10, 10]);

        // disable legend item click
        legend.listen('legendItemClick', function (event) {
            event.preventDefault();
        });

        // set container and render the chart
        chart.container('container').draw();

        return () => {
            chart.dispose();
        };

    }, [jsonData]);

    return <div id="container" style={{ width: '100%', height: '40vh' }}></div>;
};

export default CustomRangeBarChart;
