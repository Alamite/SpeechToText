import React from 'react';
import '../styles.css';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import Transcript from './Transcript';
import Keywords from './Keywords';
import Sentiment from './Sentiment';
import Summary from './Summary';
// Import other option components as needed

function AudioBreakdown({ selectedOptions }) {
    const optionsWithTranscript = ['Transcript', ...selectedOptions.filter(option => option !== 'Transcript')];
    const [activeTab, setActiveTab] = React.useState('Transcript');

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    React.useEffect(() => {
        if (!optionsWithTranscript.includes(activeTab)) {
            setActiveTab(optionsWithTranscript[0] || '');
        }
    }, [optionsWithTranscript, activeTab]);

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
            <div style={{ padding: "12px 5px" }}>
                <Nav tabs>
                    {optionsWithTranscript.map((option, index) => (
                        <NavItem key={index}>
                            <NavLink
                                className={classnames({ active: activeTab === option })}
                                onClick={() => { toggle(option); }}
                            >
                                {option}
                            </NavLink>
                        </NavItem>
                    ))}
                </Nav>
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
