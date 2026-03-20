import { fetchShowDetails } from '../api/tvmaze.js';
import { fetchComments, postComment } from '../api/involvement.js';
import { countComments } from '../utils/counters.js';

export const openCommentsPopup = async (showId) => {
  const existing = document.getElementById('comments-popup');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'comments-popup';
  overlay.className = 'popup-overlay';
  overlay.innerHTML = `
    <div class="popup-container" role="dialog" aria-modal="true" aria-label="Comments">
      <button class="popup-close" id="close-comments" aria-label="Close">&times;</button>
      <div class="popup-content" id="comments-content">
        <div class="popup-loading">
          <div class="spinner"></div>
          <p>Loading movie details…</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  overlay.querySelector('#close-comments').addEventListener('click', () => closePopup('comments-popup'));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closePopup('comments-popup'); });

  try {
    const [show, comments] = await Promise.all([
      fetchShowDetails(showId),
      fetchComments(showId),
    ]);
    renderCommentsPopup(overlay.querySelector('#comments-content'), show, comments);
  } catch (err) {
    console.error('Failed to load popup:', err);
    overlay.querySelector('#comments-content').innerHTML =
      `<p class="error">Failed to load data: ${err.message}</p>`;
  }
};

const renderCommentsPopup = (container, show, comments) => {
  const count = countComments(comments);

  container.innerHTML = `
    <div class="popup-header">
      <img src="${show.image}" alt="${show.name}" class="popup-img" />
      <div class="popup-info">
        <h2 class="popup-title">${show.name}</h2>
        <div class="popup-meta">
          <span class="badge">${show.genres.join(', ') || 'N/A'}</span>
          <span class="badge badge-rating">⭐ ${show.rating}</span>
          <span class="badge">${show.status}</span>
        </div>
        <p class="popup-summary">${show.summary}</p>
        ${show.cast.length ? `
          <div class="popup-cast">
            <h4>Cast</h4>
            <div class="cast-list">
              ${show.cast.map((c) => `
                <div class="cast-item">
                  ${c.image ? `<img src="${c.image}" alt="${c.name}" />` : '<div class="cast-placeholder"></div>'}
                  <span>${c.name}</span>
                  <small>${c.character}</small>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>

    <div class="popup-section comments-section">
      <h3>Comments <span class="count-badge" id="comments-count">${count}</span></h3>

      <div class="comments-list" id="comments-list">
        ${count === 0
          ? '<p class="no-data">No comments yet. Be the first!</p>'
          : comments.map((c) => `
              <div class="comment-item">
                <div class="comment-avatar">${c.username.charAt(0).toUpperCase()}</div>
                <div class="comment-body">
                  <strong>${c.username}</strong>
                  <span class="comment-date">${c.creation_date || ''}</span>
                  <p>${c.comment}</p>
                </div>
              </div>
            `).join('')}
      </div>

      <form class="comment-form" id="comment-form" novalidate>
        <h4>Add a Comment</h4>
        <div class="form-group">
          <input type="text" id="comment-username" placeholder="Your name" required maxlength="50" />
        </div>
        <div class="form-group">
          <textarea id="comment-text" placeholder="Share your thoughts…" required maxlength="500" rows="3"></textarea>
        </div>
        <button type="submit" class="btn-primary" id="submit-comment">Post Comment</button>
        <p class="form-error hidden" id="comment-error"></p>
      </form>
    </div>
  `;

  container.querySelector('#comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username  = container.querySelector('#comment-username').value.trim();
    const text      = container.querySelector('#comment-text').value.trim();
    const errorEl   = container.querySelector('#comment-error');
    const btn       = container.querySelector('#submit-comment');

    // Validate
    if (!username || !text) {
      errorEl.textContent = 'Please fill in all fields.';
      errorEl.classList.remove('hidden');
      return;
    }
    errorEl.classList.add('hidden');

    btn.disabled = true;
    btn.textContent = 'Posting…';

    try {
      await postComment(show.id, username, text);

      // Optimistically add comment to UI
      const list = container.querySelector('#comments-list');
      list.querySelector('.no-data')?.remove();

      const div = document.createElement('div');
      div.className = 'comment-item animate-in';
      div.innerHTML = `
        <div class="comment-avatar">${username.charAt(0).toUpperCase()}</div>
        <div class="comment-body">
          <strong>${username}</strong>
          <span class="comment-date">just now</span>
          <p>${text}</p>
        </div>
      `;
      list.appendChild(div);

      // Update counter
      const countEl = container.querySelector('#comments-count');
      countEl.textContent = parseInt(countEl.textContent, 10) + 1;

      // Clear form
      container.querySelector('#comment-username').value = '';
      container.querySelector('#comment-text').value = '';

    } catch (err) {
      console.error('postComment failed:', err);
      errorEl.textContent = err.message || 'Failed to post. Please try again.';
      errorEl.classList.remove('hidden');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Post Comment';
    }
  });
};

export const closePopup = (id) => {
  const popup = document.getElementById(id);
  if (popup) {
    popup.classList.add('fade-out');
    setTimeout(() => {
      popup.remove();
      document.body.style.overflow = '';
    }, 300);
  }
};