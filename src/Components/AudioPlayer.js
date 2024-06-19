import React, { useRef, useState, useEffect } from 'react';
import galatta from '../Data/recording.mp3';
import '../styles.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function Player({ src, fileName, startTime, clicked, onTimeUpdate }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

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
            // Set the current time of the audio player to the startTime

            // Convert startTime to seconds
        const startTimeInSeconds = convertToSeconds(startTime);
        
        // Set the current time of the audio player to the startTime in seconds
        audioRef.current.audio.current.currentTime = startTimeInSeconds;
        }
    }, [startTime, clicked]); // Re-run effect when startTime changes

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current && onTimeUpdate) {
            onTimeUpdate(convertToMinutesSeconds(audioRef.current.audio.current.currentTime));
        }
    };

    return (
        <AudioPlayer
            src={galatta}
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
