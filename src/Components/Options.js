import React, { useEffect, useState } from 'react';
import '../styles.css';
import { optionstext } from '../Data/Optionstext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function Options({ selectedOptions, setSelectedOptions, onRun, isEnabled }) {
    const handleRadioChange = (optionText) => {
        setSelectedOptions([optionText]);
    };

    useEffect(() => {
        if (!selectedOptions || selectedOptions.length === 0) {
            setSelectedOptions(['Transcript']);
        }
    }, [selectedOptions, setSelectedOptions]);

    const handleRunClick = () => {
        setSelectedOptions(['Transcript']);
        onRun();
    };

    return (
        <div style={{ height: "100%" }}>
            <div style={{ display: "flex", padding: "15px 2px", justifyContent: "space-between" }}>
                <div className='title'>AI Features</div>
                <div className='run-button'>
                    <button type="submit" className="btn run-btn-primary" onClick={handleRunClick}>
                        <FontAwesomeIcon icon={faPlay} /> Run
                    </button>
                </div>
            </div>
            <div className="options-container">
                <div style={{ width: "100%" }}>
                    <div className="scrollable-list">
                        {optionstext.map((option, index) => (
                            <div key={index} className="checkbox-item">
                                <label>
                                    <div>
                                        <input
                                            type="radio"
                                            name="option"
                                            checked={selectedOptions.includes(option.text)}
                                            onChange={() => handleRadioChange(option.text)}
                                            disabled={!isEnabled} // Disable based on 'isEnabled' prop
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
