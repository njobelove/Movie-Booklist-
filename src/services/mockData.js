// Movie data
export const movies = [
  {
    id: 1,
    title: "Dune: Part Two",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    duration: 166,
    genre: ["Sci-Fi", "Adventure", "Drama"],
    rating: "PG-13",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400",
    backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200",
    releaseDate: "2024-03-01",
    language: "English",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    director: "Denis Villeneuve",
    price: 12.99,
    trailerUrl: "https://www.youtube.com/watch?v=example"
  },
  {
    id: 2,
    title: "The Batman",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate.",
    duration: 176,
    genre: ["Action", "Crime", "Drama"],
    rating: "PG-13",
    posterUrl: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=400",
    backdropUrl: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?w=1200",
    releaseDate: "2024-02-25",
    language: "English",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Paul Dano"],
    director: "Matt Reeves",
    price: 12.99,
    trailerUrl: "https://www.youtube.com/watch?v=example"
  },
  {
    id: 3,
    title: "Oppenheimer",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    duration: 180,
    genre: ["Biography", "Drama", "History"],
    rating: "R",
    posterUrl: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400",
    backdropUrl: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=1200",
    releaseDate: "2023-07-21",
    language: "English",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
    director: "Christopher Nolan",
    price: 14.99,
    trailerUrl: "https://www.youtube.com/watch?v=example"
  },
  {
    id: 4,
    title: "Spider-Man: Across the Spider-Verse",
    description: "Miles Morales catapults across the multiverse, where he encounters a team of Spider-People.",
    duration: 140,
    genre: ["Animation", "Action", "Adventure"],
    rating: "PG",
    posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400",
    backdropUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200",
    releaseDate: "2023-06-02",
    language: "English",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Brian Tyree Henry"],
    director: "Joaquim Dos Santos",
    price: 11.99,
    trailerUrl: "https://www.youtube.com/watch?v=example"
  }
];

// Theaters data
export const theaters = [
  {
    id: 1,
    name: "IMAX Downtown",
    location: "123 Cinema Street, Downtown",
    city: "New York",
    screens: 12,
    amenities: ["IMAX", "Dolby Atmos", "4DX", "VIP Lounge"]
  },
  {
    id: 2,
    name: "Cineplex MegaCenter",
    location: "456 Entertainment Blvd, Midtown",
    city: "New York",
    screens: 16,
    amenities: ["Dolby Cinema", "MX4D", "Bar", "Kids Zone"]
  }
];

// Generate seat map
const generateSeatMap = (rows = 8, cols = 10) => {
  const seatMap = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const isPremium = i < 3; // First 3 rows are premium
      const isBooked = Math.random() > 0.8 && !(i === 0 && j < 2);
      row.push({
        id: `${String.fromCharCode(65 + i)}${j + 1}`,
        row: String.fromCharCode(65 + i),
        number: j + 1,
        isAvailable: !isBooked,
        isPremium: isPremium,
        price: isPremium ? 15.99 : 12.99
      });
    }
    seatMap.push(row);
  }
  return seatMap;
};

// Showtimes data
export const showtimes = [
  {
    id: 1,
    movieId: 1,
    theaterId: 1,
    date: "2024-03-15",
    time: "10:00 AM",
    screen: "Screen 1",
    format: "2D",
    language: "English",
    price: 12.99,
    availableSeats: 45,
    totalSeats: 80,
    seatMap: generateSeatMap()
  },
  {
    id: 2,
    movieId: 1,
    theaterId: 1,
    date: "2024-03-15",
    time: "1:30 PM",
    screen: "Screen 2",
    format: "IMAX",
    language: "English",
    price: 15.99,
    availableSeats: 32,
    totalSeats: 80,
    seatMap: generateSeatMap()
  },
  {
    id: 3,
    movieId: 1,
    theaterId: 1,
    date: "2024-03-15",
    time: "4:00 PM",
    screen: "Screen 3",
    format: "3D",
    language: "English",
    price: 14.99,
    availableSeats: 28,
    totalSeats: 80,
    seatMap: generateSeatMap()
  },
  {
    id: 4,
    movieId: 2,
    theaterId: 1,
    date: "2024-03-15",
    time: "11:00 AM",
    screen: "Screen 1",
    format: "2D",
    language: "English",
    price: 12.99,
    availableSeats: 38,
    totalSeats: 80,
    seatMap: generateSeatMap()
  },
  {
    id: 5,
    movieId: 2,
    theaterId: 1,
    date: "2024-03-15",
    time: "2:30 PM",
    screen: "Screen 2",
    format: "IMAX",
    language: "English",
    price: 15.99,
    availableSeats: 42,
    totalSeats: 80,
    seatMap: generateSeatMap()
  }
];

// Bookings data
export const bookings = [];