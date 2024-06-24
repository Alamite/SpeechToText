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
    // const [jsonData, setJsonData] = useState(null);

    const activeTab = selectedOptions[0] || 'Transcript';

    // useEffect(() => {
    //     if (selectedFile) {
    //         const fetchData = async () => {
    //             try {
    //                 console.log('Fetching JSON file:', `/api/files/${selectedFile.folder}/${selectedFile.file}`);
    //                 const response = await fetch(`http://localhost:3001/api/files/${selectedFile.folder}/${selectedFile.file}`);
    //                 console.log('Response:', response); // Log the response

    //                 if (!response.ok) {
    //                     throw new Error('Network response was not ok');
    //                 }

    //                 // Read the response stream
    //                 const text = await response.text();
    //                 // console.log(text);
    //                 const data = JSON.parse(text);
    //                 console.log('JSON Data:', data); // Log the JSON data
    //                 setJsonData(data); // Store JSON data in state
    //             } catch (error) {
    //                 console.error('Error fetching JSON file:', error);
    //             }
    //         };

    //         fetchData();
    //     }
    // }, [selectedFile]);

    const NoFilePage = () => {
        return (<div>Please Select a File to Get Started</div>)
    }
    const renderTabContent = () => {
        switch (activeTab) {
            case 'Transcript':
                return <Transcript jsonData={jsonData} highlight={highlight} translate={translate} onTextClick={onTextClick} onClicked={onClicked} currentTime={currentTime} />;
            case 'Sentiment':
                return <Sentiment jsonData={jsonData}/>;
            case 'Topic Detection':
                return <TopicDetection jsonData={jsonData}/>;
            case 'Keywords':
                return <Keywords jsonData={jsonData}/>;
            case 'Summarization':
                return <Summary jsonData={jsonData}/>;
            case 'Trend Line':
                return <TrendLine jsonData={jsonData}/>;
            case 'Audio Events':
                return <AudioEvents jsonData={jsonData}/>;
            case 'Utterances':
                return <Utterances jsonData={jsonData}/>;
            case 'IDI Classification':
                return <IDI jsonData={jsonData}/>;
            case 'No File Selected':
                    return <NoFilePage/>;
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
                            Translate All {/* Toggle to switch between translated and original text */}
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
