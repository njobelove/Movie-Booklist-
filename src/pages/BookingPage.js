import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { showtimeAPI, bookingAPI } from '../services/api';
import Header from '../components/common/Header';
import './BookingPage.css';

const BookingPage = () => {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  const [showtime, setShowtime] = useState(null);
  const [seatMap, setSeatMap] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingStep, setBookingStep] = useState(1);

  useEffect(() => {
  const loadShowtimeDetails = async () => {
    try {
      setLoading(true);
      const response = await showtimeAPI.getShowtimeById(showtimeId);
      if (response.success) {
        setShowtime(response.data);
        setSeatMap(response.data.seatMap);
      }
    } catch (error) {
      console.error('Error loading showtime:', error);
    } finally {
      setLoading(false);
    }
  };

  loadShowtimeDetails();
}, [showtimeId]);

  const loadShowtimeDetails = async () => {
    try {
      setLoading(true);
      const response = await showtimeAPI.getShowtimeById(showtimeId);
      if (response.success) {
        setShowtime(response.data);
        setSeatMap(response.data.seatMap);
      }
    } catch (error) {
      console.error('Error loading showtime:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeatClick = (seat) => {
    if (!seat.isAvailable) return;

    setSelectedSeats(prev => {
      const exists = prev.find(s => s.id === seat.id);
      if (exists) {
        return prev.filter(s => s.id !== seat.id);
      } else {
        return [...prev, seat];
      }
    });
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  const handleConfirmBooking = async () => {
    const bookingData = {
      showtimeId: showtime.id,
      seats: selectedSeats.map(s => s.id),
      totalAmount: calculateTotal(),
      userId: 'user123' // In real app, this comes from auth
    };

    const response = await bookingAPI.createBooking(bookingData);
    if (response.success) {
      navigate(`/confirmation/${response.data.id}`);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading booking details...</p>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <Header />
      
      <div className="booking-container">
        <div className="booking-header">
          <h1>Complete Your Booking</h1>
        </div>

        {bookingStep === 1 && (
          <div className="seat-selection-section">
            <div className="movie-info-card">
              <img 
                src={showtime?.movie?.posterUrl} 
                alt={showtime?.movie?.title} 
                className="movie-thumb" 
              />
              <div className="movie-info">
                <h2>{showtime?.movie?.title}</h2>
                <p>{showtime?.date} • {showtime?.time}</p>
                <p>{showtime?.screen} • {showtime?.format}</p>
                <p className="theater-name">{showtime?.theater?.name}</p>
              </div>
            </div>

            <div className="seat-map-container">
              <div className="screen">SCREEN</div>
              
              <div className="seat-map">
                {seatMap.map((row, rowIndex) => (
                  <div key={rowIndex} className="seat-row">
                    <span className="row-label">{String.fromCharCode(65 + rowIndex)}</span>
                    {row.map((seat) => (
                      <button
                        key={seat.id}
                        className={`seat-btn 
                          ${seat.isAvailable ? 'available' : 'booked'} 
                          ${seat.isPremium ? 'premium' : ''}
                          ${selectedSeats.find(s => s.id === seat.id) ? 'selected' : ''}
                        `}
                        onClick={() => handleSeatClick(seat)}
                        disabled={!seat.isAvailable}
                      >
                        {seat.number}
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              <div className="seat-legend">
                <div className="legend-item">
                  <div className="legend-box available"></div>
                  <span>Available (${showtime?.price})</span>
                </div>
                <div className="legend-item">
                  <div className="legend-box premium"></div>
                  <span>Premium (${showtime?.price + 3})</span>
                </div>
                <div className="legend-item">
                  <div className="legend-box selected"></div>
                  <span>Selected</span>
                </div>
                <div className="legend-item">
                  <div className="legend-box booked"></div>
                  <span>Booked</span>
                </div>
              </div>
            </div>

            <div className="booking-summary">
              <div className="summary-details">
                <h3>Booking Summary</h3>
                <div className="summary-row">
                  <span>Selected Seats:</span>
                  <span>{selectedSeats.map(s => s.id).join(', ') || 'None'}</span>
                </div>
                <div className="summary-row">
                  <span>Number of Seats:</span>
                  <span>{selectedSeats.length}</span>
                </div>
                <div className="summary-row total">
                  <span>Total Amount:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                className="proceed-btn"
                onClick={() => setBookingStep(2)}
                disabled={selectedSeats.length === 0}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        )}

        {bookingStep === 2 && (
          <div className="payment-section">
            <div className="payment-form">
              <h2>Payment Details</h2>
              
              <div className="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input type="text" placeholder="123" />
                </div>
              </div>

              <div className="form-group">
                <label>Cardholder Name</label>
                <input type="text" placeholder="John Doe" />
              </div>

              <div className="payment-summary">
                <div className="summary-row">
                  <span>Total:</span>
                  <span>${(calculateTotal() + 1.5).toFixed(2)}</span>
                </div>
              </div>

              <button className="confirm-btn" onClick={handleConfirmBooking}>
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;