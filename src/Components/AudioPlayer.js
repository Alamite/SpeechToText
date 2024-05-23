import React, { useRef, useState } from 'react';
import galatta from './Galatta.mp3';
import '../styles.css';
import {IoPlaySharp, IoPauseSharp} from 'react-icons/io5';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function Player({ src, fileName }) {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
      };

    return (
     
        <AudioPlayer
autoPlay
src={galatta}
onPlay={e => console.log("onPlay")}
autoPlayAfterSrcChange="false"
/>
   
    );
}

export default Player;
