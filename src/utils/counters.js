/**
 * Counter utility functions - all are covered by Jest unit tests.
 */

/**
 * Count total number of items (movies) displayed
 * @param {Array} items
 * @returns {number}
 */
export const countItems = (items) => {
  if (!Array.isArray(items)) return 0;
  return items.length;
};

/**
 * Count total comments for a movie
 * @param {Array} comments
 * @returns {number}
 */
export const countComments = (comments) => {
  if (!Array.isArray(comments)) return 0;
  return comments.length;
};

/**
 * Count total reservations for a movie
 * @param {Array} reservations
 * @returns {number}
 */
export const countReservations = (reservations) => {
  if (!Array.isArray(reservations)) return 0;
  return reservations.length;
};

/**
 * Count total likes across all items
 * @param {Object} likesMap - { itemId: likeCount }
 * @returns {number}
 */
export const countTotalLikes = (likesMap) => {
  if (!likesMap || typeof likesMap !== 'object') return 0;
  return Object.values(likesMap).reduce((sum, val) => sum + (Number(val) || 0), 0);
};
