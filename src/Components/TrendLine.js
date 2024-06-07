import React, { useState } from 'react';
import '../styles.css';
import SentimentTrend from './SentimentTrend';


function Tab1Content() {
  return <div>Content for Tab 1</div>;
}

function Tab2Content() {
  return <div>Content for Tab 2</div>; // Reusing the WordCloud component for Tab 2
}

function Tab3Content() {
  return <div>Content for Tab 3</div>;
}

function TrendLine() {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <SentimentTrend />;
      case 1:
        return <Tab2Content />;
      case 2:
        return <Tab3Content />;
      default:
        return <Tab1Content />;
    }
  };

  return (
    <div>
      <div className="tabs">
        <button onClick={() => setActiveTab(0)} className={activeTab === 0 ? 'active' : ''}>
          Sentiment
        </button>
        <button onClick={() => setActiveTab(1)} className={activeTab === 1 ? 'active' : ''}>
          Emotion
        </button>
        <button onClick={() => setActiveTab(2)} className={activeTab === 2 ? 'active' : ''}>
          Tone
        </button>
      </div>
      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default TrendLine;
