import * as React from 'react';
import '../styles.css';
import { Col, Container, Row } from 'reactstrap';
import AudioPlayer from './AudioPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

function Uploader() {

    const fileInputRef = React.useRef(null);
    const [uploadedFileName, setUploadedFileName] = React.useState('');
    const [uploadStatus, setUploadStatus] = React.useState('');

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFileName(file.name);

            // Create a FormData object and append the file
            const formData = new FormData();
            formData.append('file', file);

            try {
                // Make a POST request to upload the file
                const response = await fetch('/upload', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    setUploadStatus('File uploaded successfully');
                } else {
                    setUploadStatus('File upload failed');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                setUploadStatus('File upload failed');
            }
        }
    };

    return (
        <div className='container-background'>
        <div className='glass-container uploader-container'>
            <Container fluid>
                <Row>
                    <Col xl={6}>
                    <div className='uploader-input'>
                <div>
                <div className='input-group'>
                    <input
                        type="url"
                        className="form-control"
                        id="youtubeLink"
                        placeholder="Enter a YouTube link"
                    />
                </div>
                <div className='or-divider'>
                    <center>
                    <div style={{display:"flex", justifyContent:"center"}}>
                    <hr style={{height:"2px",width:"70px",borderWidth:"0px",color:"black",backgroundColor:"black"}}/>
                    <div style={{margin:"0px 10px", fontSize:"16px", alignContent:"center"}}>
                        OR
                    </div>
                    <hr style={{height:"2px",width:"70px",borderWidth:"0px",color:"black",backgroundColor:"black"}}/>
                    </div>
                    
                    </center>
                </div>
                <div style={{display:"flex"}}>

                <div className='upload-button'>
                    <button type="submit" className="btn upload-btn-primary" onClick={handleUploadClick}> <FontAwesomeIcon icon={faUpload} /> Upload file </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="audio/mp3"
                        onChange={handleFileChange}
                    />
                </div>
                <div className='uploaded-file-name'>
                {uploadedFileName || 'No file uploaded'}
                </div>
                </div>
                {/* <div className='run-button'>
                    <button type="submit" className="btn btn-primary">Run</button>
                </div> */}
                </div>
            </div>
                    </Col>
                    <Col xl={6}>
                        <AudioPlayer/>
                    </Col>
                </Row>
            </Container>
            
        </div>
        </div>
    );
}

export default Uploader;
