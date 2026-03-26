const store = {
  get: (key) => JSON.parse(localStorage.getItem(key) || 'null'),
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
};

// ─── LIKES ────────────────────────────────────────────────────────────────────

export const fetchAllLikes = async () => {
  return store.get('likes') || {};
};

/**
 * Check if the current user has liked a specific item
 * @param {string|number} itemId
 * @returns {boolean}
 */
export const hasLiked = (itemId) => {
  const likedItems = store.get('likedItems') || [];
  return likedItems.includes(String(itemId));
};

/**
 * Toggle like/unlike for an item.
 * Returns true if liked, false if unliked.
 * @param {string|number} itemId
 * @returns {boolean}
 */
export const toggleLike = (itemId) => {
  const id = String(itemId);
  const likes = store.get('likes') || {};
  const likedItems = store.get('likedItems') || [];

  if (likedItems.includes(id)) {
    // Unlike — remove from liked list and decrement count
    const updated = likedItems.filter((i) => i !== id);
    store.set('likedItems', updated);
    likes[id] = Math.max((likes[id] || 1) - 1, 0);
    store.set('likes', likes);
    return false; // now unliked
  } else {
    // Like — add to liked list and increment count
    likedItems.push(id);
    store.set('likedItems', likedItems);
    likes[id] = (likes[id] || 0) + 1;
    store.set('likes', likes);
    return true; // now liked
  }
};

// ─── COMMENTS ─────────────────────────────────────────────────────────────────

export const fetchComments = async (itemId) => {
  const all = store.get('comments') || {};
  return all[String(itemId)] || [];
};

export const postComment = async (itemId, username, comment) => {
  if (!username || !comment) throw new Error('Username and comment are required.');
  const all = store.get('comments') || {};
  const key = String(itemId);
  if (!all[key]) all[key] = [];
  all[key].push({
    username,
    comment,
    creation_date: new Date().toISOString().split('T')[0],
  });
  store.set('comments', all);
};

// ─── RESERVATIONS ─────────────────────────────────────────────────────────────

export const fetchReservations = async (itemId) => {
  const all = store.get('reservations') || {};
  return all[String(itemId)] || [];
};

export const postReservation = async (itemId, username, date) => {
  if (!username || !date) throw new Error('Username and date are required.');
  const all = store.get('reservations') || {};
  const key = String(itemId);
  if (!all[key]) all[key] = [];
  all[key].push({ username, date });
  store.set('reservations', all);
};