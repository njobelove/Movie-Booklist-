import { countItems, countComments, countReservations, countTotalLikes } from '../utils/counters.js';

// ─── countItems ────────────────────────────────────────────────────────────────
describe('countItems', () => {
  test('returns the correct count for a non-empty array', () => {
    // Arrange
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    // Act
    const result = countItems(items);
    // Assert
    expect(result).toBe(3);
  });

  test('returns 0 for an empty array', () => {
    // Arrange
    const items = [];
    // Act
    const result = countItems(items);
    // Assert
    expect(result).toBe(0);
  });

  test('returns 0 for a non-array input', () => {
    // Arrange
    const items = null;
    // Act
    const result = countItems(items);
    // Assert
    expect(result).toBe(0);
  });

  test('returns correct count for a single item', () => {
    // Arrange
    const items = [{ id: 42, name: 'Inception' }];
    // Act
    const result = countItems(items);
    // Assert
    expect(result).toBe(1);
  });
});

// ─── countComments ─────────────────────────────────────────────────────────────
describe('countComments', () => {
  test('returns the correct number of comments', () => {
    // Arrange
    const comments = [
      { username: 'alice', comment: 'Great movie!' },
      { username: 'bob', comment: 'Loved it!' },
    ];
    // Act
    const result = countComments(comments);
    // Assert
    expect(result).toBe(2);
  });

  test('returns 0 when there are no comments', () => {
    // Arrange
    const comments = [];
    // Act
    const result = countComments(comments);
    // Assert
    expect(result).toBe(0);
  });

  test('returns 0 for undefined input', () => {
    // Arrange
    const comments = undefined;
    // Act
    const result = countComments(comments);
    // Assert
    expect(result).toBe(0);
  });

  test('counts every comment including duplicates', () => {
    // Arrange
    const comments = [
      { username: 'alice', comment: 'Wow' },
      { username: 'alice', comment: 'Wow' },
      { username: 'charlie', comment: 'Amazing' },
    ];
    // Act
    const result = countComments(comments);
    // Assert
    expect(result).toBe(3);
  });
});

// ─── countReservations ─────────────────────────────────────────────────────────
describe('countReservations', () => {
  test('returns the correct number of reservations', () => {
    // Arrange
    const reservations = [
      { username: 'alice', date: '2024-12-01' },
      { username: 'bob', date: '2024-12-02' },
      { username: 'charlie', date: '2024-12-03' },
    ];
    // Act
    const result = countReservations(reservations);
    // Assert
    expect(result).toBe(3);
  });

  test('returns 0 for empty reservations array', () => {
    // Arrange
    const reservations = [];
    // Act
    const result = countReservations(reservations);
    // Assert
    expect(result).toBe(0);
  });

  test('returns 0 for null input', () => {
    // Arrange
    const reservations = null;
    // Act
    const result = countReservations(reservations);
    // Assert
    expect(result).toBe(0);
  });

  test('returns 1 for a single reservation', () => {
    // Arrange
    const reservations = [{ username: 'alice', date: '2024-11-25' }];
    // Act
    const result = countReservations(reservations);
    // Assert
    expect(result).toBe(1);
  });
});

// ─── countTotalLikes ───────────────────────────────────────────────────────────
describe('countTotalLikes', () => {
  test('sums all likes across multiple items', () => {
    // Arrange
    const likesMap = { '1': 5, '2': 10, '3': 3 };
    // Act
    const result = countTotalLikes(likesMap);
    // Assert
    expect(result).toBe(18);
  });

  test('returns 0 for an empty likes map', () => {
    // Arrange
    const likesMap = {};
    // Act
    const result = countTotalLikes(likesMap);
    // Assert
    expect(result).toBe(0);
  });

  test('returns 0 for null input', () => {
    // Arrange
    const likesMap = null;
    // Act
    const result = countTotalLikes(likesMap);
    // Assert
    expect(result).toBe(0);
  });

  test('handles items with zero likes', () => {
    // Arrange
    const likesMap = { '1': 0, '2': 7, '3': 0 };
    // Act
    const result = countTotalLikes(likesMap);
    // Assert
    expect(result).toBe(7);
  });
});
