import React, {useState} from 'react';
import '../styles.css';
import jsonData from '../Data/TranscriptOutput1.json';
import sequence from '../Data/sequence.json';
import SentimentBarChart from './SentimentBarChart';

// function Summary() {
//     const { summaries } = jsonData;
//     // Remove the first hyphen and split the cohere points into an array
//     const coherePoints = summaries.cohere_points.startsWith('- ')
//         ? summaries.cohere_points.substring(2).split('\n- ').filter(point => point.trim() !== '')
//         : summaries.cohere_points.split('\n- ').filter(point => point.trim() !== '');

//     return (
//         <div className='transcript-content'>
//             <h2>Overall Summary</h2>
//             <p>{summaries.overall_summary}</p>


//             <h3>Sequence of events</h3>
//             <ul>
//                 {coherePoints.map((point, index) => (
//                     <li key={index}>{point}</li>
//                 ))}
//             </ul>
//             <h3>Sentiment Levels</h3>
//             <SentimentBarChart/>
//         </div>
//     );
// }

// export default Summary;

function OverallSummary() {
    const { summaries } = jsonData;
  

    return (
        <div className='sentiment-content'>
            <h2>Overall Summary</h2>
            <p>{summaries.overall_summary}</p>
            {/* <h3>Sentiment Levels</h3>              Sentiment levels chart
            <SentimentBarChart/> */}
        </div>
    );
}

function EventSequence() {
    const { summaries } = jsonData;
    // Remove the first hyphen and split the cohere points into an array
    const coherePoints = summaries.cohere_points.startsWith('- ')
        ? summaries.cohere_points.substring(2).split('\n- ').filter(point => point.trim() !== '')
        : summaries.cohere_points.split('\n- ').filter(point => point.trim() !== '');

    return (
        <div className='sentiment-content'>
            <h3>Sequence of events</h3>
            <ul>
                {coherePoints.map((point, index) => (
                    <li key={index}>{point}</li>
                ))}
            </ul>
        </div>
    );
}

function EventSequenceSentiment() {
  
  return (
      <div className='sentiment-content'>
          <h3>Sequence of events</h3>
  
            {sequence.events.map((event, index) => (
              
              <div className={`sequence-item ${event.sentiment === 'negative' ? 'border-left-red' : event.sentiment === 'positive' ? 'border-left-green' : event.sentiment === 'neutral' ? 'border-left-blue' : ""}`}>
             {event.text}
              </div>
            ))}
       
      </div>
  );
}

function Resolution() {
    const { summaries } = jsonData;
  

    return (
        <div className='sentiment-content'>
            <h2>Resolution</h2>
            <p>{jsonData.resolution}</p>
            {/* <h3>Sentiment Levels</h3>              Sentiment levels chart
            <SentimentBarChart/> */}
        </div>
    );
}

function Summary() {
    const [activeTab, setActiveTab] = useState(0);
  
    const renderContent = () => {
      switch (activeTab) {
        case 0:
          return <OverallSummary />;
        case 1:
          return <EventSequence />;
        case 2:
          return <Resolution/>;
        case 3:
          return <EventSequenceSentiment />;
        default:
          return  <OverallSummary />;
      }
    };
  
    return (
      <div>
        <div className="tabs">
          <button onClick={() => setActiveTab(0)} className={activeTab === 0 ? 'active' : ''}>
            Overall Summary
          </button>
          <button onClick={() => setActiveTab(1)} className={activeTab === 1 ? 'active' : ''}>
            Sequence of events
          </button>
          <button onClick={() => setActiveTab(2)} className={activeTab === 2 ? 'active' : ''}>
            Resolution
          </button>
          {/* <button onClick={() => setActiveTab(3)} className={activeTab === 3 ? 'active' : ''}>
            Sequence of events Temp
          </button> */}
        </div>
        <div className="tab-content">
          {renderContent()}
        </div>
      </div>
    );
  }
  
  export default Summary;
  