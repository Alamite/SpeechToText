import React, { useEffect } from 'react';
import anychart from 'anychart';
import 'anychart/dist/js/anychart-ui.min.js';
import 'anychart/dist/js/anychart-exports.min.js';
import 'anychart/dist/js/anychart-tag-cloud.min.js';
import 'anychart/dist/css/anychart-ui.min.css';
import 'anychart/dist/fonts/css/anychart-font.min.css';
import jsonData from '../Data/TranscriptOutput4.json'; // Import the JSON data

function WordCloud({jsonData}) {
  useEffect(() => {
    // Extract and format keywords from the JSON data
    const keywords = {};
    jsonData.segments.forEach(item => {
      const category = item.speaker_label === 'spk_0' ? 'Synthesis Agent' : 'Caller';
      item.keywords.forEach(keyword => {
        if (keywords[keyword]) {
          keywords[keyword].value++;
        } else {
          keywords[keyword] = { value: 1, category: category };
        }
      });
    });

    // Format the keywords for AnyChart
    const formattedData = Object.keys(keywords).map(key => ({
      x: key,
      value: keywords[key].value,
      category: keywords[key].category
    }));

    // Create a chart and set the data
    var chart = anychart.tagCloud(formattedData);

    // Create and configure a color scale
    var customColorScale = anychart.scales.ordinalColor();
    customColorScale.colors(["#3498db", "#e74c3c"]); // Colors for Synthesis Agent and Caller

    // Set the color scale as the color scale of the chart
    chart.colorScale(customColorScale);

    chart.angles([0]);

    // Add a color range
    chart.colorRange().enabled(true);

    // Set the chart title
    chart.title("Tag Cloud Chart: Synthesis Agent vs Caller");

    // Set the container id
    chart.container("container");

    // Initiate drawing the chart
    chart.draw();

    // Cleanup function to dispose of the chart when the component unmounts
    return () => {
      chart.dispose();
    };
  }, []);

  return <div id="container" style={{ width: '100%', height: '60vh' }}></div>;
}

export default WordCloud;
