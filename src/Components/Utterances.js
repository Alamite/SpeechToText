import React from 'react';
import '../styles.css';
import jsonData from '../Data/TranscriptOutput4.json';
import SentimentBarChart from './SentimentBarChart';

function Utterances() {

    var opening_comments_error = false;
    var closing_comments_error = false;
    var name_error = false;
    var address_error = false;
    var email_error = false;
    var profanity_error = false;
    var empathy_error = false;

    if(jsonData.opening_comments == "No")
        opening_comments_error = true;

    if(jsonData.closing_comments == "No")
        closing_comments_error = true;

    if(jsonData['Has the Agent Ask for callers Name'] == "No")
        name_error = true;

    if(jsonData['Has the Agent Ask for callersAddress'] == "No")
        address_error = true;

    if(jsonData['Has the Agent Ask for callersEmail_id'] == "No")
        email_error = true;

    if(jsonData['Was there any profanity on the call'] == "Yes")
        profanity_error = true;

    if(jsonData['Did the caller Displayed Empathy'].startsWith("No"))
        email_error = true;

   

    return (
        <div className='sentiment-content'>
            <h3>Utterances</h3>
            <p style={{color : opening_comments_error ? "red" : ""}}><b>Opening comments : </b> {jsonData.opening_comments}</p>
            <p style={{color : closing_comments_error ? "red" : ""}}><b>Closing comments : </b> {jsonData.closing_comments}</p>
            <p style={{color : name_error ? "red" : ""}}><b>Did the agent ask for the customer's name : </b> {jsonData['Has the Agent Ask for callers Name']}</p>
            <p style={{color : address_error ? "red" : ""}}><b>Did the Agent ask for customer's address : </b>{jsonData['Has the Agent Ask for callers Address']}</p>
            <p style={{color : email_error ? "red" : ""}}><b>Did the Agent ask for customer's email id : </b>{jsonData['Has the Agent Ask for callers Email_id']}</p>
            <p style={{color : profanity_error ? "red" : ""}}><b>Was there any profanity on the call : </b>{jsonData['Was there any profanity on the call']}</p>
            <p style={{color : empathy_error ? "red" : ""}}><b>Did the caller Displayed Empathy : </b>{jsonData['Did the caller Displayed Empathy']}</p>
        </div>
    );
}

export default Utterances;
 