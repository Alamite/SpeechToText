import React from 'react';
import '../styles.css'; // Import the CSS file

function Sentiment() {
    return (
        <div className="sentiment-content">
            {/* <p><strong>Speaker 0:</strong></p> */}
            <p>Good evening. Thank you for calling ITC. My name is Saneera.</p>
            <p className="sentiment-details">
                <em>Tone:</em> Happy &nbsp;&nbsp;&nbsp;&nbsp; 
                <em>Emotion:</em> gratitude &nbsp;&nbsp;&nbsp;&nbsp; 
                <em>Sentiment Label:</em> Positive
            </p>
            <br/>
            <p>Hello. Hello sir, I'm calling from Chennai. Hello</p>
            <p className="sentiment-details">
                <em>Tone:</em> Neutral &nbsp;&nbsp;&nbsp;&nbsp; 
                <em>Emotion:</em> Neutral &nbsp;&nbsp;&nbsp;&nbsp; 
                <em>Sentiment Label:</em> Neutral
            </p>
        </div>
    );
}

export default Sentiment;
