import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { movieAPI } from '../../services/api';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const response = await movieAPI.getAllMovies();
    return response.data;
  }
);

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (id) => {
    const response = await movieAPI.getMovieById(id);
    return response.data;
  }
);

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (query) => {
    const response = await movieAPI.searchMovies(query);
    return response.data;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    currentMovie: null,
    searchResults: [],
    loading: false,
    error: null,
    filters: {
      genre: '',
      language: '',
      date: ''
    }
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { genre: '', language: '', date: '' };
    },
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Movies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch Movie by ID
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      // Search Movies
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      });
  }
});

export const { setFilters, clearFilters, clearCurrentMovie } = movieSlice.actions;
export default movieSlice.reducer;