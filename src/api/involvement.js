const store = {
  get: (key) => JSON.parse(localStorage.getItem(key) || 'null'),
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
};

export const fetchAllLikes = async () => {
  return store.get('likes') || {};
};

export const hasLiked = (itemId) => {
  const likedItems = store.get('likedItems') || [];
  return likedItems.includes(String(itemId));
};

export const likeItem = async (itemId) => {
  if (hasLiked(itemId)) {
    throw new Error('You have already liked this item.');
  }
  const likes = store.get('likes') || {};
  likes[String(itemId)] = (likes[String(itemId)] || 0) + 1;
  store.set('likes', likes);

  // Record that this user has liked this item
  const likedItems = store.get('likedItems') || [];
  likedItems.push(String(itemId));
  store.set('likedItems', likedItems);
};

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