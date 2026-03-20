import { fetchShows } from '../api/tvmaze.js';
import { fetchAllLikes, likeItem } from '../api/involvement.js';
import { countItems } from '../utils/counters.js';
import { openCommentsPopup } from './commentsPopup.js';
import { openReservationsPopup } from './reservationsPopup.js';

let currentQuery = 'action';

export const initHomePage = async () => {
  const grid = document.getElementById('movies-grid');
  const countEl = document.getElementById('movies-count');

  grid.innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      <p>Loading movies‚Ä¶</p>
    </div>
  `;

  try {
    const [shows, likesMap] = await Promise.all([
      fetchShows(currentQuery),
      fetchAllLikes(),
    ]);

    const count = countItems(shows);
    countEl.textContent = count;

    if (count === 0) {
      grid.innerHTML = '<p class="no-data">No movies found. Try a different search.</p>';
      return;
    }

    grid.innerHTML = '';
    shows.forEach((show, i) => {
      const likes = likesMap[show.id] || 0;
      const card = createMovieCard(show, likes, i);
      grid.appendChild(card);
    });
  } catch (err) {
    grid.innerHTML = `<p class="error">‚ö†Ô∏è Failed to load movies. Check your connection.<br><small>${err.message}</small></p>`;
  }
};

const createMovieCard = (show, likes, index) => {
  const card = document.createElement('article');
  card.className = 'movie-card';
  card.style.animationDelay = `${index * 0.05}s`;
  card.dataset.id = show.id;

  card.innerHTML = `
    <div class="card-img-wrapper">
      <img
        src="${show.image}"
        alt="${show.name}"
        class="card-img"
        loading="lazy"
        onerror="this.src='https://via.placeholder.com/210x295/1a1a2e/e0e0e0?text=No+Image'"
      />
      <div class="card-overlay">
        <div class="card-genres">${show.genres.slice(0, 2).join(' ¬∑ ') || 'Drama'}</div>
        ${show.rating !== 'N/A' ? `<div class="card-rating">‚≠ê ${show.rating}</div>` : ''}
      </div>
    </div>
    <div class="card-body">
      <h3 class="card-title">${show.name}</h3>
      <p class="card-year">${show.premiered?.split('-')[0] || 'N/A'} ¬∑ ${show.network}</p>
      <div class="card-actions">
        <button class="btn-like" data-id="${show.id}" aria-label="Like ${show.name}">
          <span class="heart-icon">‚ô•</span>
          <span class="like-count" id="like-count-${show.id}">${likes}</span>
        </button>
        <button class="btn-comments" data-id="${show.id}">Ì≤¨ Comments</button>
        <button class="btn-reserve" data-id="${show.id}">Ìæ¨ Reserve</button>
      </div>
    </div>
  `;

  card.querySelector('.btn-like').addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    btn.disabled = true;
    btn.classList.add('liking');
    try {
      await likeItem(show.id);
      const countEl = card.querySelector(`#like-count-${show.id}`);
      countEl.textContent = parseInt(countEl.textContent, 10) + 1;
      btn.classList.add('liked');
    } catch {}
    finally {
      btn.disabled = false;
      btn.classList.remove('liking');
    }
  });

  card.querySelector('.btn-comments').addEventListener('click', () => openCommentsPopup(show.id));
  card.querySelector('.btn-reserve').addEventListener('click', () => openReservationsPopup(show.id));

  return card;
};

export const initSearch = () => {
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;
    currentQuery = query;
    await initHomePage();
  });

  document.querySelectorAll('.genre-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      document.querySelectorAll('.genre-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentQuery = btn.dataset.genre;
      input.value = currentQuery;
      await initHomePage();
    });
  });
};
