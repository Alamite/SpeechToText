import React, { useState, useEffect } from 'react';
import '../styles.css'; // Adjust the path if necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row, Tooltip } from "reactstrap";
import { faSmile, faMeh, faFrown, faSailboat, faJetFighter, faCarSide, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import smile from '../Data/positiveEmoji.png';
import meh from '../Data/neutralEmoji.png';
import frown from '../Data/negativeEmoji.png';
import transcriptData from '../Data/TranscriptOutput4.json';  // Corrected path to the JSON file

// Function to map emotion to the corresponding icon
const getIconByEmotion = (sentiment) => {
    switch (sentiment.toLowerCase()) {
        case 'positive':
            return faSmile;
        case 'negative':
            return faFrown;
        default:
            return faMeh;
    }
};

// WPM Icon
const getIconByWPM = (rate) => {
    if (rate < 120) {
        return faSailboat; // Less than 120 is represented by boat
    } else if (rate >= 120 && rate <= 150) {
        return faCarSide; // 120 - 150 is represented by a car icon
    } else {
        return faJetFighter; // 150+ is represented by a plane icon
    }
};

// Function to map speaker labels
const mapSpeakerLabel = (label) => {
    switch (label) {
        case 'spk_0':
            return 'Synthesis Agent';
        case 'spk_1':
            return 'Caller';
        default:
            return label;
    }
};

const getEmojiByEmotion = (sentiment) => {
    switch (sentiment.toLowerCase()) {
        case 'positive':
            return smile;
        case 'negative':
            return frown;
        default:
            return meh;
    }
};

function Transcript({ jsonData, highlight, translate, onTextClick, onClicked, currentTime }) {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [globalTranslate, setGlobalTranslate] = useState(translate);
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        if (jsonData && jsonData.segments) {
            const newItems = jsonData.segments.map(item => ({
                speaker: mapSpeakerLabel(item.speaker_label),
                text: item.original_transcript,
                translated_text: item.translated_transcript,
                start: parseFloat(item.start_time).toFixed(2),
                end: parseFloat(item.end_time).toFixed(2),
                tone: item.tone,
                emotion: item.emotion,
                sentiment: item.sentiment_label,
                keywords: item.keywords,
                icon: getEmojiByEmotion(item.sentiment_label),
                rate_of_speech: parseFloat(item.rate_of_speech).toFixed(0),
                WPMicon: getIconByWPM(item.rate_of_speech),
                translate: translate, // Initial translate state for each item
            }));
            setItems(newItems);
        }
    }, [jsonData, translate]);

    useEffect(() => {
        // Update all items translate state based on the global translate prop
        const newItems = items.map(item => ({
            ...item,
            translate
        }));
        setItems(newItems);
        setGlobalTranslate(translate);
    }, [translate]);

    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

    const handleTextClick = (startTime) => {
        // Pass the start time value to the parent component when a text is clicked
        onTextClick(startTime);
        onClicked(clicked);
        setClicked(!clicked);
    };

    const toggleTranslate = (index, event) => {
        event.stopPropagation();
        const newItems = [...items];
        newItems[index].translate = !newItems[index].translate;
        setItems(newItems);
    };

    return (
        <div className='transcript-content'>
            <Container fluid>
                {items.map((item, index) => (
                    <div key={index} className='highlight-background'>
                        <div 
                            className={`transcript-item ${highlight && item.sentiment === 'Negative' ? 'highlight' : ''}`}  
                        >
                            <Row>
                                <Col xl={2}>
                                    <div className={`speaker-details ${highlight && item.sentiment === 'Negative' ? 'highlight' : ''}`}>
                                        <div>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <span className='speaker-title'>{item.speaker} </span>
                                                <div style={{ paddingRight: "2px" }}>
                                                    <img
                                                        src={item.icon}
                                                        alt={item.sentiment}
                                                        style={{ width: "18px", height: "18px", filter: item.sentiment === 'positive' ? "invert(42%) sepia(70%) saturate(5992%) hue-rotate(105deg) brightness(99%) contrast(92%)" : item.sentiment === 'negative' ? "invert(38%) sepia(74%) saturate(2764%) hue-rotate(329deg) brightness(87%) contrast(88%)" : "inherit" }}
                                                    />
                                                </div>
                                                :
                                            </div>
                                            <span className={`speaker-time ${highlight && item.sentiment === 'Negative' ? 'highlight' : ''}`}>({item.start} - {item.end})</span>
                                        </div>
                                    </div>
                                </Col>
                                <Col xl={10}>
                                    <div className={`details ${highlight && item.sentiment === 'Negative' ? 'highlight' : ''}`}>
                                        <span 
                                            className={`transcript-text ${currentTime >= item.start && currentTime <= item.end ? 'current-time-highlight' : ''}`} 
                                            style={{ fontWeight: "600", fontSize: "16px" }} 
                                            dangerouslySetInnerHTML={{ __html: item.translate ? item.translated_text : item.text }}
                                            onClick={() => handleTextClick(item.start)}
                                        ></span>
                                        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", alignItems: "center" }}>
                                            <div style={{ display: "flex" }}>
                                                <div style={{ paddingLeft: "5px" }}>
                                                    <FontAwesomeIcon icon={item.WPMicon} />
                                                    <span style={{ paddingRight: "2px", paddingLeft:"5px" }}>{item.rate_of_speech}</span>
                                                    WPM
                                                </div>
                                            </div>
                                            <div className="details-buttons">
                                                <button className={`details-button ${highlight && item.sentiment === 'Negative' ? 'highlight' : ''}`}>Emotion: {item.emotion}</button>
                                                {/* <button className={`details-button ${highlight && item.sentiment === 'Negative' ? 'highlight' : ''}`}>Tone: {item.tone}</button> */}
                                            </div>
                                        </div>
                                        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                            <div className={`keywords ${highlight && item.sentiment === 'Negative' ? 'highlight' : ''}`}>
                                                Keywords: {item.keywords.join(', ')}
                                            </div>
                                            <div style={{alignItems:"center"}}>
                                                Translate
                                                <label className="switch">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={item.translate} 
                                                        onChange={(event) => toggleTranslate(index, event)} 
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                ))}
            </Container>
        </div>
    );
}

export default Transcript;
