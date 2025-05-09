import React, { useState } from 'react';
import Header from "../Components/Header";
import Uploader from "../Components/Uploader";
import { Col, Container, Row } from "reactstrap";
import Options from "../Components/Options";
import AudioBreakdown from "../Components/AudioBreakdown";
import Footer from '../Components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';

function HomePage() {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    const [jsonData, setJsonData] = useState(null);
    const [isRunButtonPressed, setIsRunButtonPressed] = useState(false);

    const handleStartTime = (startTimeValue) => {
        setStartTime(startTimeValue);
    };

    const handleClicked = (click) => {
        setClicked(click);
    };

    const handleTimeUpdate = (time) => {
        setCurrentTime(time);
    };

    const handleRun = () => {
        if (selectedFile) {
            //const apiUrl = `https://inscribe.3cctpl.co.in//api/files/${selectedFile.folder}/${selectedFile.file}`;
            const apiUrl = `http://localhost:3001/api/files/${selectedFile.folder}/${selectedFile.file}`;
            var jsonUrl = apiUrl.replace('.mp3', '.json');
            jsonUrl = jsonUrl.replace('Audio', 'Transcript');
            // console.log('Fetching JSON file:', apiUrl);

            fetch(jsonUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setJsonData(data); // Store JSON data in state
                    setIsRunButtonPressed(true);
                    setAudioFile(selectedFile);
                    setCurrentTime(0.00);
                
                })
                .catch(error => console.error('Error fetching JSON file:', error));
        }
        else{
            alert("Please Select a file.");
        }
    };

    const handleSelectFile = (file) => {
        setSelectedFile(file);
    };

    return (
        <div className='App'>
            <div className="homepage">
                <Header />
                <div className="content">
                    <Container fluid>
                        <Row>
                            <Col xl={12}>
                                <Uploader startTime={startTime} clicked={clicked} onTimeUpdate={handleTimeUpdate} onSelectFile={handleSelectFile} audioFile={audioFile} />
                            </Col>
                        </Row>
                        <Row className='content-row'>
                            <Col xl={6} lg={6} md={4} sm={12} className="options-col">
                                <Options selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} onRun={handleRun} isEnabled={isRunButtonPressed}/>
                            </Col>
                            <Col xl={6} lg={6} md={4} sm={12}>
                                <AudioBreakdown selectedOptions={selectedOptions} onTextClick={handleStartTime} onClicked={handleClicked} currentTime={currentTime} jsonData={jsonData} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={12}>
                                <Footer />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
