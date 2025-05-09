import React, { useRef, useState, useEffect } from 'react';
import '../styles.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function Player({ selectedFile, startTime, clicked, onTimeUpdate }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [mp3Url, setMp3Url] = useState(null); // State to hold the fetched MP3 file URL
    const audioRef = useRef(null);

    useEffect(() => {
        if (selectedFile) {
            //const apiUrl = `https://inscribe.3cctpl.co.in//api/files/${selectedFile.folder}/${selectedFile.file}`;
            const apiUrl = `http://localhost:3001/api/files/${selectedFile.folder}/${selectedFile.file}`;
            const mp3Url = apiUrl.replace('.json', '.mp3');

            fetch(mp3Url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    // Assuming the response is a direct URL to the MP3 file
                    setMp3Url(mp3Url); // Store the fetched MP3 file URL in state
                })
                .catch(error => console.error('Error fetching MP3 file:', error));
        }
    }, [selectedFile]);

    const convertToSeconds = (time) => {
        const minutes = Math.floor(time); // Get the integer part (minutes)
        const seconds = (time - minutes) * 60; // Get the decimal part and convert to seconds
        return (minutes * 60) + seconds;
    };

    const convertToMinutesSeconds = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60); // Get the integer part (minutes)
        const seconds = (timeInSeconds % 60) / 60; // Get the remainder and convert to fraction of a minute
        return minutes + seconds;
    };

    useEffect(() => {
        // Check if startTime is provided and the audio ref is initialized
        if (startTime && audioRef.current) {
            const startTimeInSeconds = convertToSeconds(startTime);
            audioRef.current.audio.current.currentTime = startTimeInSeconds;
        }
    }, [startTime, clicked]);

    const togglePlayPause = () => {
        setIsPlaying(prev => !prev);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current && onTimeUpdate) {
            onTimeUpdate(convertToMinutesSeconds(audioRef.current.audio.current.currentTime));
        }
    };

    return (
        <AudioPlayer
            key={mp3Url}
            src={mp3Url} // Pass the fetched MP3 file URL as src
            onPlay={togglePlayPause}
            onPause={togglePlayPause}
            autoPlay={isPlaying} // Play audio when isPlaying is true
            ref={audioRef} // Pass ref to access the audio player
            onListen={handleTimeUpdate}
            showFilledVolume={false} // Trigger time update on listen
        />
    );
}

export default Player;




// import React, { useRef, useState, useEffect } from 'react';
// import galatta from '../Data/recording.mp3';
// import '../styles.css';
// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';

// function Player({ src, fileName, startTime, clicked, onTimeUpdate }) {
//     const [isPlaying, setIsPlaying] = useState(false);
//     const audioRef = useRef(null);

//     useEffect(() => {
//         // Check if startTime is provided and the audio ref is initialized
//         if (startTime && audioRef.current) {
//             // Set the current time of the audio player to the startTime
//             audioRef.current.audio.current.currentTime = startTime;
//         }
//     }, [startTime, clicked]); // Re-run effect when startTime changes

//     const togglePlayPause = () => {
//         setIsPlaying((prev) => !prev);
//     };

//     const handleTimeUpdate = () => {
//         if (audioRef.current && onTimeUpdate) {
//             onTimeUpdate(audioRef.current.audio.current.currentTime);
//         }
//     };

//     return (
//         <AudioPlayer
//             src={galatta}
//             onPlay={togglePlayPause}
//             onPause={togglePlayPause}
//             autoPlay={isPlaying} // Play audio when isPlaying is true
//             ref={audioRef} // Pass ref to access the audio player
//             onListen={handleTimeUpdate} // Trigger time update on listen
//         />
//     );
// }

// export default Player;
