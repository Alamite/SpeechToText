import React, { useEffect } from 'react';
import anychart from 'anychart';
import 'anychart/dist/js/anychart-ui.min.js';
import 'anychart/dist/js/anychart-exports.min.js';
import 'anychart/dist/css/anychart-ui.min.css';
import 'anychart/dist/fonts/css/anychart-font.min.css';
import jsonData from '../Data/TranscriptOutput.json'; // Import the JSON data

const sentimentToValue = (sentiment) => {
  switch (sentiment.toLowerCase()) {
    case 'positive':
      return 1;
    case 'neutral':
      return 0;
    case 'negative':
      return -1;
    default:
      return 0;
  }
};
function LineChart() {
    useEffect(() => {
      // Process data to create series based on speaker_label
      const chartData = [];
  
      // Iterate through the JSON data
      jsonData.forEach(item => {
        const value = sentimentToValue(item.sentiment_label);
        const endTime = item.end_time;
        
        // Determine which speaker's data to update
        if (item.speaker_label === 'spk_0') {
          // Find the corresponding entry for speaker 0 or create a new one
          let entry = chartData.find(entry => entry.time === endTime);
          if (!entry) {
            entry = { time: endTime, sentiment_spk0: value, sentiment_spk1: null };
            chartData.push(entry);
          } else {
            entry.sentiment_spk0 = value;
          }
        } else if (item.speaker_label === 'spk_1') {
          // Find the corresponding entry for speaker 1 or create a new one
          let entry = chartData.find(entry => entry.time === endTime);
          if (!entry) {
            entry = { time: endTime, sentiment_spk0: null, sentiment_spk1: value };
            chartData.push(entry);
          } else {
            entry.sentiment_spk1 = value;
          }
        }
      });
  
      // Fill in 0 where values are not available
      chartData.forEach(entry => {
        if (entry.sentiment_spk0 === null) {
          entry.sentiment_spk0 = 0;
        }
        if (entry.sentiment_spk1 === null) {
          entry.sentiment_spk1 = 0;
        }
      });
  
      console.log(chartData);
  
          // Create line chart
    const chart = anychart.line();

    // Turn on chart animation
    chart.animation(true);

    // Set chart padding
    chart.padding([10, 20, 5, 20]);

    // Turn on the crosshair
    chart.crosshair().enabled(true).yLabel(false).yStroke(null);

    // Set tooltip mode to point
    chart.tooltip().positionMode('point');

    // Set chart title text settings
    chart.title('Sentiment Analysis by Speaker');

    // Set yAxis title
    chart.yAxis().title('Sentiment');
    chart.xAxis().title('End Time');
    chart.xAxis().labels().padding(5);

    // Create series with chartData
    const series = chart.line(chartData.map(entry => [entry.time, entry.sentiment_spk0]));
    series.name('Speaker 0');
    series.hovered().markers().enabled(true).type('circle').size(4);
    series.tooltip().position('right').anchor('left-center').offsetX(5).offsetY(5);

    // Create second series
    const secondSeries = chart.line(chartData.map(entry => [entry.time, entry.sentiment_spk1]));
    secondSeries.name('Speaker 1');
    secondSeries.hovered().markers().enabled(true).type('circle').size(4);
    secondSeries.tooltip().position('right').anchor('left-center').offsetX(5).offsetY(5);

    // Turn the legend on
    chart.legend().enabled(true).fontSize(13).padding([0, 0, 10, 0]);

    // Set container id for the chart
    chart.container('chart-container');
    // Initiate chart drawing
    chart.draw();

    // Cleanup function to dispose of the chart when the component unmounts
    return () => {
      chart.dispose();
    };
    }, []);
  
    return <div id="chart-container" style={{ width: '100%', height: '100%' }}></div>;
  }
  
  export default LineChart;