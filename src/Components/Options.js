import React, { useEffect } from 'react';
import '../styles.css';
import { optionstext } from '../Data/Optionstext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function Options({ selectedOptions, setSelectedOptions }) {
    const handleRadioChange = (optionText) => {
        setSelectedOptions([optionText]); // Set selected option to the clicked option
    };

    useEffect(() => {
        // Ensure 'Transcript' is selected by default
        if (!selectedOptions || selectedOptions.length === 0) {
            setSelectedOptions(['Transcript']);
        }
    }, [selectedOptions, setSelectedOptions]);

    return (
        <div style={{ height: "100%" }}>
            <div style={{ display: "flex", padding: "15px 2px", justifyContent: "space-between" }}>
                <div className='title'>AI Features</div>
                <div className='run-button'>
                    <button type="submit" className="btn run-btn-primary"> <FontAwesomeIcon icon={faPlay} /> Run</button>
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
                                            name="option" // Ensure all radio buttons belong to the same group
                                            checked={selectedOptions.includes(option.text)}
                                            onChange={() => handleRadioChange(option.text)}
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
