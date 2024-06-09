import React, { useEffect } from 'react';
import anychart from 'anychart';
import 'anychart/dist/css/anychart-ui.css';
import 'anychart/dist/fonts/css/anychart-font.css';
import jsonData from '../Data/TranscriptOutput1.json';

const CustomRangeBarChart = () => {
    useEffect(() => {
        const happyData = [];
        const neutralData = [];
        const sadData = [];
        
        const segments = jsonData.segments;

        // Reorder the data so that spk_0 appears first and spk_1 appears last
        const reorderedData = segments.slice().sort((a, b) => {
            return a.speaker_label.localeCompare(b.speaker_label);
        });

        reorderedData.forEach(item => {
          let speaker = item.speaker_label === 'spk_0' ? 'Synthesis Executive' : 'Caller';
          const entry = [speaker, item.start_time, item.end_time];
          const tone = item.tone.toLowerCase();
        
          // Push entry to corresponding tone array
          if (tone === 'happy') {
            happyData.push(entry);
          } else if (tone === 'neutral') {
            neutralData.push(entry);
          } else if (tone === 'sad') {
            sadData.push(entry);
          }
        });
        
        console.log('Happy Data:', happyData);
        console.log('Neutral Data:', neutralData);
        console.log('Sad Data:', sadData);
        // set input dateTime format
        anychart.format.inputDateTimeFormat('yyyy-MM-dd HH:mm');
    
        // create data sets
        const happyDataSet = anychart.data.set(happyData);
        const neutralDataSet = anychart.data.set(neutralData);
        const sadDataSet = anychart.data.set(sadData);
    
        // map the data
        const happyMapping = happyDataSet.mapAs({ x: 0, low: 1, high: 2 });
        const neutralMapping = neutralDataSet.mapAs({ x: 0, low: 1, high: 2 });
        const sadMapping = sadDataSet.mapAs({ x: 0, low: 1, high: 2 });
    
        // get colors from theme
        const themeColors = anychart.theme().length
          ? anychart.theme()[0].palette.items
          : anychart.palettes.defaultPalette;
        const happyColor = '#2ecc71';  // Green for happy
        const neutralColor = themeColors[0] || '#a5a5a5';  // Default neutral color
        const sadColor = '#A91D3A';  // Red for sad
    
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
        chart.rangeBar(happyMapping).xMode('scatter').name('Happy').fill(happyColor).stroke(null);
        chart.rangeBar(neutralMapping).xMode('scatter').name('Neutral').fill(neutralColor).stroke(null);
        chart.rangeBar(sadMapping).xMode('scatter').name('Sad').fill(sadColor).stroke(null);
    
        // set the padding between bars
        chart.barsPadding(-1);
        
        // Increase the width of each segment
          
    
        // create and adjust dateTime Y scale
        var yScale = anychart.scales.linear();
        chart.yScale(yScale);
        chart.yScale().ticks().interval(30);
        
    
        // disable xAxis labels
        chart.xAxis().labels(true);
        chart.xAxis().labels().width(70);

        //Height of bars
        chart.pointWidth(30);
    
        //Minimum Width of bars
        chart.minPointLength(10);

        // adjust Yaxis labels formatting
        chart.yAxis().labels().format(function() {
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
    
      }, []);

  return  <div id="container" style={{ width: '100%', height: '40vh' }}></div>;
};

export default CustomRangeBarChart;
