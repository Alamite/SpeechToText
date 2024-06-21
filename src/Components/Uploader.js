import React, { useEffect, useState } from 'react';
import '../styles.css';
import { Col, Container, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import AudioPlayer from './AudioPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

function Uploader({ startTime, clicked, onTimeUpdate, onSelectFile, audioFile }) {
    const fileInputRef = React.useRef(null);
    const [uploadedFileName, setUploadedFileName] = React.useState('');
    const [uploadStatus, setUploadStatus] = React.useState('');
    const [dropdownOpen1, setDropdownOpen1] = React.useState(false);
    const [dropdownOpen2, setDropdownOpen2] = React.useState(false);
    const [folders, setFolders] = React.useState([]);
    const [selectedFolder, setSelectedFolder] = React.useState(null);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [files, setFiles] = React.useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/files')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched data:', data);
                setFolders(data);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
                alert('Failed to fetch files. Please check the console for more details.');
            });
    }, []);

    const toggleDropdown1 = () => setDropdownOpen1(!dropdownOpen1);
    const toggleDropdown2 = () => setDropdownOpen2(!dropdownOpen2);

    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedFileName(file.name);

            const formData = new FormData();
            formData.append('file', file);

            try {
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

    const handleFolderSelect = (folder) => {
        setSelectedFolder(folder);
        setFiles(folder.files);
        setSelectedFile(null);  // Reset selected file when folder changes
    };

    const handleFileSelect = (file) => {
        setSelectedFile(file);
        onSelectFile({ folder: selectedFolder.folder, file });
    };

    return (
        <div className='container-background'>
            <div className='glass-container uploader-container'>
                <Container fluid>
                    <Row>
                        <Col xl={6}>
                            <div className='uploader-input'>
                                <div style={{ display: "flex" }}>
                                    <div className='upload-button'>
                                        <button type="submit" className="btn upload-btn-primary" onClick={handleUploadClick}>
                                            <FontAwesomeIcon icon={faUpload} /> Upload File
                                        </button>
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
                                            {selectedFolder ? selectedFolder.folder : 'Select Folder'}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {folders.map((folder, index) => (
                                                <DropdownItem
                                                    key={index}
                                                    onClick={() => handleFolderSelect(folder)}
                                                >
                                                    {folder.folder}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                    <Dropdown isOpen={dropdownOpen2} toggle={toggleDropdown2} style={{ marginRight: '10px' }}>
                                        <DropdownToggle caret className="btn btn-secondary" disabled={!selectedFolder}>
                                            {selectedFile ? selectedFile : 'Select File'}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {files.map((file, index) => (
                                                <DropdownItem
                                                    key={index}
                                                    onClick={() => handleFileSelect(file)}
                                                >
                                                    {file}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                    <div className='uploaded-file-name'>
                                        {uploadedFileName || 'File name will appear here'}
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xl={6}>
                            <AudioPlayer startTime={startTime} clicked={clicked} onTimeUpdate={onTimeUpdate} selectedFile={audioFile} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Uploader;
