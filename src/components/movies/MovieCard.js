import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-card">
      <div className="movie-poster-container">
        <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
        <div className="movie-rating">{movie.rating}</div>
      </div>
      
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        
        <div className="movie-meta">
          <span className="movie-duration">
            <i className="far fa-clock"></i> {movie.duration} min
          </span>
          <span className="movie-language">
            <i className="fas fa-globe"></i> {movie.language}
          </span>
        </div>
        
        <div className="movie-genres">
          {movie.genre.slice(0, 3).map((genre, index) => (
            <span key={index} className="genre-tag">{genre}</span>
          ))}
        </div>
        
        <div className="movie-price">
          <span className="price-label">Starting from</span>
          <span className="price-value">${movie.price}</span>
        </div>
        
        <button className="book-now-btn" onClick={handleBookClick}>
          <i className="fas fa-ticket-alt"></i> Book Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;