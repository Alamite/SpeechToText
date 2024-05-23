import React, { useState } from 'react';
import Header from "../Components/Header";
import Uploader from "../Components/Uploader";
import { Col, Container, Row } from "reactstrap";
import Options from "../Components/Options";
import AudioBreakdown from "../Components/AudioBreakdown";
import AudioPlayer from "../Components/AudioPlayer";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css'; // Import the CSS file

function HomePage() {
    const [selectedOptions, setSelectedOptions] = useState([]);

    return (
        <div className='App'>
            <div className="homepage">
                <Header />
                <div className="content">
                    <Container fluid>
                        <Row >
                            <Col xl={12}>
                                <Uploader />
                            </Col>
                            {/* <Col xl={6}>
                            <AudioPlayer />
                            </Col> */}
                        </Row>
                  
                        <Row className='content-row'>
                            <Col xl={6} lg={6} md={4} sm={12} className="options-col">
                                <Options selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
                            </Col>
                            <Col xl={6} lg={6} md={4} sm={12}>
                                <AudioBreakdown selectedOptions={selectedOptions} />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
