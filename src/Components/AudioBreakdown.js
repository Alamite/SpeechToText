import React from 'react';
import '../styles.css';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

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

    return (
        <div>
<div style={{padding:"12px 5px"}}>
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
          <div style={{width:"100%"}}>
            <TabContent activeTab={activeTab}>
                {optionsWithTranscript.map((option, index) => (
                    <TabPane tabId={option} key={index}>
                    <div className='output-text'>
                    {option} content goes here.
                    <br/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    <br/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    <br/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>    
                    

                    </TabPane>
                ))}
            </TabContent>
            </div>
        </div>
        </div>
    );
}

export default AudioBreakdown;
