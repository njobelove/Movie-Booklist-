// TVmaze API - no auth required
const BASE_URL = 'https://api.tvmaze.com';

/**
 * Fetch a list of shows (movies/series) by search query or popular
 * @returns {Promise<Array>} list of show objects
 */
export const fetchShows = async (query = 'movie') => {
  const response = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to fetch shows');
  const data = await response.json();
  return data.map((entry) => ({
    id: entry.show.id,
    name: entry.show.name,
    image: entry.show.image ? entry.show.image.medium : 'https://via.placeholder.com/210x295?text=No+Image',
    summary: entry.show.summary ? entry.show.summary.replace(/<[^>]+>/g, '') : 'No description available.',
    rating: entry.show.rating?.average || 'N/A',
    genres: entry.show.genres || [],
    premiered: entry.show.premiered || 'Unknown',
    status: entry.show.status || 'Unknown',
    network: entry.show.network?.name || entry.show.webChannel?.name || 'Unknown',
    language: entry.show.language || 'Unknown',
    officialSite: entry.show.officialSite || null,
  }));
};

/**
 * Fetch detailed info about a specific show
 * @param {number} showId
 * @returns {Promise<Object>}
 */
export const fetchShowDetails = async (showId) => {
  const response = await fetch(`${BASE_URL}/shows/${showId}?embed=cast`);
  if (!response.ok) throw new Error(`Failed to fetch show ${showId}`);
  const show = await response.json();
  return {
    id: show.id,
    name: show.name,
    image: show.image ? show.image.original : 'https://via.placeholder.com/400x500?text=No+Image',
    summary: show.summary ? show.summary.replace(/<[^>]+>/g, '') : 'No description available.',
    rating: show.rating?.average || 'N/A',
    genres: show.genres || [],
    premiered: show.premiered || 'Unknown',
    ended: show.ended || null,
    status: show.status || 'Unknown',
    network: show.network?.name || show.webChannel?.name || 'Unknown',
    language: show.language || 'Unknown',
    schedule: show.schedule || {},
    cast: show._embedded?.cast?.slice(0, 6).map((c) => ({
      name: c.person.name,
      character: c.character.name,
      image: c.person.image?.medium || null,
    })) || [],
  };
};
