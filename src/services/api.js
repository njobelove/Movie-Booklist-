import { movies, theaters, showtimes, bookings } from './mockData';

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Movie API
export const movieAPI = {
  getAllMovies: async () => {
    await delay();
    return { success: true, data: movies };
  },

  getMovieById: async (id) => {
    await delay();
    const movie = movies.find(m => m.id === parseInt(id));
    return { success: !!movie, data: movie };
  },

  getMoviesByGenre: async (genre) => {
    await delay();
    const filtered = movies.filter(m => m.genre.includes(genre));
    return { success: true, data: filtered };
  },

  searchMovies: async (query) => {
    await delay();
    const results = movies.filter(m => 
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.description.toLowerCase().includes(query.toLowerCase())
    );
    return { success: true, data: results };
  }
};

// Theater API
export const theaterAPI = {
  getAllTheaters: async () => {
    await delay();
    return { success: true, data: theaters };
  },

  getTheaterById: async (id) => {
    await delay();
    const theater = theaters.find(t => t.id === parseInt(id));
    return { success: !!theater, data: theater };
  }
};

// Showtime API
export const showtimeAPI = {
  getShowtimesByMovie: async (movieId, date = null) => {
    await delay();
    let filtered = showtimes.filter(s => s.movieId === parseInt(movieId));
    
    if (date) {
      filtered = filtered.filter(s => s.date === date);
    }
    
    return { success: true, data: filtered };
  },

  getShowtimeById: async (id) => {
    await delay();
    const showtime = showtimes.find(s => s.id === parseInt(id));
    if (showtime) {
      const movie = movies.find(m => m.id === showtime.movieId);
      const theater = theaters.find(t => t.id === showtime.theaterId);
      return { success: true, data: { ...showtime, movie, theater } };
    }
    return { success: false, data: null };
  },

  getAvailableSeats: async (showtimeId) => {
    await delay();
    const showtime = showtimes.find(s => s.id === parseInt(showtimeId));
    if (showtime) {
      const availableSeats = showtime.seatMap.flat().filter(seat => seat.isAvailable);
      return { 
        success: true, 
        data: {
          seatMap: showtime.seatMap,
          availableCount: availableSeats.length,
          totalSeats: showtime.totalSeats
        }
      };
    }
    return { success: false, data: null };
  }
};

// Booking API
export const bookingAPI = {
  createBooking: async (bookingData) => {
    await delay(1000);
    
    const booking = {
      id: `BKG${Date.now()}`,
      ...bookingData,
      bookingDate: new Date().toISOString(),
      status: 'confirmed',
      paymentStatus: 'paid'
    };
    
    bookings.push(booking);
    
    // Update seat availability in showtime
    const showtime = showtimes.find(s => s.id === parseInt(bookingData.showtimeId));
    if (showtime) {
      bookingData.seats.forEach(seatId => {
        const seat = showtime.seatMap.flat().find(s => s.id === seatId);
        if (seat) seat.isAvailable = false;
      });
      showtime.availableSeats -= bookingData.seats.length;
    }
    
    return { success: true, data: booking };
  },

  getUserBookings: async (userId) => {
    await delay();
    const userBookings = bookings.filter(b => b.userId === userId);
    
    // Enrich with movie and theater data
    const enriched = userBookings.map(booking => {
      const showtime = showtimes.find(s => s.id === parseInt(booking.showtimeId));
      const movie = movies.find(m => m.id === showtime?.movieId);
      const theater = theaters.find(t => t.id === showtime?.theaterId);
      return { ...booking, movie, theater, showtime };
    });
    
    return { success: true, data: enriched };
  },

  cancelBooking: async (bookingId) => {
    await delay();
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      booking.status = 'cancelled';
      
      // Release seats
      const showtime = showtimes.find(s => s.id === parseInt(booking.showtimeId));
      if (showtime) {
        booking.seats.forEach(seatId => {
          const seat = showtime.seatMap.flat().find(s => s.id === seatId);
          if (seat) seat.isAvailable = true;
        });
        showtime.availableSeats += booking.seats.length;
      }
      
      return { success: true, message: 'Booking cancelled' };
    }
    return { success: false, message: 'Booking not found' };
  }
};