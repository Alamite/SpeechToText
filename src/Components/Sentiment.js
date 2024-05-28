// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../styles.css'; // Import the CSS file

// function Sentiment() {
//     const items = [
//         {
//             text: '😊 Good evening. Thank you for calling ITC. My name is Saneera.',
//             tone: 'Happy',
//             emotion: 'Gratitude',
//             sentiment: 'Positive',
//             applyBorderLeft: true,
//         },
//         {
//             text: '😶 Hello. Hello sir, I\'m calling from Chennai. Hello',
//             tone: 'Neutral',
//             emotion: 'Neutral',
//             sentiment: 'Neutral',
//             applyBorderLeft: false,
//         },
//         {
//             text: '😚 Very good evening sir. Tell me how can I help you?',
//             tone: 'Neutral',
//             emotion: 'Neutral',
//             sentiment: 'Neutral',
//             applyBorderLeft: true,
//         },
//         {
//             text: '😶 My name is Shankar. Hello.',
//             tone: 'Neutral',
//             emotion: 'Neutral',
//             sentiment: 'Neutral',
//             applyBorderLeft: false,
//         }
//     ];

//     return (
//         <div className="accordion" id="accordionExample">
//             {items.map((item, index) => (
//                 <div 
//                     className={`accordion-item ${item.applyBorderLeft ? 'border-left-red' : ''}`} 
//                     key={index}
//                 >
//                     <h2 className="accordion-header" id={`heading${index}`}>
//                         <button 
//                             className="accordion-button collapsed" 
//                             type="button" 
//                             data-bs-toggle="collapse" 
//                             data-bs-target={`#collapse${index}`} 
//                             aria-expanded="false" 
//                             aria-controls={`collapse${index}`}
//                         >
//                             {item.text}
//                         </button>
//                     </h2>
//                     <div 
//                         id={`collapse${index}`} 
//                         className="accordion-collapse collapse" 
//                         aria-labelledby={`heading${index}`} 
//                         data-bs-parent="#accordionExample"
//                     >
//                         <div className="accordion-body">
//                             <div className="sentiment-details">
//                                 <p><em>Tone:</em> {item.tone}</p>
//                                 <p><em>Emotion:</em> {item.emotion}</p>
//                                 <p><em>Sentiment Label:</em> {item.sentiment}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default Sentiment;






// With Hilighted keywords...

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faMeh, faFrown } from '@fortawesome/free-solid-svg-icons'; // Import necessary icons
import '../styles.css'; // Import the CSS file

function Sentiment() {
    const items = [
        {
            speaker:'A',
            text: 'Good evening. Thank you for calling ITC. My name is&nbsp;<strong>Saneera</strong>.',
            tone: 'Happy',
            emotion: 'Gratitude',
            sentiment: 'Positive',
            keywords: ['evening', 'calling', 'Saneera'],
            icon: faSmile, // Icon for Happy tone
        },
        {
            speaker:'B',
            text: '&nbsp;<strong>Hello</strong>. Hello sir, I\'m calling from&nbsp;<strong>Chennai</strong>.&nbsp;<strong>Hello</strong>',
            tone: 'Neutral',
            emotion: 'Neutral',
            sentiment: 'Neutral',
            keywords: ['Hello', 'Chennai'],
            icon: faMeh, // Icon for Neutral tone
        },
        {
            speaker:'A',
            text: 'Very good evening sir. Tell me how can I help you?',
            tone: 'Sad',
            emotion: 'Neutral',
            sentiment: 'Sad',
            keywords: ['evening', 'help'],
            icon: faFrown, // Icon for Neutral tone
        },
        {
            speaker:'B',
            text: 'My name is Shankar.&nbsp;<strong>Hello</strong>.',
            tone: 'Neutral',
            emotion: 'Neutral',
            sentiment: 'Neutral',
            keywords: ['name', 'Shankar', 'Hello'],
            icon: faMeh, // Icon for Sad tone
        }
    ];

    return (
        <div className="accordion" id="accordionExample">
            {items.map((item, index) => (
                <div 
                    className={`accordion-item ${item.sentiment === 'Sad' ? 'border-left-red' : ''}`} 
                    key={index}
                >
                    <h2 className="accordion-header" id={`heading${index}`}>
                        <div className='speaker-title'>Speaker <span>{item.speaker}</span></div>
                        <div style={{display:"flex", alignItems:"center"}}>
                            <FontAwesomeIcon 
                                icon={item.icon} 
                                style={{ fontSize: "20px", color: item.icon === faSmile ? "#2ecc71" : item.icon === faFrown ? "A91D3A" : "inherit" }} 
                            /> {/* Display the icon */}
                            <button 
                                className="accordion-button collapsed" 
                                type="button" 
                                data-bs-toggle="collapse" 
                                data-bs-target={`#collapse${index}`} 
                                aria-expanded="false" 
                                aria-controls={`collapse${index}`}
                                dangerouslySetInnerHTML={{__html: item.text}}
                            />
                        </div>
                    </h2>
                    <div 
                        id={`collapse${index}`} 
                        className="accordion-collapse collapse" 
                        aria-labelledby={`heading${index}`} 
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <div className="sentiment-details">
                                <p><em>Tone:</em> {item.tone}</p>
                                <p><em>Emotion:</em> {item.emotion}</p>
                                <p><em>Sentiment Label:</em> {item.sentiment}</p>
                                <p><em>Keywords:</em> {item.keywords.map((keyword, keywordIndex) => (
                                    <span key={keywordIndex}>
                                        <strong>{keyword}</strong>{keywordIndex !== item.keywords.length - 1 && ', '}
                                    </span>
                                ))}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Sentiment;
