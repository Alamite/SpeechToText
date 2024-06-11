import React, { useRef, useState, useEffect } from 'react';
import galatta from '../Data/recording.mp3';
import '../styles.css';
import { IoPlaySharp, IoPauseSharp } from 'react-icons/io5';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function Player({ src, fileName, startTime, clicked }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        // Check if startTime is provided and the audio ref is initialized
        if (startTime && audioRef.current) {
            // Set the current time of the audio player to the startTime
            audioRef.current.audio.current.currentTime = startTime;
        }
    }, [startTime,clicked]); // Re-run effect when startTime changes

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    console.log('Start Time in Audioplayer:', startTime);
    return (
        <AudioPlayer
            src={galatta}
            onPlay={togglePlayPause}
            onPause={togglePlayPause}
            autoPlay={isPlaying} // Play audio when isPlaying is true
            ref={audioRef} // Pass ref to access the audio player
        />
    );
}

export default Player;
