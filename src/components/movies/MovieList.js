import React, { useEffect, useState } from 'react';
import { movieAPI } from '../../services/api';  // Import the API
import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);  // Local state for movies
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const response = await movieAPI.getAllMovies();  // Call the API
      setMovies(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle"></i>
        <p>Error: {error}</p>
        <button className="retry-btn" onClick={loadMovies}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      <div className="movie-list-header">
        <h2 className="movie-list-title">
          <i className="fas fa-film"></i> Now Showing
        </h2>
      </div>
      
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;