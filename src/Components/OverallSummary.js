import React from 'react';
import '../styles.css';
import jsonData from '../Data/TranscriptOutput1.json';
import SentimentBarChart from './SentimentBarChart';

function OverallSummary() {
    const { summaries } = jsonData;
    // Remove the first hyphen and split the cohere points into an array
    const coherePoints = summaries.cohere_points.startsWith('- ')
        ? summaries.cohere_points.substring(2).split('\n- ').filter(point => point.trim() !== '')
        : summaries.cohere_points.split('\n- ').filter(point => point.trim() !== '');

    return (
        <div className='transcript-content'>
            <h3>Sequence of events</h3>
            <ul>
                {coherePoints.map((point, index) => (
                    <li key={index}>{point}</li>
                ))}
            </ul>
        </div>
    );
}

export default OverallSummary;
