import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/common/Header';
import './Confirmation.css';

const Confirmation = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userBookings } = useSelector((state) => state.booking);

  useEffect(() => {
    // In a real app, you'd fetch the booking by ID
    // For now, we'll use the last booking from state
    const lastBooking = userBookings[userBookings.length - 1];
    if (lastBooking) {
      setBooking(lastBooking);
    }
    setLoading(false);
  }, [bookingId, userBookings]);

  const handleDownloadTicket = () => {
    // Create a simple ticket HTML
    const ticketContent = `
      <html>
        <head>
          <title>Movie Ticket - ${booking?.movie?.title}</title>
          <style>
            body { font-family: Arial; padding: 40px; }
            .ticket { border: 2px solid #1976d2; padding: 30px; max-width: 600px; margin: 0 auto; }
            h1 { color: #1976d2; text-align: center; }
            .details { margin: 30px 0; }
            .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #ddd; }
            .qr { text-align: center; margin: 30px 0; }
            .footer { text-align: center; color: #666; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="ticket">
            <h1>🎬 MovieMagic Cinema</h1>
            <div class="details">
              <div class="row"><strong>Booking ID:</strong> ${booking?.id}</div>
              <div class="row"><strong>Movie:</strong> ${booking?.movie?.title}</div>
              <div class="row"><strong>Date:</strong> ${booking?.showtime?.date}</div>
              <div class="row"><strong>Time:</strong> ${booking?.showtime?.time}</div>
              <div class="row"><strong>Screen:</strong> ${booking?.showtime?.screen}</div>
              <div class="row"><strong>Seats:</strong> ${booking?.seats?.join(', ')}</div>
              <div class="row"><strong>Total:</strong> $${booking?.totalAmount}</div>
            </div>
            <div class="qr">[QR Code Placeholder]</div>
            <div class="footer">Present this ticket at the counter</div>
          </div>
        </body>
      </html>
    `;

    // Create a blob and download
    const blob = new Blob([ticketContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket-${booking?.id}.html`;
    a.click();
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading confirmation...</p>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <Header />
      
      <div className="confirmation-container">
        <div className="success-animation">
          <i className="fas fa-check-circle"></i>
        </div>
        
        <h1>Booking Confirmed!</h1>
        <p className="confirmation-message">
          Your tickets have been booked successfully. A confirmation email has been sent to your registered email address.
        </p>

        {booking && (
          <div className="ticket-card">
            <div className="ticket-header">
              <h2>🎬 MovieMagic Cinema</h2>
              <span className="ticket-id">#{booking.id}</span>
            </div>

            <div className="ticket-body">
              <div className="ticket-movie">
                <h3>{booking.movie?.title}</h3>
                <p className="movie-genre">{booking.movie?.genre?.join(' • ')}</p>
              </div>

              <div className="ticket-details-grid">
                <div className="detail-item">
                  <i className="fas fa-calendar"></i>
                  <div>
                    <span className="detail-label">Date</span>
                    <span className="detail-value">{booking.showtime?.date}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <i className="fas fa-clock"></i>
                  <div>
                    <span className="detail-label">Time</span>
                    <span className="detail-value">{booking.showtime?.time}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <i className="fas fa-chair"></i>
                  <div>
                    <span className="detail-label">Seats</span>
                    <span className="detail-value">{booking.seats?.join(', ')}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <i className="fas fa-tag"></i>
                  <div>
                    <span className="detail-label">Screen</span>
                    <span className="detail-value">{booking.showtime?.screen}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <i className="fas fa-film"></i>
                  <div>
                    <span className="detail-label">Format</span>
                    <span className="detail-value">{booking.showtime?.format}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <i className="fas fa-dollar-sign"></i>
                  <div>
                    <span className="detail-label">Total</span>
                    <span className="detail-value">${booking.totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="theater-info">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h4>{booking.theater?.name}</h4>
                  <p>{booking.theater?.location}</p>
                </div>
              </div>
            </div>

            <div className="ticket-footer">
              <div className="qr-code">
                <i className="fas fa-qrcode"></i>
                <span>Scan at entrance</span>
              </div>
              <button className="download-btn" onClick={handleDownloadTicket}>
                <i className="fas fa-download"></i> Download Ticket
              </button>
            </div>
          </div>
        )}

        <div className="action-buttons">
          <button className="home-btn" onClick={() => navigate('/')}>
            <i className="fas fa-home"></i> Back to Home
          </button>
          <button className="bookings-btn" onClick={() => navigate('/bookings')}>
            <i className="fas fa-ticket-alt"></i> View My Bookings
          </button>
        </div>

        <div className="additional-info">
          <h3>Important Information</h3>
          <ul>
            <li><i className="fas fa-clock"></i> Please arrive at least 30 minutes before showtime</li>
            <li><i className="fas fa-id-card"></i> Carry a valid ID for verification</li>
            <li><i className="fas fa-utensils"></i> Outside food and beverages are not allowed</li>
            <li><i className="fas fa-phone"></i> For assistance, call: +1 (555) 123-4567</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;