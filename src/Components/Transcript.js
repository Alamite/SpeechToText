import React from 'react';
import '../styles.css'

function Transcript() {
    return (
        <div className='transcript-content'>
            <p><strong>Speaker 0:</strong></p>
            <p>Good evening. Can I get your good name?</p>
            <p className="speech-rate-details">
                <em>Rate of speech:</em> 300.27 words per minute &nbsp;&nbsp;&nbsp;&nbsp; 
            </p>

            <p><strong>Speaker 1:</strong></p>
            <p>My good name is Harisham Palladium.</p>
            <p className="speech-rate-details">
                <em>Rate of speech:</em> 300.27 words per minute &nbsp;&nbsp;&nbsp;&nbsp; 
            </p>

            <p><strong>Speaker 0:</strong></p>
            <p>Okay. And may I know what your designation is?</p>
            <p className="speech-rate-details">
                <em>Rate of speech:</em> 300.27 words per minute &nbsp;&nbsp;&nbsp;&nbsp; 
            </p>
        </div>
    );
}

export default Transcript;
