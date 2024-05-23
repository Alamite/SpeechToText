import React from 'react';
import '../styles.css';
import { optionstext } from '../Data/Optionstext';
import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function Options({ selectedOptions, setSelectedOptions }) {
    // const options = [
    //     { text: 'Summarization', subtext: 'Generate a summary of the content' },
    //     { text: 'Option 2', subtext: 'Description for option 2' },
    //     { text: 'Option 3', subtext: 'Description for option 3' },
    //     { text: 'Option 4', subtext: 'Description for option 4' },
    //     { text: 'Option 5', subtext: 'Description for option 5' },
    //     { text: 'Option 6', subtext: 'Description for option 6' },
    //     { text: 'Option 7', subtext: 'Description for option 7' },
    //     { text: 'Option 8', subtext: 'Description for option 8' },
    //     { text: 'Option 9', subtext: 'Description for option 9' },
    //     { text: 'Option 10', subtext: 'Description for option 10' },
    // ];

    const handleCheckboxChange = (optionText) => {
        setSelectedOptions(prevState =>
            prevState.includes(optionText)
                ? prevState.filter(item => item !== optionText)
                : [...prevState, optionText]
        );
    };

    return (
        <div>
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
