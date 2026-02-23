import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetails.css';

// Movie data (same as Home page)
const movies = [
  {
    id: 1,
    title: "Dune: Part Two",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. He must choose between his love and the fate of the universe.",
    duration: 166,
    genre: ["Sci-Fi", "Adventure", "Drama"],
    rating: "PG-13",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400",
    backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200",
    releaseDate: "2024-03-01",
    language: "English",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin", "Austin Butler"],
    director: "Denis Villeneuve",
    price: 12.99
  },
  {
    id: 2,
    title: "The Batman",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    duration: 176,
    genre: ["Action", "Crime", "Drama"],
    rating: "PG-13",
    posterUrl: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=400",
    backdropUrl: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=1200",
    releaseDate: "2024-02-25",
    language: "English",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano", "Jeffrey Wright", "Colin Farrell"],
    director: "Matt Reeves",
    price: 12.99
  },
  {
    id: 3,
    title: "Oppenheimer",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II, and the moral dilemmas he faced.",
    duration: 180,
    genre: ["Biography", "Drama", "History"],
    rating: "R",
    posterUrl: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400",
    backdropUrl: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=1200",
    releaseDate: "2023-07-21",
    language: "English",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr.", "Florence Pugh"],
    director: "Christopher Nolan",
    price: 14.99
  },
  {
    id: 4,
    title: "Spider-Man: Across the Spider-Verse",
    description: "Miles Morales catapults across the multiverse, where he encounters a team of Spider-People charged with protecting its very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders.",
    duration: 140,
    genre: ["Animation", "Action", "Adventure"],
    rating: "PG",
    posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400",
    backdropUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200",
    releaseDate: "2023-06-02",
    language: "English",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Brian Tyree Henry", "Luna Lauren Velez", "Jake Johnson"],
    director: "Joaquim Dos Santos",
    price: 11.99
  }
];

// Showtimes data
const showtimesByDate = {
  "2024-03-15": ["10:00 AM", "1:30 PM", "4:00 PM", "7:00 PM", "10:00 PM"],
  "2024-03-16": ["11:00 AM", "2:30 PM", "5:00 PM", "8:00 PM"],
  "2024-03-17": ["12:00 PM", "3:30 PM", "6:30 PM", "9:30 PM"],
  "2024-03-18": ["10:30 AM", "2:00 PM", "5:30 PM", "8:30 PM"],
  "2024-03-19": ["11:30 AM", "3:00 PM", "6:00 PM", "9:00 PM"]
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    // Find the movie by ID
    const foundMovie = movies.find(m => m.id === parseInt(id));
    setMovie(foundMovie);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    // Update showtimes when date changes
    if (showtimesByDate[selectedDate]) {
      setShowtimes(showtimesByDate[selectedDate]);
    } else {
      setShowtimes(["10:00 AM", "1:30 PM", "4:00 PM", "7:00 PM", "10:00 PM"]);
    }
  }, [selectedDate]);

  const handleBookNow = (time) => {
    // Navigate to booking page with showtime details
    navigate(`/booking/${id}?time=${time}&date=${selectedDate}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="error-container">
        <h2>Movie Not Found</h2>
        <p>The movie you're looking for doesn't exist.</p>
        <button className="back-btn" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="movie-details-page">
      {/* Hero Section with Backdrop */}
      <div className="details-hero" style={{ backgroundImage: `url(${movie.backdropUrl})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <button className="back-button" onClick={() => navigate('/')}>
            ← Back to Movies
          </button>
          <h1 className="movie-title">{movie.title}</h1>
          <div className="movie-quick-info">
            <span><i className="far fa-clock"></i> {movie.duration} min</span>
            <span><i className="fas fa-star"></i> {movie.rating}</span>
            <span><i className="fas fa-globe"></i> {movie.language}</span>
            <span><i className="fas fa-calendar"></i> {movie.releaseDate}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="details-container">
        {/* Left Column - Poster */}
        <div className="poster-section">
          <img src={movie.posterUrl} alt={movie.title} className="details-poster" />
          <div className="price-tag">
            <span className="price-label">Starting from</span>
            <span className="price-value">${movie.price}</span>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="info-section">
          <h2>Synopsis</h2>
          <p className="movie-description">{movie.description}</p>

          <div className="movie-details-grid">
            <div className="detail-item">
              <h3>Director</h3>
              <p>{movie.director}</p>
            </div>
            <div className="detail-item">
              <h3>Release Date</h3>
              <p>{movie.releaseDate}</p>
            </div>
            <div className="detail-item">
              <h3>Language</h3>
              <p>{movie.language}</p>
            </div>
            <div className="detail-item">
              <h3>Rating</h3>
              <p>{movie.rating}</p>
            </div>
          </div>

          <h3>Cast</h3>
          <div className="cast-list">
            {movie.cast.map((actor, index) => (
              <div key={index} className="cast-member">
                <div className="cast-avatar">{actor.charAt(0)}</div>
                <span>{actor}</span>
              </div>
            ))}
          </div>

          <h3>Genre</h3>
          <div className="genre-list">
            {movie.genre.map((g, index) => (
              <span key={index} className="genre-tag">{g}</span>
            ))}
          </div>

          <h3>Select Date</h3>
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-picker"
            min={new Date().toISOString().split('T')[0]}
            max="2024-03-30"
          />

          <h3>Showtimes</h3>
          <div className="showtimes-grid">
            {showtimes.map((time, index) => (
              <button 
                key={index} 
                className="showtime-button"
                onClick={() => handleBookNow(time)}
              >
                <span className="time">{time}</span>
                <span className="screen">Screen {Math.floor(Math.random() * 5) + 1}</span>
                <span className="format">2D</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;