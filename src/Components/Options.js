import React from 'react';
import '../styles.css';
import { optionstext } from '../Data/Optionstext';
import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function Options({ selectedOptions, setSelectedOptions }) {
    const handleCheckboxChange = (optionText) => {
        setSelectedOptions(prevState =>
            prevState.includes(optionText)
                ? prevState.filter(item => item !== optionText)
                : [...prevState, optionText]
        );
    };

    return (
        <div style={{height:"100%"}}>
        <div style={{display:"flex",padding:"15px 2px",justifyContent:"space-between"}}>
                                    <div className='title'>Features</div>
                                    <div className='run-button'>
                    <button type="submit" className="btn run-btn-primary"> <FontAwesomeIcon icon={faPlay} /> Run</button>
                </div>
                                </div>
        <div className="options-container">
            <div style={{width:"100%"}}>
                <div className="scrollable-list">
                    {optionstext.map((option, index) => (
                        <div key={index} className="checkbox-item">
                            <label>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={selectedOptions.includes(option.text)}
                                        onChange={() => handleCheckboxChange(option.text)}
                                    />
                                    <span className="option-text">{option.text}</span>
                                </div>
                                <span className="option-subtext">{option.subtext}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </div>
    );
}

export default Options;
