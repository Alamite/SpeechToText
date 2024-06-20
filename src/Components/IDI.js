import React from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaugh, faMusic, faMicrophone, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import jsonData from '../Data/TranscriptOutput4.json';
import '../styles.css';

function IDI() {
    return (
        <div className='audioevents-content'>
        <Table className="table">
            <thead className="table-dark">
                <tr>
                    <th className="first-column">Interaction</th>
                    <th>Discipline</th>
                    <th>Intent</th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <td >
                           {jsonData.Interaction}
                        </td>
                        <td>{jsonData.Discipline}</td>
                        <td>{jsonData.Intent}</td>
                    </tr>
            </tbody>
        </Table>
        </div>
    );
}

export default IDI;
