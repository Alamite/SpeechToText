import React from 'react';
import '../styles.css';
import jsonData from '../Data/TranscriptOutput1.json';
import SentimentBarChart from './SentimentBarChart';

function TopicDetection() {
    const { summaries } = jsonData;
    // Remove the first hyphen and split the cohere points into an array
    const coherePoints = jsonData.topic.startsWith('- ')
        ? jsonData.topic.substring(2).split('\n').filter(point => point.trim() !== '')
        : jsonData.topic.split('\n').filter(point => point.trim() !== '');

    return (
        <div className='sentiment-content'>
            <h3>Detected Topics</h3>
            <ul>
                {coherePoints.map((point, index) => (
                    <li key={index}>{point}</li>
                ))}
            </ul>
        </div>
    );
}

export default TopicDetection;
