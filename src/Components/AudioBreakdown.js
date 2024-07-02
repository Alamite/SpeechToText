import React, { useState, useEffect } from 'react';
import '../styles.css'; // Adjust the path if necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row, Tooltip } from "reactstrap";
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import Transcript from './Transcript';
import Keywords from './Keywords';
import Sentiment from './Sentiment';
import Summary from './Summary';
import TrendLine from './TrendLine';
import AudioEvents from './AudioEvents';
import TopicDetection from './TopicDetection';
import Utterances from './Utterances';
import IDI from './IDI';
// Import other option components as needed
function AudioBreakdown({ selectedOptions, onTextClick, onClicked, currentTime, jsonData }) {

    const [highlight, setHighlight] = useState(false);
    const [translate, setTranslate] = useState(false);

    const activeTab = selectedOptions[0] || 'Transcript';

    const NoFilePage = () => {
        return (<div>Please Select a File to Get Started</div>)
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Transcript':
                return <Transcript key="Transcript" jsonData={jsonData} highlight={highlight} translate={translate} onTextClick={onTextClick} onClicked={onClicked} currentTime={currentTime} />;
            case 'Sentiment':
                return <Sentiment key="Sentiment" jsonData={jsonData} />;
            case 'Topic Detection':
                return <TopicDetection key="TopicDetection" jsonData={jsonData} />;
            case 'Keywords':
                return <Keywords key="Keywords" jsonData={jsonData} />;
            case 'Summarization':
                return <Summary key="Summary" jsonData={jsonData} />;
            case 'Trend Line':
                return <TrendLine key="TrendLine" jsonData={jsonData} />;
            case 'Audio Events':
                return <AudioEvents key="AudioEvents" jsonData={jsonData} />;
            case 'Utterances':
                return <Utterances key="Utterances" jsonData={jsonData} />;
            case 'IDI Classification':
                return <IDI key="IDI" jsonData={jsonData} />;
            case 'No File Selected':
                return <NoFilePage />;
            default:
                return <div>Content not available</div>;
        }
    };

    const toggleHighlight = () => setHighlight(!highlight);
    const toggleTranslate = () => setTranslate(!translate);

    return (
        <div>
            <div className="active-tab-header">
                <div style={{ borderBottom: "2px solid black", display: "flex", justifyContent: "space-between" }}>
                    <div className='tab-heading'>
                        {activeTab}
                    </div>
                    {activeTab === 'Transcript' && (
                        <div style={{ display: "flex" }}>
                            Translate All {/* Toggle to switch between translated and original text */}
                            <label className="switch">
                                <input type="checkbox" checked={translate} onChange={toggleTranslate} />
                                <span className="slider round"></span>
                            </label>
                            <div style={{ width: "10px" }}></div>
                            AI Highlight
                            <label className="switch ai-highlight-switch">
                                <input type="checkbox" checked={highlight} onChange={toggleHighlight} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    )}
                </div>
            </div>
            <div className="breakdown-container">
                <div style={{ width: "100%" }}>
                    {renderTabContent()}
                </div>
            </div>
        </div>
    );
}

export default AudioBreakdown;
