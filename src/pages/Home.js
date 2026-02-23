import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

// Movie data
const movies = [
  {
    id: 1,
    title: "Dune: Part Two",
    description: "Paul Atreides unites with Chani and the Fremen to seek revenge against those who destroyed his family.",
    duration: 166,
    genre: ["Sci-Fi", "Adventure", "Drama"],
    rating: "PG-13",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400",
    language: "English",
    price: 12.99,
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    director: "Denis Villeneuve"
  },
  {
    id: 2,
    title: "The Batman",
    description: "When a killer targets Gotham's elite, Batman investigates corruption linked to his own family.",
    duration: 176,
    genre: ["Action", "Crime", "Drama"],
    rating: "PG-13",
    posterUrl: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=400",
    language: "English",
    price: 12.99,
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
    director: "Matt Reeves"
  },
  {
    id: 3,
    title: "Oppenheimer",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the atomic bomb.",
    duration: 180,
    genre: ["Biography", "Drama", "History"],
    rating: "R",
    posterUrl: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400",
    language: "English",
    price: 14.99,
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
    director: "Christopher Nolan"
  },
  {
    id: 4,
    title: "Spider-Man: Across the Spider-Verse",
    description: "Miles Morales catapults across the multiverse, where he encounters a team of Spider-People.",
    duration: 140,
    genre: ["Animation", "Action", "Adventure"],
    rating: "PG",
    posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400",
    language: "English",
    price: 11.99,
    cast: ["Shameik Moore", "Hailee Steinfeld", "Brian Tyree Henry"],
    director: "Joaquim Dos Santos"
  }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <h1>🎬 MovieMagic Cinema</h1>
        <p>Book tickets for the latest blockbusters</p>
      </div>

      {/* Movie Grid */}
      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
            <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>{movie.genre.join(' • ')}</p>
              <p>{movie.duration} min • {movie.rating}</p>
              <p className="price">From ${movie.price}</p>
              <button className="book-btn">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;