import React, { useState } from 'react';
import '../styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row, Tooltip } from "reactstrap";
import { faSmile, faMeh, faFrown, faSailboat, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

const items = [
    {
        speaker: 'A',
        text: 'Good evening. Thank you for calling ITC. My name is <strong>Saneera</strong>. asjdnajnocnsjdncsjkdncsjncksncskjncksjcnskjcnskjcnskjcnscksncksdjncskdncskjcnskjcnskdnjcskcnskjcnskcjnskjcnalknxajxajnakjnsancasjdnajnocnsjdncsjkdncsjncksncskjncksjcnskjcnskjcnskjcnscksncksdjncskdncskjcnskjcnskdnjcskcnskjcnskcjnskjcnalknxajxajnakjnsan',
        start: '4.52',
        end: '6.50',
        tone: 'Happy',
        emotion: 'Gratitude',
        sentiment: 'Positive',
        keywords: ['evening', 'calling', 'Saneera'],
        icon: faSmile,
    },
    {
        speaker: 'B',
        text: '<strong>Hello</strong>. Hello sir, I\'m calling from <strong>Chennai</strong>. <strong>Hello</strong> asjdnajnocnsjdncsjkdncsjncksncskjncksjcnskjcnskjcnskjcnscksncksdjncskdncskjcnskjcnskdnjcskcnskjcnskcjnskjcnalknxajxajnakjnsan asjdnajnocnsjdncsjkdncsjncksncskjncksjcnskjcnskjcnskjcnscksncksdjncskdncskjcnskjcnskdnjcskcnskjcnskcjnskjcnalknxajxajnakjnsan',
        start: '4.52',
        end: '6.50',
        tone: 'Neutral',
        emotion: 'Neutral',
        sentiment: 'Neutral',
        keywords: ['Hello', 'Chennai'],
        icon: faMeh,
    },
    {
        speaker: 'A',
        text: 'Very good evening sir. Tell me how can I help you? asjdnajnocnsjdncsjkdncsjncksncskjncksjcnskjcnskjcnskjcnscksncksdjncskdncskjcnskjcnskdnjcskcnskjcnskcjnskjcnalknxajxajnakjnsan asjdnajnocnsjdncsjkdncsjncksncskjncksjcnskjcnskjcnskjcnscksncksdjncskdncskjcnskjcnskdnjcskcnskjcnskcjnskjcnalknxajxajnakjnsan asjdnajnocnsjdncsjkdncsjncksncskjncksjcnskjcnskjcnskjcnscksncksdjncskdncskjcnskjcnskdnjcskcnskjcnskcjnskjcnalknxajxajnakjnsan',
        start: '4.52',
        end: '6.50',
        tone: 'Sad',
        emotion: 'Neutral',
        sentiment: 'Sad',
        keywords: ['evening', 'help'],
        icon: faFrown,
    },
    {
        speaker: 'B',
        text: 'My name is Shankar. <strong>Hello</strong>.',
        start: '4.52',
        end: '6.50',
        tone: 'Neutral',
        emotion: 'Neutral',
        sentiment: 'Neutral',
        keywords: ['name', 'Shankar', 'Hello'],
        icon: faMeh,
    }
];

function Transcript() {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [highlight, setHighlight] = useState(false);

    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
    const toggleHighlight = () => setHighlight(!highlight);

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
                        <div>
                            AI highlight
                            <label className="switch">
                                <input type="checkbox" checked={highlight} onChange={toggleHighlight} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                </Row>
                {items.map((item, index) => (
                    <div className='hilight-background'>
                    <div key={index} className={`transcript-item ${highlight && item.sentiment === 'Sad' ? 'highlight' : ''}`}>
                        <Row>
                            <Col xl={2}>
                                <div className='speaker-details'>
                                    <div>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <span className='speaker-title'>Speaker&nbsp;{item.speaker}</span>
                                            <div style={{ paddingRight: "2px" }}>
                                                <FontAwesomeIcon
                                                    icon={item.icon}
                                                    style={{ fontSize: "20px", color: item.icon === faSmile ? "#2ecc71" : item.icon === faFrown ? "#A91D3A" : "inherit" }}
                                                />
                                            </div>
                                            :
                                        </div>
                                        <span className={`speaker-time ${highlight && item.sentiment === 'Sad' ? 'highlight' : ''}`}>({item.start} - {item.end})</span>
                                    </div>
                                </div>
                            </Col>
                            <Col xl={10}>
                                <div className="details">
                                    <span dangerouslySetInnerHTML={{ __html: item.text }}></span>
                                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", alignItems:"center" }}>
                                        <div style={{display:"flex"}}>
                                            WPM
                                            <div style={{paddingLeft:"5px"}}>
                                                <FontAwesomeIcon icon={faSailboat} />
                                                <span>160</span>
                                            </div>
                                        </div>
                                        <div className="details-buttons">
                                            <div >
                                                
                                                <button className={`details-button ${highlight && item.sentiment === 'Sad' ? 'highlight' : ''}`}>Emotion : {item.emotion}</button>
                                            </div>
                                            <div >
                                                
                                                <button className={`details-button ${highlight && item.sentiment === 'Sad' ? 'highlight' : ''}`}>Tone : {item.tone}</button>
                                            </div> 
                                        </div>
                                    </div>
                                    <div className={`keywords ${highlight && item.sentiment === 'Sad' ? 'highlight' : ''}`}>
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
