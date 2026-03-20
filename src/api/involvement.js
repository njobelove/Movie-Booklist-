// Involvement API base URL
const INVOLVEMENT_API = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';
const APP_ID = 'movie-booking-app-2024'; // Unique app ID for this project

// ─── LIKES ────────────────────────────────────────────────────────────────────

/**
 * Fetch all likes for the app
 * @returns {Promise<Object>} map of itemId -> likeCount
 */
export const fetchAllLikes = async () => {
  try {
    const response = await fetch(`${INVOLVEMENT_API}/apps/${APP_ID}/likes`);
    if (!response.ok) return {};
    const data = await response.json();
    const likesMap = {};
    data.forEach(({ item_id, likes }) => {
      likesMap[item_id] = likes;
    });
    return likesMap;
  } catch {
    return {};
  }
};

/**
 * Like an item
 * @param {string|number} itemId
 * @returns {Promise<void>}
 */
export const likeItem = async (itemId) => {
  await fetch(`${INVOLVEMENT_API}/apps/${APP_ID}/likes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item_id: String(itemId) }),
  });
};

// ─── COMMENTS ─────────────────────────────────────────────────────────────────

/**
 * Fetch comments for an item
 * @param {string|number} itemId
 * @returns {Promise<Array>}
 */
export const fetchComments = async (itemId) => {
  try {
    const response = await fetch(`${INVOLVEMENT_API}/apps/${APP_ID}/comments?item_id=${itemId}`);
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
};

/**
 * Post a comment on an item
 * @param {string|number} itemId
 * @param {string} username
 * @param {string} comment
 * @returns {Promise<void>}
 */
export const postComment = async (itemId, username, comment) => {
  await fetch(`${INVOLVEMENT_API}/apps/${APP_ID}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      item_id: String(itemId),
      username,
      comment,
    }),
  });
};

// ─── RESERVATIONS ─────────────────────────────────────────────────────────────

/**
 * Fetch reservations for an item
 * @param {string|number} itemId
 * @returns {Promise<Array>}
 */
export const fetchReservations = async (itemId) => {
  try {
    const response = await fetch(`${INVOLVEMENT_API}/apps/${APP_ID}/reservations?item_id=${itemId}`);
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
};

/**
 * Post a reservation for an item
 * @param {string|number} itemId
 * @param {string} username
 * @param {string} date
 * @returns {Promise<void>}
 */
export const postReservation = async (itemId, username, date) => {
  await fetch(`${INVOLVEMENT_API}/apps/${APP_ID}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      item_id: String(itemId),
      username,
      date,
    }),
  });
};
