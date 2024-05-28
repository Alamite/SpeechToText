import React from 'react';
import '../styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSailboat, faJetFighter, faCarSide } from '@fortawesome/free-solid-svg-icons';

function Transcript() {

    return (
        <div className='transcript-content'>
            <div className='speaker-title'>Speaker A</div>
            <div>Good evening. Can I get your good name?</div>
            <div className="speech-rate-details">
                <em><FontAwesomeIcon icon={faJetFighter} /></em> 300.27 words per minute &nbsp;&nbsp;&nbsp;&nbsp; 
            </div>

            <p><strong>Speaker B</strong></p>
            <p>My good name is Harisham Palladium.</p>
            <p className="speech-rate-details">
                <em><FontAwesomeIcon icon={faSailboat} /></em> 80.27 words per minute &nbsp;&nbsp;&nbsp;&nbsp; 
            </p>

            <p><strong>Speaker A</strong></p>
            <p>Okay. And may I know what your designation is?</p>
            <p className="speech-rate-details">
                <em><FontAwesomeIcon icon={faCarSide} /></em> 220.27 words per minute &nbsp;&nbsp;&nbsp;&nbsp; 
            </p>
        </div>
    );
}

export default Transcript;
