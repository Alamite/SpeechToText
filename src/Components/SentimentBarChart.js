import React, { useEffect, useState } from 'react';
import anychart from 'anychart';
// import 'anychart/dist/css/anychart.css';
import transcriptData from '../Data/TranscriptOutput1.json';

const SentimentBarChart = () => {
    const [sentimentPercentages, setSentimentPercentages] = useState(null);

    useEffect(() => {
        // Calculate the sentiment percentages
        const calculateSentimentPercentages = () => {
            const sentiments = transcriptData.segments.map(segment => segment.sentiment_label.toLowerCase());
            const totalSentiments = sentiments.length;

            const sentimentCounts = sentiments.reduce((acc, sentiment) => {
                if (acc[sentiment]) {
                    acc[sentiment]++;
                } else {
                    acc[sentiment] = 1;
                }
                return acc;
            }, { neutral: 0, positive: 0, negative: 0 });

            const percentages = {
                neutral: (sentimentCounts.neutral / totalSentiments) * 100,
                positive: (sentimentCounts.positive / totalSentiments) * 100,
                negative: (sentimentCounts.negative / totalSentiments) * 100
            };

            setSentimentPercentages(percentages);
        };

        calculateSentimentPercentages();
    }, []);

    useEffect(() => {
        if (sentimentPercentages) {
            // Create data set
            const dataSet = anychart.data.set([
                ['Sentiment', sentimentPercentages.neutral, sentimentPercentages.positive, sentimentPercentages.negative]
            ]);

            // Map data for each series
            const neutralSeriesData = dataSet.mapAs({ x: 0, value: 1 });
            const positiveSeriesData = dataSet.mapAs({ x: 0, value: 2 });
            const negativeSeriesData = dataSet.mapAs({ x: 0, value: 3 });

            // Create bar chart
            const chart = anychart.bar();

            // Turn on chart animation
            chart.animation(true);

            // Force chart to stack values by Y scale
            chart.yScale().stackMode('percent');

            // Set chart title
            // chart.title('Sentiment Analysis');

            // Set yAxis labels formatting
            chart.yAxis(0).labels().format('{%Value}%');

              // Disable axis labels
              chart.xAxis().labels().enabled(false);
              chart.yAxis().labels().enabled(false);

              // Disable axis lines
              chart.xAxis().stroke(null);
              chart.yAxis().stroke(null);


            // Helper function to setup label settings for all series
            const setupSeriesLabels = (series, name, color) => {
                series.name(name).stroke('3 #fff 1').fill(color);
                series.hovered().stroke('3 #fff 1');
            };

            // Create and configure series
            let series;

            series = chart.bar(neutralSeriesData);
                setupSeriesLabels(series, 'Neutral', '#3498db'); // Blue color for neutral

                series = chart.bar(positiveSeriesData);
                setupSeriesLabels(series, 'Positive', '#2ecc71'); // Green color for positive

                series = chart.bar(negativeSeriesData); 
                setupSeriesLabels(series, 'Negative', '#e74c3c'); // Red color for negative

            // Set bar height
            chart.pointWidth(30);

            // Turn on legend
            chart.legend().enabled(true).fontSize(14).padding([0, 0, 15, 0]);
            chart.legend().position('bottom');

            chart.interactivity().hoverMode('by-x');

            chart.tooltip().displayMode('union').valuePostfix('%').format('{%Value}{decimalsCount:1}%');

            // Set container id for the chart
            chart.container('container');

            // Initiate chart drawing
            chart.draw();

            return () => {
                chart.dispose();
            };
        }
    }, [sentimentPercentages]);

    return (
        <div id="container" style={{ width: '100%', height: '150px' }}></div>
    );
};

export default SentimentBarChart;
