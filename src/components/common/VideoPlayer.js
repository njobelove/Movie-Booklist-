import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './VideoPlayer.css';

const VideoPlayer = ({ url, title, onClose }) => {
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);

  return (
    <div className="video-modal">
      <div className="video-overlay" onClick={onClose}></div>
      <div className="video-container">
        <div className="video-header">
          <h3>{title}</h3>
          <button className="close-video" onClick={onClose}>×</button>
        </div>
        <div className="video-wrapper">
          <ReactPlayer
            url={url}
            width="100%"
            height="100%"
            playing={playing}
            volume={volume}
            controls={true}
            onError={(e) => console.log('Video error:', e)}
          />
        </div>
        <div className="video-controls">
          <button onClick={() => setPlaying(!playing)}>
            <i className={`fas fa-${playing ? 'pause' : 'play'}`}></i>
          </button>
          <input 
            type="range" 
            min={0} 
            max={1} 
            step={0.1} 
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
          <span><i className="fas fa-volume-up"></i> {Math.round(volume * 100)}%</span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;