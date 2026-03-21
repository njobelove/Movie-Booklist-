import { fetchShowDetails } from '../api/tvmaze.js';
import { fetchReservations, postReservation } from '../api/involvement.js';
import { countReservations } from '../utils/counters.js';
import { closePopup } from './commentsPopup.js';

/**
 * Render and open the Reservations popup for a given show
 * @param {number} showId
 */
export const openReservationsPopup = async (showId) => {
  const existing = document.getElementById('reservations-popup');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'reservations-popup';
  overlay.className = 'popup-overlay';
  overlay.innerHTML = `
    <div class="popup-container" role="dialog" aria-modal="true" aria-label="Reservations">
      <button class="popup-close" id="close-reservations" aria-label="Close">&times;</button>
      <div class="popup-content" id="reservations-content">
        <div class="popup-loading">
          <div class="spinner"></div>
          <p>Loading movie details…</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  overlay.querySelector('#close-reservations').addEventListener('click', () => closePopup('reservations-popup'));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closePopup('reservations-popup'); });

  try {
    const [show, reservations] = await Promise.all([
      fetchShowDetails(showId),
      fetchReservations(showId),
    ]);
    renderReservationsPopup(overlay.querySelector('#reservations-content'), show, reservations);
  } catch {
    overlay.querySelector('#reservations-content').innerHTML = '<p class="error">Failed to load data. Please try again.</p>';
  }
};

const renderReservationsPopup = (container, show, reservations) => {
  const count = countReservations(reservations);

  // Generate next 30 available dates
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }

  container.innerHTML = `
    <div class="popup-header">
      <img src="${show.image}" alt="${show.name}" class="popup-img popup-img--tall" />
      <div class="popup-info">
        <h2 class="popup-title">${show.name}</h2>
        <div class="popup-meta">
          <span class="badge">${show.genres.join(', ') || 'N/A'}</span>
          <span class="badge badge-rating">⭐ ${show.rating}</span>
          <span class="badge badge-status">${show.status}</span>
        </div>
        <div class="show-details-grid">
          <div><strong>Premiered</strong><span>${show.premiered}</span></div>
          <div><strong>Network</strong><span>${show.network}</span></div>
          <div><strong>Language</strong><span>${show.language}</span></div>
        </div>
      </div>
    </div>

    <div class="popup-section reservations-section">
      <h3>Reservations <span class="count-badge" id="reservations-count">${count}</span></h3>

      <div class="reservations-list" id="reservations-list">
        ${count === 0
    ? '<p class="no-data">No reservations yet. Be the first to book!</p>'
    : reservations.map((r) => `
              <div class="reservation-item">
                <div class="reservation-avatar">${r.username.charAt(0).toUpperCase()}</div>
                <div class="reservation-body">
                  <strong>${r.username}</strong>
                  <span class="reservation-date">📅 ${r.date}</span>
                </div>
              </div>
            `).join('')}
      </div>

      <form class="reservation-form" id="reservation-form" novalidate>
        <h4>Book Your Seat</h4>
        <div class="form-row">
          <div class="form-group">
            <label for="res-username">Your Name</label>
            <input type="text" id="res-username" placeholder="Enter your name" required maxlength="50" />
          </div>
          <div class="form-group">
            <label for="res-date">Select Date</label>
            <select id="res-date" required>
              <option value="">-- Pick a date --</option>
              ${dates.map((d) => `<option value="${d}">${d}</option>`).join('')}
            </select>
          </div>
        </div>
        <button type="submit" class="btn-primary btn-reserve" id="submit-reservation">
          🎬 Reserve Seat
        </button>
        <p class="form-error hidden" id="reservation-error">Please fill in all fields.</p>
        <p class="form-success hidden" id="reservation-success">✅ Reservation confirmed!</p>
      </form>
    </div>
  `;

  container.querySelector('#reservation-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = container.querySelector('#res-username').value.trim();
    const date = container.querySelector('#res-date').value;
    const errorEl = container.querySelector('#reservation-error');
    const successEl = container.querySelector('#reservation-success');

    if (!username || !date) {
      errorEl.classList.remove('hidden');
      successEl.classList.add('hidden');
      return;
    }
    errorEl.classList.add('hidden');

    const btn = container.querySelector('#submit-reservation');
    btn.disabled = true;
    btn.textContent = 'Booking…';

    try {
      await postReservation(show.id, username, date);
      const updated = await fetchReservations(show.id);
      const newCount = countReservations(updated);

      container.querySelector('#reservations-count').textContent = newCount;
      const list = container.querySelector('#reservations-list');
      list.querySelector('.no-data')?.remove();
      const div = document.createElement('div');
      div.className = 'reservation-item animate-in';
      div.innerHTML = `
        <div class="reservation-avatar">${username.charAt(0).toUpperCase()}</div>
        <div class="reservation-body">
          <strong>${username}</strong>
          <span class="reservation-date">📅 ${date}</span>
        </div>
      `;
      list.appendChild(div);
      container.querySelector('#res-username').value = '';
      container.querySelector('#res-date').value = '';
      successEl.classList.remove('hidden');
      setTimeout(() => successEl.classList.add('hidden'), 3000);
    } catch {
      errorEl.textContent = 'Booking failed. Please try again.';
      errorEl.classList.remove('hidden');
    } finally {
      btn.disabled = false;
      btn.textContent = '🎬 Reserve Seat';
    }
  });
};
