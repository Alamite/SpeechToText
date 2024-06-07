import React, { useEffect } from 'react';
import anychart from 'anychart';
import 'anychart/dist/js/anychart-ui.min.js';
import 'anychart/dist/js/anychart-exports.min.js';
import 'anychart/dist/js/anychart-tag-cloud.min.js';
import 'anychart/dist/css/anychart-ui.min.css';
import 'anychart/dist/fonts/css/anychart-font.min.css';
import jsonData from '../Data/TranscriptOutput.json'; // Import the JSON data

function WordCloud() {
  useEffect(() => {
    // Extract keywords from the JSON data
    const keywords = {};
    jsonData.forEach(item => {
      item.keywords.forEach(keyword => {
        if (keywords[keyword]) {
          keywords[keyword]++;
        } else {
          keywords[keyword] = 1;
        }
      });
    });

    // Format the keywords for AnyChart
    const formattedData = Object.keys(keywords).map(key => ({
      x: key,
      value: keywords[key]
    }));

    // Create tag cloud
    var chart = anychart.tagCloud();
    // Set data with local array
    chart.data(formattedData);
    // Set chart title
    chart
      .title('Keywords from Local JSON Data')
      // Set array of angles, by which words will be placed
      .angles([0])
      // Enable color range
      .colorRange(true)
      // Set color scale
      .colorScale(anychart.scales.ordinalColor())
      // Set settings for normal state
      .normal({
        fontFamily: 'Times New Roman'
      })
      // Set settings for hovered state
      .hovered({
        fill: '#df8892'
      })
      // Set settings for selected state
      .selected({
        fill: '#df8892',
        fontWeight: 'bold'
      });

    // Set container id for the chart
    chart.container('container');
    // Initiate chart drawing
    chart.draw();

    // Cleanup function to dispose of the chart when the component unmounts
    return () => {
      chart.dispose();
    };
  }, []);

  return <div id="container" style={{ width: '100%', height: '60vh' }}></div>;
}

export default WordCloud;
