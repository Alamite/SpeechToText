import * as React from 'react';
import '../styles.css';
import { Col, Container, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import AudioPlayer from './AudioPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

function Uploader({startTime}) {

    const fileInputRef = React.useRef(null);
    const [uploadedFileName, setUploadedFileName] = React.useState('');
    const [uploadStatus, setUploadStatus] = React.useState('');
    const [dropdownOpen1, setDropdownOpen1] = React.useState(false);
    const [dropdownOpen2, setDropdownOpen2] = React.useState(false);
    const [selectedOption1, setSelectedOption1] = React.useState('Language');
    const [selectedOption2, setSelectedOption2] = React.useState('File Name');

    const toggleDropdown1 = () => setDropdownOpen1(!dropdownOpen1);
    const toggleDropdown2 = () => setDropdownOpen2(!dropdownOpen2);

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
    const handleDropdownItemClick1 = (option) => {
        setSelectedOption1(option);
    };

    const handleDropdownItemClick2 = (option) => {
        setSelectedOption2(option);
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
                    <hr style={{height:"2px",width:"70px",borderWidth:"0px",backgroundColor:"grey"}}/>
                    <div style={{margin:"0px 10px",fontSize:"16px", alignContent:"center"}}>
                        OR
                    </div>
                    <hr style={{height:"2px",width:"70px",borderWidth:"0px",backgroundColor:"grey"}}/>
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
                <Dropdown isOpen={dropdownOpen1} toggle={toggleDropdown1} style={{ marginRight: '10px' }}>
                                            <DropdownToggle caret className="btn btn-secondary">
                                                {selectedOption1}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => handleDropdownItemClick1('Option 1.1')}>Option 1.1</DropdownItem>
                                                <DropdownItem onClick={() => handleDropdownItemClick1('Option 1.2')}>Option 1.2</DropdownItem>
                                                <DropdownItem onClick={() => handleDropdownItemClick1('Option 1.3')}>Option 1.3</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                        <Dropdown isOpen={dropdownOpen2} toggle={toggleDropdown2} style={{ marginRight: '10px' }}>
                                            <DropdownToggle caret className="btn btn-secondary">
                                                {selectedOption2}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={() => handleDropdownItemClick2('Option 2.1')}>Option 2.1</DropdownItem>
                                                <DropdownItem onClick={() => handleDropdownItemClick2('Option 2.2')}>Option 2.2</DropdownItem>
                                                <DropdownItem onClick={() => handleDropdownItemClick2('Option 2.3')}>Option 2.3</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                <div className='uploaded-file-name'>
                {uploadedFileName || 'No file uploaded'}
                </div>
                </div>
                </div>
            </div>
                    </Col>
                    <Col xl={6}>
                        <AudioPlayer startTime={startTime}/>
                    </Col>
                </Row>
            </Container>
            
        </div>
        </div>
    );
}

export default Uploader;
