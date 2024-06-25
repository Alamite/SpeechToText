import React, { useEffect } from 'react';
import anychart from 'anychart';
import 'anychart/dist/css/anychart-ui.css';
import 'anychart/dist/fonts/css/anychart-font.css';
import jsonData from '../Data/TranscriptOutput4.json';

const CustomRangeBarChart = ({jsonData}) => {
    useEffect(() => {
        const positiveData = [];
        const neutralData = [];
        const negativeData = [];
        
        const segments = jsonData.segments;

        // Reorder the data so that spk_0 appears first and spk_1 appears last
        const reorderedData = segments.slice().sort((a, b) => {
            return a.speaker_label.localeCompare(b.speaker_label);
        });

        reorderedData.forEach(item => {
          let speaker = item.speaker_label === 'spk_0' ? 'Synthesis Executive' : 'Caller';
          const entry = [speaker, parseFloat(item.start_time).toFixed(2), parseFloat(item.end_time).toFixed(2)];
          const sentiment = item.sentiment_label.toLowerCase();
        
          // Push entry to corresponding sentiment array
          if (sentiment === 'positive') {
            positiveData.push(entry);
          } else if (sentiment === 'neutral') {
            neutralData.push(entry);
          } else if (sentiment === 'negative') {
            negativeData.push(entry);
          }
        });
        
        console.log('Positive Data:', positiveData);
        console.log('Neutral Data:', neutralData);
        console.log('Negative Data:', negativeData);
        // set input dateTime format
        anychart.format.inputDateTimeFormat('yyyy-MM-dd HH:mm');
    
        // create data sets
        const positiveDataSet = anychart.data.set(positiveData);
        const neutralDataSet = anychart.data.set(neutralData);
        const negativeDataSet = anychart.data.set(negativeData);
    
        // map the data
        const positiveMapping = positiveDataSet.mapAs({ x: 0, low: 1, high: 2 });
        const neutralMapping = neutralDataSet.mapAs({ x: 0, low: 1, high: 2 });
        const negativeMapping = negativeDataSet.mapAs({ x: 0, low: 1, high: 2 });
    
        // get colors from theme
        // const themeColors = anychart.theme().length
        //   ? anychart.theme()[0].palette.items
        //   : anychart.palettes.defaultPalette;
        const positiveColor = '#2ecc71';
        const neutralColor =  '#a5a5a5';
        const negativeColor =  '#ff3e29';
    
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
        chart.rangeBar(positiveMapping).xMode('scatter').name('Positive').fill(positiveColor).stroke(null);
        chart.rangeBar(neutralMapping).xMode('scatter').name('Neutral').fill(neutralColor).stroke(null);
        chart.rangeBar(negativeMapping).xMode('scatter').name('Negative').fill(negativeColor).stroke(null);
    
        // set the padding between bars
        chart.barsPadding(-1);
        
        // set the padding between bar groups
        chart.barGroupsPadding(1);
        // create and adjust dateTime Y scale
        var yScale = anychart.scales.linear();
        chart.yScale(yScale);
        chart.yScale().ticks().interval(0.30);
        
    
        // disable xAxis labels
        chart.xAxis().labels(true);
        chart.xAxis().labels().width(70);

        //Height of bars
        chart.pointWidth(30);
    
        //Minimum Width of bars
        chart.minPointLength(10);

        // adjust Yaxis labels formatting
        chart.yAxis().labels().format(
          function() {
              const totalSeconds = parseFloat(this.tickValue);
              const minutes = Math.floor(totalSeconds / 60);
              const seconds = totalSeconds % 60;
              return `${minutes}.${seconds.toString().padStart(2, '0')}`;
          }
      );
    
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

  return  <div id="container" style={{ width: '100%', height: '40vh' }}></div>;
};

export default CustomRangeBarChart;
