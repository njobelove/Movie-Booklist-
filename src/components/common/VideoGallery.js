import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import './VideoGallery.css';

const VideoGallery = ({ videos }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [likes, setLikes] = useState({});

  const handleLike = (videoId) => {
    setLikes(prev => ({
      ...prev,
      [videoId]: (prev[videoId] || 0) + 1
    }));
  };

  return (
    <div className="video-gallery">
      <h2 className="gallery-title">
        <i className="fas fa-video"></i> Trailers & Clips
      </h2>
      
      <div className="videos-grid">
        {videos.map(video => (
          <div key={video.id} className="video-card">
            <div className="video-thumbnail" onClick={() => setSelectedVideo(video)}>
              <img src={video.thumbnail} alt={video.title} />
              <div className="play-overlay">
                <i className="fas fa-play-circle"></i>
              </div>
              <span className="video-duration">{video.duration}</span>
            </div>
            
            <div className="video-info">
              <h4>{video.title}</h4>
              <p>{video.description}</p>
              
              <div className="video-stats">
                <button 
                  className={`like-btn ${likes[video.id] ? 'liked' : ''}`}
                  onClick={() => handleLike(video.id)}
                >
                  <i className="fas fa-heart"></i>
                  <span>{likes[video.id] || video.likes || 0}</span>
                </button>
                
                <span className="views">
                  <i className="fas fa-eye"></i> {video.views || 0}
                </span>
                
                <span className="date">
                  <i className="fas fa-calendar"></i> {video.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <VideoPlayer 
          url={selectedVideo.url}
          title={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};

export default VideoGallery;