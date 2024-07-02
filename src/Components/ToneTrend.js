import React, { useEffect } from 'react';
import anychart from 'anychart';
import 'anychart/dist/css/anychart-ui.css';
import 'anychart/dist/fonts/css/anychart-font.css';
// import jsonData from '../Data/TranscriptOutput1.json';

const CustomRangeBarChart = ({jsonData}) => {
    useEffect(() => {
        const slowData = [];
        const mediumData = [];
        const fastData = [];
        
        const segments = jsonData.segments;

        // Reorder the data so that spk_0 appears first and spk_1 appears last
        const reorderedData = segments.slice().sort((a, b) => {
            return a.speaker_label.localeCompare(b.speaker_label);
        });

        reorderedData.forEach(item => {
          let speaker = item.speaker_label === 'spk_0' ? 'Synthesis Executive' : 'Caller';
          const entry = [speaker, parseFloat(item.start_time).toFixed(2), parseFloat(item.end_time).toFixed(2)];
          const wpm = parseFloat(item.rate_of_speech);
        
          // Push entry to corresponding wpm array
          if (wpm < 120) {
            slowData.push(entry);
          } else if (wpm >= 120 && wpm <= 150) {
            mediumData.push(entry);
          } else {
            fastData.push(entry);
          }
        });
        
        // set input dateTime format
        anychart.format.inputDateTimeFormat('yyyy-MM-dd HH:mm');
    
        // create data sets
        const slowDataSet = anychart.data.set(slowData);
        const mediumDataSet = anychart.data.set(mediumData);
        const fastDataSet = anychart.data.set(fastData);
    
        // map the data
        const slowMapping = slowDataSet.mapAs({ x: 0, low: 1, high: 2 });
        const mediumMapping = mediumDataSet.mapAs({ x: 0, low: 1, high: 2 });
        const fastMapping = fastDataSet.mapAs({ x: 0, low: 1, high: 2 });
    
     
        const slowColor = '#3498db';  // Green for happy
        const mediumColor = '#2ecc71';  // Default neutral color
        const fastColor = '#ff3e29';  // Red for sad
    
        
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
        chart.rangeBar(slowMapping).xMode('scatter').name('Slow').fill(slowColor).stroke(null);
        chart.rangeBar(mediumMapping).xMode('scatter').name('Medium').fill(mediumColor).stroke(null);
        chart.rangeBar(fastMapping).xMode('scatter').name('Fast').fill(fastColor).stroke(null);
    
        // set the padding between bars
        chart.barsPadding(-1);
        
        // Increase the width of each segment
          
    
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
        chart.yAxis().labels().format(function() {
          const totalSeconds = parseFloat(this.tickValue);
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = Math.floor(totalSeconds % 60);
          const hundredths = Math.round((totalSeconds - Math.floor(totalSeconds)) * 100);
          return `${String(minutes).padStart(2, '0')}.${String(seconds).padStart(2, '0')}.${String(hundredths).padStart(2, '0')}`;
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

  return  <div id="container" style={{ width: '100%', height: '40vh' }}></div>;
};

export default CustomRangeBarChart;
