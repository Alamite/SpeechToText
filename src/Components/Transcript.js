import React, { useState, useEffect, useRef } from 'react';
import '../styles.css'; // Adjust the path if necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row, Tooltip } from "reactstrap";
import { faSmile, faMeh, faFrown, faSailboat, faJetFighter, faCarSide, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import smile from '../Data/positiveGreen.png';
import meh from '../Data/neutralYellow.png';
import frown from '../Data/negativeIcon2.png';


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

const getIconByWPM = (rate) => {
    if (rate < 120) {
        return faSailboat;
    } else if (rate >= 120 && rate <= 150) {
        return faCarSide;
    } else {
        return faJetFighter;
    }
};

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
    const [diarization, setDiarization] = useState();
    const [items, setItems] = useState([]);
    const transcriptRef = useRef(null);
    const [paragraphs, setParagraphs] = useState("Loading");

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
                translate: translate,
            }));
            setItems(newItems);

            if("diarization" in jsonData && jsonData.diarization == false)
            {
                setDiarization(false);
                const text =  jsonData.segments[0].original_transcript;

                // Matches text ending with . ! or ?
                const sentences = text.match(/[^.!?]+[.!?]+/g) || []; 
    
                // Define the chunk size for how many sentences before a line break
                const chunkSize = 25; 
                const chunks = [];
            
                // Group sentences into chunks of 8
                for (let i = 0; i < sentences.length; i += chunkSize) {
                  chunks.push(sentences.slice(i, i + chunkSize).join(' '));
                }
            
                // Join the chunks with '\n' to insert newlines after every 8 sentences
                setParagraphs(chunks.join('\n'));

            }
                
            else
                setDiarization(true);
        }
    }, [jsonData, translate]);

    useEffect(() => {
        const currentItem = items.find(item => currentTime >= item.start && currentTime <= item.end);
        if (currentItem) {
            const index = items.indexOf(currentItem);
            const itemRef = document.getElementById(`transcript-item-${index}`);
            if (itemRef && transcriptRef.current) {
                const itemTop = itemRef.offsetTop;
                const itemBottom = itemTop + itemRef.offsetHeight;
                const parentScrollTop = transcriptRef.current.scrollTop;
                const parentHeight = transcriptRef.current.clientHeight;
    
                if (itemTop < parentScrollTop || itemBottom > parentScrollTop + parentHeight) {
                    itemRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        }
    }, [currentTime, items]);

    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

    const handleTextClick = (startTime) => {
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
        <div className='transcript-content' ref={transcriptRef}>
            <Container fluid style={{padding:"none !important"}}>
                {diarization? <div>

                
                {items.map((item, index) => (
                    <div key={index} className='highlight-background' id={`transcript-item-${index}`}>
                        <div 
                            className={`transcript-item ${highlight && item.sentiment === 'Negative' ? 'highlight' : ''}`}  
                        >
                            <Row>
                                <Col xl={2}>
                                    <div className={`speaker-details ${highlight && item.sentiment === 'Negative' ? 'highlight' : ''}`}>
                                        <div>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <span className='speaker-title'>{item.speaker} </span>
                                                <div style={{ paddingRight: "2px", marginBottom:"2px"}}>
                                                    <img
                                                        src={item.icon}
                                                        alt={item.sentiment}
                                                        style={{ width: "22px", height: "22px", filter: item.sentiment === 'positive' ? "invert(42%) sepia(70%) saturate(5992%) hue-rotate(105deg) brightness(99%) contrast(92%)" : item.sentiment === 'negative' ? "invert(38%) sepia(74%) saturate(2764%) hue-rotate(329deg) brightness(87%) contrast(88%)" : "inherit" }}
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
            </div> :<div>
            <div className='sentiment-content'>
  
            {paragraphs.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
      ))}
 
        </div>
                </div>}
            </Container>
        </div>
    );
}

export default Transcript;
