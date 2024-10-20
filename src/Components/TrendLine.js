import React, { useState } from 'react';
import '../styles.css';
import SentimentTrend from './SentimentTrend';
import EmotionTrend from './EmotionTrend';
import ToneTrend from './ToneTrend';

function TrendLine({jsonData}) {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <SentimentTrend jsonData={jsonData} />;
      case 1:
        return <EmotionTrend jsonData={jsonData}/>;
      case 2:
        return <ToneTrend jsonData={jsonData}/>;
      default:
        return  <SentimentTrend jsonData={jsonData}/>;
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
          Words per minute
        </button>
      </div>
      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default TrendLine;
