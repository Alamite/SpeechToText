import React from 'react';
import '../styles.css';
import { TabContent, TabPane } from 'reactstrap';
import Transcript from './Transcript';
import Keywords from './Keywords';
import Sentiment from './Sentiment';
import Summary from './Summary';
// Import other option components as needed

function AudioBreakdown({ selectedOptions }) {
    const activeTab = selectedOptions[0] || 'Transcript';

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Transcript':
                return <Transcript />;
            case 'Sentiment':
                return <Sentiment />;
            case 'Keywords':
                return <Keywords />;
            case 'Summarization':
                return <Summary />;
            // Add cases for other options as needed
            default:
                return <div>Content not available</div>;
        }
    };

    return (
        <div>
            <div className="active-tab-header">
                <div style={{borderBottom:"2px solid black", display:"flex",justifyContent:"space-between"}}>
                <div className='tab-heading'>
                    {activeTab}
                </div>
                <div>
                    {/* Toggle switches */} 
                </div>
                </div>
            </div>
            <div className="breakdown-container">
                <div style={{ width: "100%" }}>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId={activeTab}>
                            {renderTabContent()}
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        </div>
    );
}

export default AudioBreakdown;
