import React, { useState } from 'react';
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
// Import other option components as needed

function AudioBreakdown({ selectedOptions, onTextClick, onClicked }) {

    const [highlight, setHighlight] = useState(false);
    const [translate, setTranslate] = useState(false);

    const activeTab = selectedOptions[0] || 'Transcript';

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Transcript':
                return <Transcript highlight={highlight} translate={translate} onTextClick={onTextClick} onClicked={onClicked} />;
            case 'Sentiment':
                return <Sentiment />;
            case 'Keywords':
                return <Keywords />;
            case 'Summarization':
                return <Summary />;
            case 'Trend Line':
                return <TrendLine/>;
            case 'Audio Events':
                return <AudioEvents/>;
            // Add cases for other options as needed
            default:
                return <div>Content not available</div>;
        }
    };

    const toggleHighlight = () => setHighlight(!highlight);
    const toggleTranslate = () => setTranslate(!translate);

    return (
        <div>
            <div className="active-tab-header">
                <div style={{borderBottom:"2px solid black", display:"flex",justifyContent:"space-between"}}>
                    <div className='tab-heading'>
                        {activeTab}
                    </div>
                    {activeTab === 'Transcript' && (
                        <div style={{display:"flex"}}>
                            Translate {/* Toggle to switch between translated and original text */}
                            <label className="switch">
                                <input type="checkbox" checked={translate} onChange={toggleTranslate} />
                                <span className="slider round"></span>
                            </label>
                            <div style={{width:"10px"}}></div>
                            AI Highlight
                            <label className="switch">
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
