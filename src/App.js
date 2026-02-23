import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import BookingPage from './pages/BookingPage';
import Confirmation from './pages/Confirmation';
import AdminUpload from './pages/AdminUpload';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/booking/:showtimeId" element={<BookingPage />} />
          <Route path="/confirmation/:bookingId" element={<Confirmation />} />
          <Route path="/admin/upload" element={<AdminUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;