import React, { useState } from 'react';
import './AdminUpload.css';

const AdminUpload = () => {
  const [movieData, setMovieData] = useState({
    title: '',
    description: '',
    duration: '',
    genre: '',
    rating: '',
    posterUrl: '',
    trailerUrl: '',
    releaseDate: '',
    language: '',
    cast: '',
    director: ''
  });

  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      // Create object URL for preview
      const url = URL.createObjectURL(file);
      setMovieData(prev => ({
        ...prev,
        trailerUrl: url
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setUploading(false);
        alert('Movie uploaded successfully!');
        // Reset form
        setMovieData({
          title: '',
          description: '',
          duration: '',
          genre: '',
          rating: '',
          posterUrl: '',
          trailerUrl: '',
          releaseDate: '',
          language: '',
          cast: '',
          director: ''
        });
        setVideoFile(null);
        setUploadProgress(0);
      }
    }, 500);
  };

  return (
    <div className="admin-upload">
      <h1><i className="fas fa-cloud-upload-alt"></i> Upload New Movie</h1>
      
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Movie Title *</label>
            <input
              type="text"
              name="title"
              value={movieData.title}
              onChange={handleInputChange}
              required
              placeholder="e.g., Dune: Part Two"
            />
          </div>

          <div className="form-group">
            <label>Duration (minutes) *</label>
            <input
              type="number"
              name="duration"
              value={movieData.duration}
              onChange={handleInputChange}
              required
              placeholder="166"
            />
          </div>

          <div className="form-group full-width">
            <label>Description *</label>
            <textarea
              name="description"
              value={movieData.description}
              onChange={handleInputChange}
              required
              rows="4"
              placeholder="Enter movie description..."
            />
          </div>

          <div className="form-group">
            <label>Genre *</label>
            <input
              type="text"
              name="genre"
              value={movieData.genre}
              onChange={handleInputChange}
              required
              placeholder="Sci-Fi, Adventure, Drama"
            />
          </div>

          <div className="form-group">
            <label>Rating *</label>
            <select
              name="rating"
              value={movieData.rating}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Rating</option>
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="R">R</option>
            </select>
          </div>

          <div className="form-group">
            <label>Language *</label>
            <input
              type="text"
              name="language"
              value={movieData.language}
              onChange={handleInputChange}
              required
              placeholder="English"
            />
          </div>

          <div className="form-group">
            <label>Release Date *</label>
            <input
              type="date"
              name="releaseDate"
              value={movieData.releaseDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Director *</label>
            <input
              type="text"
              name="director"
              value={movieData.director}
              onChange={handleInputChange}
              required
              placeholder="Christopher Nolan"
            />
          </div>

          <div className="form-group full-width">
            <label>Cast (comma separated) *</label>
            <input
              type="text"
              name="cast"
              value={movieData.cast}
              onChange={handleInputChange}
              required
              placeholder="Timothée Chalamet, Zendaya, Rebecca Ferguson"
            />
          </div>

          <div className="form-group full-width">
            <label>Poster URL *</label>
            <input
              type="url"
              name="posterUrl"
              value={movieData.posterUrl}
              onChange={handleInputChange}
              required
              placeholder="https://example.com/poster.jpg"
            />
          </div>

          <div className="form-group full-width">
            <label>Upload Trailer Video *</label>
            <div className="file-upload">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                required
                id="video-upload"
              />
              <label htmlFor="video-upload" className="file-label">
                <i className="fas fa-upload"></i>
                {videoFile ? videoFile.name : 'Choose Video File'}
              </label>
            </div>
            {videoFile && (
              <div className="video-preview">
                <video controls width="100%">
                  <source src={movieData.trailerUrl} type={videoFile.type} />
                </video>
              </div>
            )}
          </div>
        </div>

        {uploading && (
          <div className="upload-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <span>{uploadProgress}% Uploaded</span>
          </div>
        )}

        <button 
          type="submit" 
          className="submit-btn"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Movie'}
        </button>
      </form>
    </div>
  );
};

export default AdminUpload;