import React from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaugh, faMusic, faMicrophone, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';

const eventsData = [
    { icon: faLaugh, eventType: 'Laughter', totalDuration: '00:00:00', numberOfEvents: 0 },
    { icon: faMusic, eventType: 'Music', totalDuration: '00:00:00', numberOfEvents: 0 },
    { icon: faVolumeMute, eventType: 'Silence', totalDuration: '00:00:00', numberOfEvents: 0 },
    { icon: faMicrophone, eventType: 'Speech', totalDuration: '00:00:00', numberOfEvents: 0 },
];

function AudioEvents() {
    return (
        <div className='audioevents-content'>
        <Table bordered>
            <thead>
                <tr>
                    <th>Event Type</th>
                    <th>Total Duration</th>
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
        </Table>
        </div>
    );
}

export default AudioEvents;
