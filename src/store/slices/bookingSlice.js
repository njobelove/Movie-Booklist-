import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    selectedMovie: null,
    selectedShowtime: null,
    selectedSeats: [],
    bookingDetails: null,
    userBookings: [],
    loading: false,
    error: null
  },
  reducers: {
    selectMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    selectShowtime: (state, action) => {
      state.selectedShowtime = action.payload;
    },
    toggleSeat: (state, action) => {
      const seat = action.payload;
      const index = state.selectedSeats.findIndex(s => s.id === seat.id);
      
      if (index === -1) {
        state.selectedSeats.push(seat);
      } else {
        state.selectedSeats.splice(index, 1);
      }
    },
    clearSelection: (state) => {
      state.selectedMovie = null;
      state.selectedShowtime = null;
      state.selectedSeats = [];
    },
    setBookingDetails: (state, action) => {
      state.bookingDetails = action.payload;
    },
    addUserBooking: (state, action) => {
      state.userBookings.push(action.payload);
    },
    setUserBookings: (state, action) => {
      state.userBookings = action.payload;
    }
  }
});

export const {
  selectMovie,
  selectShowtime,
  toggleSeat,
  clearSelection,
  setBookingDetails,
  addUserBooking,
  setUserBookings
} = bookingSlice.actions;

export default bookingSlice.reducer;