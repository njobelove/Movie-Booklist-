# 🎬 Movie Booking App

A JavaScript single-page web application for discovering, liking, commenting on, and booking seats for TV shows and movies. Built as a capstone project using the [TVmaze API](https://www.tvmaze.com/api) and [Involvement API](https://www.notion.so/microverse/Involvement-API-869e60b5ad104603aa6db59e08150270).

## 🖥️ Live Demo

> Record a short walkthrough video and add the link here.

---

## 📸 Screenshots

| Home Page | Comments Popup | Reservations Popup |
|-----------|---------------|-------------------|
| ![Home](./images/Home.png) | ![Comments](./images/Comments.png) | ![Reservations](./images/Reservations.png) |

---

## ✨ Features

- **Browse Movies** — Fetches a live list of shows from the TVmaze API
- **Genre Filters** — Quick one-click filters for Action, Crime, Drama, Thriller, Comedy, Sci-Fi, Romance
- **Search** — Full-text search across any genre or title
- **Like** — Record a like via the Involvement API; counter updates instantly
- **Comments Popup** — View & post comments for any show (Involvement API)
- **Reservations Popup** — Book a seat for a show on a future date (Involvement API)
- **Item Counters** — All interfaces display live counts (movies, comments, reservations)
- **Unit Tests** — Counter functions covered with Jest using the AAA pattern

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| Vanilla JavaScript (ES6+) | App logic & DOM manipulation |
| ES6 Modules | Code organisation |
| Webpack 5 | Bundling & dev server |
| Babel | ES6+ transpilation |
| Jest + jsdom | Unit testing |
| [TVmaze API](https://www.tvmaze.com/api) | Movie/show data (no auth required) |
| [Involvement API](https://www.notion.so/microverse/Involvement-API-869e60b5ad104603aa6db59e08150270) | Likes, comments, reservations |

---

## 📁 Project Structure

```
movie-booking-app/
├── src/
│   ├── api/
│   │   ├── tvmaze.js          # TVmaze API calls
│   │   └── involvement.js     # Involvement API (likes/comments/reservations)
│   ├── components/
│   │   ├── homePage.js        # Home page logic & rendering
│   │   ├── commentsPopup.js   # Comments popup
│   │   └── reservationsPopup.js # Reservations popup
│   ├── utils/
│   │   └── counters.js        # Pure counter functions (unit tested)
│   ├── tests/
│   │   ├── counters.test.js   # Jest unit tests (AAA pattern)
│   │   └── __mocks__/
│   │       └── styleMock.js
│   ├── index.html             # HTML template
│   ├── index.js               # App entry point
│   └── styles.css             # All styles
├── webpack.config.js
├── jest.config.js
├── babel.config.json
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 16
- npm ≥ 8

### Installation

```bash
git clone https://github.com/<your-username>/movie-booking-app.git
cd movie-booking-app
npm install
```

### Development Server

```bash
npm start
# App runs at http://localhost:3000
```

### Production Build

```bash
npm run build
# Output in /dist
```

### Run Tests

```bash
npm test
# or with coverage:
npm test -- --coverage
```

---

## 🧪 Unit Tests

Counter utility functions are tested using **Jest** and follow the **AAA pattern** (Arrange, Act, Assert):

| Function | Tests |
|----------|-------|
| `countItems(items)` | 4 tests |
| `countComments(comments)` | 4 tests |
| `countReservations(reservations)` | 4 tests |
| `countTotalLikes(likesMap)` | 4 tests |

---

## 📡 APIs Used

### TVmaze API (no auth required)
- `GET /search/shows?q={query}` — search shows
- `GET /shows/{id}?embed=cast` — show details + cast

### Involvement API
- `GET /apps/{appId}/likes` — fetch all likes (1 request for all items)
- `POST /apps/{appId}/likes` — like an item
- `GET /apps/{appId}/comments?item_id={id}` — fetch comments
- `POST /apps/{appId}/comments` — post a comment
- `GET /apps/{appId}/reservations?item_id={id}` — fetch reservations
- `POST /apps/{appId}/reservations` — post a reservation

**Home page makes exactly 2 API requests on load:**
1. One to TVmaze for the show list
2. One to the Involvement API for all likes

---

## 🔀 Gitflow

This project follows [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow):

- `main` — production-ready code
- `develop` — integration branch
- `feature/*` — individual features (e.g. `feature/comments-popup`)
- `hotfix/*` — urgent production fixes

---

## 👥 Team

| Name | Feature |
|------|---------|
| Team Member 1 | Home page & likes |
| Team Member 2 | Comments popup |
| Team Member 3 | Reservations popup |

---

## 📝 License

MIT
