import React from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaugh, faMusic, faMicrophone, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import jsonData from '../Data/TranscriptOutput4.json';
import '../styles.css';


const convertToHHMMSS = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    // Pad hours, minutes, and seconds to ensure two digits
    const paddedHours = hours.toString().padStart(2, '0');
    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = seconds.toString().padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};

const eventsData = [
    // { icon: faLaugh, eventType: 'Laughter', totalDuration: '00:00:00', numberOfEvents: 0 },
    { icon: faMusic, eventType: 'Hold Music', totalDuration: '00:00:00', numberOfEvents: 0 },
    { icon: faVolumeMute, eventType: 'Silence', totalDuration: convertToHHMMSS(parseFloat(jsonData.total_silence_duration).toFixed(2)), numberOfEvents: jsonData.num_silences },
    { icon: faMicrophone, eventType: 'Speech', totalDuration: '00:00:00', numberOfEvents: 0 },
];

function AudioEvents() {
    return (

        <div className='sentiment-content'>
        <h3><FontAwesomeIcon icon={faVolumeMute} style={{ marginRight: '10px' }} />
        Silence</h3>
            <p><b>Total Duration : </b> {convertToHHMMSS(parseFloat(jsonData.total_silence_duration).toFixed(2))}</p>
            <p><b>Number of Events : </b> {jsonData.num_silences}</p>
        <br/>
            <h3><FontAwesomeIcon icon={faMusic} style={{ marginRight: '10px' }} />
        Hold Music</h3>
            <p><b>Total Duration : </b> {convertToHHMMSS(parseFloat(jsonData.total_silence_duration).toFixed(2))}</p>
            <p><b>Highest Hold Time : </b> {jsonData.num_silences}</p>
            <p><b>Total Count of Hold Music Event over 30 Seconds  : </b> {jsonData.num_silences}</p>
            <p><b>Total Count of Hold Music Event over 60  Seconds : </b> {jsonData.num_silences}</p>
            <p><b>Total Count of Hold Music Event over 120  Seconds : </b> {jsonData.num_silences}</p>
        </div>
   
    );
}

export default AudioEvents;


  {/* <Table bordered>
            <thead>
                <tr>
                    <th>Event Type</th>
                    <th >Total Duration</th>
                    <th>Number of Events</th>
                </tr>
            </thead>
            <tbody>
                {eventsData.map((event, index) => (
                    <tr key={index}>
                        <td style={{textAlign:"left"}}>
                            <FontAwesomeIcon icon={event.icon} style={{ marginRight: '10px' }} />
                            {event.eventType}
                        </td>
                        <td>{event.totalDuration}</td>
                        <td>{event.numberOfEvents}</td>
                    </tr>
                ))}
            </tbody>
        </Table> */}