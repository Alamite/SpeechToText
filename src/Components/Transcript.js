import React, { useState } from 'react';
import '../styles.css'; // Adjust the path if necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row, Tooltip } from "reactstrap";
import { faSmile, faMeh, faFrown, faSailboat, faJetFighter, faCarSide, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import transcriptData from '../Data/TranscriptOutput1.json';  // Corrected path to the JSON file

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
            return 'Synthesis Agent';
        case 'spk_1':
            return 'Caller';
        default:
            return label;
    }
};



function Transcript({ highlight, translate, onTextClick }) {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const items = transcriptData.segments.map(item => ({
        speaker: mapSpeakerLabel(item.speaker_label),
        text: translate ? item.translated_transcript : item.original_transcript, // Display original text or translated text based on the translation toggle
        start: item.start_time.toFixed(2),
        end: item.end_time.toFixed(2),
        tone: item.tone,
        emotion: item.emotion,
        sentiment: item.sentiment_label,
        keywords: item.keywords,
        icon: getIconByEmotion(item.sentiment_label),
        rate_of_speech: item.rate_of_speech.toFixed(0),
        WPMicon: getIconByWPM(item.rate_of_speech),
    }));

    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

    const handleTextClick = (startTime) => {
        // Pass the start time value to the parent component when a text is clicked
        onTextClick(startTime);
    };

    return (
        <div className='transcript-content'>
            <Container fluid>
                <Row>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            WPM <FontAwesomeIcon icon={faCircleInfo} id={`Tooltip`} />
                            <Tooltip placement="top" isOpen={tooltipOpen} target={`Tooltip`} toggle={toggleTooltip}>
                                Words Per Minute
                            </Tooltip>
                        </div>
                    </div>
                </Row>
                {items.map((item, index) => (
                    <div className='highlight-background'>
                        <div key={index} className={`transcript-item ${highlight && item.sentiment === 'Negative' ? 'highlight' : ''}`}  onClick={() => handleTextClick(item.start)}>
                            <Row>
                                <Col xl={2}>
                                    <div className={`speaker-details ${highlight && item.sentiment === 'Negative' ? 'highlight' : ''}`}>
                                        <div>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <span className='speaker-title'>{item.speaker}</span>
                                                <div style={{ paddingRight: "2px" }}>
                                                    <FontAwesomeIcon
                                                        icon={item.icon}
                                                        style={{ fontSize: "18px", color: item.icon === faSmile ? "#2ecc71" : item.icon === faFrown ? "#A91D3A" : "inherit" }}
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
                                        <span dangerouslySetInnerHTML={{ __html: item.text }}></span>
                                        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", alignItems: "center" }}>
                                            <div style={{ display: "flex" }}>

                                                <div style={{ paddingLeft: "5px" }}>
                                                    <FontAwesomeIcon icon={item.WPMicon} />
                                                    <span style={{ paddingRight: "2px" }}>{item.rate_of_speech}</span>
                                                    WPM
                                                </div>
                                            </div>
                                            <div className="details-buttons">
                                                <button className={`details-button ${highlight && item.sentiment === 'Negative' ? 'highlight' : ''}`}>Emotion: {item.emotion}</button>
                                                <button className={`details-button ${highlight && item.sentiment === 'Negative' ? 'highlight' : ''}`}>Tone: {item.tone}</button>
                                            </div>
                                        </div>
                                        <div className={`keywords ${highlight && item.sentiment === 'Negative' ? 'highlight' : ''}`}>
                                            Keywords: {item.keywords.join(', ')}
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