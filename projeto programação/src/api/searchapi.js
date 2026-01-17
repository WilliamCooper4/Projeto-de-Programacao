const BASE_URL = 'https://openlibrary.org/search.json';
const AUTHORS_URL = 'https://openlibrary.org/search/authors.json';
const COVERS_URL = 'https://covers.openlibrary.org';

/**
 * Search for books
 * @param {string} q - The search query
 * @param {Object} options - Additional search options
 * @param {string[]} options.fields - Fields to return (e.g., ['key', 'title', 'author_name'])
 * @param {string} options.sort - Sort by: new, old, random, key, or relevance (default)
 * @param {string} options.lang - Two-letter language code (ISO 639-1)
 * @param {number} options.limit - Number of results per page (default: 10)
 * @param {number} options.offset - Pagination offset
 * @param {number} options.page - Page number (starts at 1, used with limit)
 * @returns {Promise<Object>} Search results
 */
export async function searchBooks(q, options = {}) {
  try {
    const params = new URLSearchParams();
    params.append('q', q);

    if (options.fields && Array.isArray(options.fields)) {
      params.append('fields', options.fields.join(','));
    }
    if (options.sort) params.append('sort', options.sort);
    if (options.lang) params.append('lang', options.lang);
    if (options.limit) params.append('limit', options.limit);
    if (options.offset !== undefined) {
      params.append('offset', options.offset);
    }
    if (options.page) {
      params.append('page', options.page);
    }

    const response = await fetch(`${BASE_URL}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
}

/**
 * Search books by title
 * @param {string} title - Book title
 * @param {Object} options - Additional search options
 * @returns {Promise<Object>} Search results
 */
export async function searchByTitle(title, options = {}) {
  return searchBooks(`title=${title}`, options);
}

/**
 * Search books by author
 * @param {string} author - Author name
 * @param {Object} options - Additional search options
 * @returns {Promise<Object>} Search results
 */
export async function searchByAuthor(author, options = {}) {
  return searchBooks(`author=${author}`, options);
}

/**
 * Search authors by name
 * @param {string} q - Author search query
 * @param {Object} options - Additional search options
 * @param {number} options.limit - Number of results per page
 * @param {number} options.offset - Pagination offset
 * @returns {Promise<Object>} Author search results
 */
export async function searchAuthors(q, options = {}) {
  try {
    const params = new URLSearchParams();
    params.append('q', q);

    if (options.limit) params.append('limit', options.limit);
    if (options.offset !== undefined) {
      params.append('offset', options.offset);
    }

    const response = await fetch(`${AUTHORS_URL}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching authors:', error);
    throw error;
  }
}

/**
 * Get book cover by Open Library ID (olid)
 * @param {string} olid - Open Library ID (e.g., 'OL23919A')
 * @param {string} size - Cover size: 'S' (small), 'M' (medium), or 'L' (large)
 * @returns {string} Cover image URL
 */
export function getBookCoverUrl(olid, size = 'M') {
  return `${COVERS_URL}/b/olid/${olid}-${size}.jpg`;
}

/**
 * Get author image by Open Library ID (olid)
 * @param {string} olid - Open Library Author ID (e.g., 'OL23919A')
 * @param {string} size - Image size: 'S' (small), 'M' (medium), or 'L' (large)
 * @returns {string} Author image URL
 */
export function getAuthorImageUrl(olid, size = 'M') {
  return `${COVERS_URL}/a/olid/${olid}-${size}.jpg`;
}

/**
 * Advanced search with multiple filters
 * @param {Object} filters - Search filters
 * @param {string} filters.query - Main search query
 * @param {string} filters.title - Book title
 * @param {string} filters.author - Author name
 * @param {string} filters.publisher - Publisher name
 * @param {string} filters.isbn - ISBN
 * @param {number} filters.year - Publication year
 * @param {string} filters.language - Language code
 * @param {Object} options - Additional options (sort, limit, offset, etc.)
 * @returns {Promise<Object>} Search results
 */
export async function advancedSearch(filters = {}, options = {}) {
  try {
    const queryParts = [];

    if (filters.query) queryParts.push(filters.query);
    if (filters.title) queryParts.push(`title:${filters.title}`);
    if (filters.author) queryParts.push(`author:${filters.author}`);
    if (filters.publisher) queryParts.push(`publisher:${filters.publisher}`);
    if (filters.isbn) queryParts.push(`isbn:${filters.isbn}`);
    if (filters.year) queryParts.push(`first_publish_year:${filters.year}`);
    if (filters.language) queryParts.push(`language:${filters.language}`);

    const q = queryParts.join(' AND ');
    return searchBooks(q, options);
  } catch (error) {
    console.error('Error in advanced search:', error);
    throw error;
  }
}

/**
 * Get book editions by work key
 * @param {string} q - Search query
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} Search results including edition information
 */
export async function searchWithEditions(q, options = {}) {
  const defaultFields = [
    'key',
    'title',
    'author_name',
    'editions',
    'editions.key',
    'editions.title',
    'editions.ebook_access',
    'editions.language'
  ];

  return searchBooks(q, {
    ...options,
    fields: options.fields || defaultFields
  });
}

export default {
  searchBooks,
  searchByTitle,
  searchByAuthor,
  searchAuthors,
  getBookCoverUrl,
  getAuthorImageUrl,
  advancedSearch,
  searchWithEditions
};
