import React, { useState } from "react";
import logo from '../Data/3c.png';
import "../styles.css"; // Adjust the path if necessary
import base64Font from "../utils/Base64Font";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import jsPDF from "jspdf";
import Transcript from "./Transcript";
import Keywords from "./Keywords";
import Sentiment from "./Sentiment";
import Summary from "./Summary";
import TrendLine from "./TrendLine";
import AudioEvents from "./AudioEvents";
import TopicDetection from "./TopicDetection";
import Utterances from "./Utterances";
import IDI from "./IDI";

function AudioBreakdown({
  selectedOptions,
  onTextClick,
  onClicked,
  currentTime,
  jsonData,
}) {
  const [highlight, setHighlight] = useState(false);
  const [translate, setTranslate] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // State for managing the modal visibility
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // For the new dropdown inside the modal
  const [selectedFormat, setSelectedFormat] = useState('Original'); // State for format selection

  const activeTab = selectedOptions[0] || "Transcript";

  const NoFilePage = () => {
    return <div>Please Select a File to Get Started</div>;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Transcript":
        return (
          <Transcript
            key="Transcript"
            jsonData={jsonData}
            highlight={highlight}
            translate={translate}
            onTextClick={onTextClick}
            onClicked={onClicked}
            currentTime={currentTime}
          />
        );
      case "Sentiment":
        return <Sentiment key="Sentiment" jsonData={jsonData} />;
      case "Topic Detection":
        return <TopicDetection key="TopicDetection" jsonData={jsonData} />;
      case "Keywords":
        return <Keywords key="Keywords" jsonData={jsonData} />;
      case "Summarization":
        return <Summary key="Summary" jsonData={jsonData} />;
      case "Trend Line":
        return <TrendLine key="TrendLine" jsonData={jsonData} />;
      case "Audio Events":
        return <AudioEvents key="AudioEvents" jsonData={jsonData} />;
      case "Utterances":
        return <Utterances key="Utterances" jsonData={jsonData} />;
      case "IDI Classification":
        return <IDI key="IDI" jsonData={jsonData} />;
      case "No File Selected":
        return <NoFilePage />;
      default:
        return <div>Content not available</div>;
    }
  };

  const toggleHighlight = () => setHighlight(!highlight);
  const toggleTranslate = () => setTranslate(!translate);
  const toggleModal = () => setModalOpen(!modalOpen); // Function to toggle the modal
  const toggleInfoModal = () => setInfoModalOpen(!infoModalOpen);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleFormatSelect = (format) => {
    setSelectedFormat(format);
  };

  const handleDownloadClick = () => {
    toggleModal(); // Open the modal when the download button is clicked
  };

  const handleFileDownloadClick = () => {
    toggleModal();
    exportToPDF();
    // toggleInfoModal();
    // setTimeout(() => {
    //   exportToPDF();
    //   toggleInfoModal();
    // }, 2000);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
  
    doc.addFileToVFS("ArialUnicodeMS.ttf", base64Font); // Add your base64 string
  doc.addFont("ArialUnicodeMS.ttf", "ArialUnicodeMS", "normal");
  doc.setFont("ArialUnicodeMS", "normal");
  
    const pageWidth = doc.internal.pageSize.getWidth(); // Get the page width
    const margin = 10; // Define margin
    const maxLineWidth = pageWidth - margin * 2; // Calculate the max width for text wrapping
    const lineHeight = 10; // Define the line height for the text
    const pageHeight = doc.internal.pageSize.height; // Get the page height of the PDF
  
    let yPosition = 34; // Start position for text after the transcript number and image
  
    // Define the transcript number and image
    const transcriptNumber = "Transcript #001"; // Customize this as needed
    const imageURL = logo; // Add the path to the image you want to use
  
    // Function to add header content on each page
    const addPageHeader = () => {
      // Add the transcript number to the top left corner
      doc.setFont("helvetica", "bold");
      doc.text(transcriptNumber, margin, 17); // Position the transcript number at (margin, 15)
  
      // Load and add the image at the top right corner
      const imgWidth = 60; // Define the width of the image
      const imgHeight = 8; // Define the height of the image
      doc.addImage(imageURL, "PNG", pageWidth - imgWidth - margin, 10, imgWidth, imgHeight); // Position the image
    };
  
    // Add header on the first page
    addPageHeader();
  
    jsonData.segments.forEach((segment, index) => {
      // Map speaker labels
      let speakerLabel = segment.speaker_label;
      if (speakerLabel === "spk_0") {
        speakerLabel = "Syntesis Agent";
      } else if (speakerLabel === "spk_1") {
        speakerLabel = "Caller";
      }
  
      // Bold heading for Speaker
      doc.setFont("helvetica", "bold");
      const speakerText = speakerLabel;
      const speakerLines = doc.splitTextToSize(speakerText, maxLineWidth);
      doc.text(speakerLines, margin, yPosition); // Wrap speaker text if necessary
      yPosition += speakerLines.length * lineHeight;
  
      if (selectedFormat === "Original" || selectedFormat === "Original + Translated") {
        // Bold heading for Original Transcript
        doc.setFont("helvetica", "bold");
        doc.text("Original Transcript: ", margin, yPosition);
        yPosition += 8;
  
        // Wrap Original Transcript
        doc.setFont("ArialUnicodeMS", "normal");
        const originalTranscriptLines = doc.splitTextToSize(
          segment.original_transcript,
          maxLineWidth
        );
        doc.text(originalTranscriptLines, margin, yPosition);
        yPosition += originalTranscriptLines.length * lineHeight;
      }
  
      if (selectedFormat === "Translated" || selectedFormat === "Original + Translated") {
        // Bold heading for Translated Transcript
        doc.setFont("helvetica", "bold");
        doc.text("Translated Transcript: ", margin, yPosition);
        yPosition += 8;
  
        // Wrap Translated Transcript
        doc.setFont("helvetica", "normal");
        const translatedTranscriptLines = doc.splitTextToSize(
          segment.translated_transcript,
          maxLineWidth
        );
        doc.text(translatedTranscriptLines, margin, yPosition);
        yPosition += translatedTranscriptLines.length * lineHeight; // Extra space after each segment
      }
  
      yPosition += 10;
  
      // Check for page overflow again before continuing to the next segment
      if (yPosition + lineHeight * 4 > pageHeight) {
        doc.addPage(); // Add a new page
        yPosition = 30; // Reset yPosition for the new page
        addPageHeader(); // Add the header to the new page
      }
    });
  
    // Save the PDF
    doc.save("Transcript.pdf");
  };
  

  return (
    <div>
      <div className="active-tab-header">
        <div
          style={{
            borderBottom: "2px solid black",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="tab-heading">{activeTab}</div>
          {activeTab === "Transcript" && (
            <div style={{ display: "flex" }}>
              Translate All{" "}
              {/* Toggle to switch between translated and original text */}
              <label className="switch">
                <input
                  type="checkbox"
                  checked={translate}
                  onChange={toggleTranslate}
                />
                <span className="slider round"></span>
              </label>
              <div style={{ width: "10px" }}></div>
              AI Highlight
              <label className="switch ai-highlight-switch">
                <input
                  type="checkbox"
                  checked={highlight}
                  onChange={toggleHighlight}
                />
                <span className="slider round"></span>
              </label>
              <div style={{ width: "10px" }}></div>
              <div onClick={handleDownloadClick}>
                <FontAwesomeIcon icon={faDownload} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="breakdown-container">
        <div style={{ width: "100%" }}>{renderTabContent()}</div>
      </div>

      {/* Modal for download options */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Download Options</ModalHeader>
        <ModalBody>
          <p>Select your preferred format:</p>
          {/* Add the new dropdown here */}
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret className="btn btn-secondary">
              {selectedFormat}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => handleFormatSelect("Original")}>
                Original
              </DropdownItem>
              <DropdownItem onClick={() => handleFormatSelect("Translated")}>
                Translated
              </DropdownItem>
              <DropdownItem
                onClick={() => handleFormatSelect("Original + Translated")}
              >
                Original + Translated
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleFileDownloadClick}>
            Download as PDF
          </Button>{" "}
          <Button color="danger" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/* Modal for info message */}
      <Modal isOpen={infoModalOpen} toggle={toggleInfoModal}>
        <ModalBody>
          <p>Your transcript will be downloaded shortly...</p>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default AudioBreakdown;
