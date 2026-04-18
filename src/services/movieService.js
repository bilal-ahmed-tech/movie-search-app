// movieService.js – your original, with signal support only
import { getCached, setCached, buildCacheKey } from "../utils/cache";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Helper to add signal to fetch (minimal change)
async function fetchWithSignal(url, options = {}) {
  const { signal, ...rest } = options;
  const response = await fetch(url, { ...rest, signal });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response;
}

export async function searchMoviesByTitle(title, page = 1, { signal } = {}) {
  const cacheKey = buildCacheKey("search", title, page);
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const response = await fetchWithSignal(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(title)}&page=${page}&include_adult=false&api_key=${API_KEY}`,
    { signal }
  );
  const data = await response.json();
  
  if (data.results.length === 0) {
    throw new Error("No movies found. Try a different search.");
  }

  const result = { results: data.results, totalPages: data.total_pages };
  setCached(cacheKey, result);
  return result;
}

export async function searchMovieById(id, { signal } = {}) {
  const cacheKey = buildCacheKey("movie", id);
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const response = await fetchWithSignal(
    `${BASE_URL}/movie/${id}?include_adult=false&api_key=${API_KEY}&append_to_response=credits`,
    { signal }
  );
  const data = await response.json();
  setCached(cacheKey, data, 30 * 60 * 1000);
  return data;
}

export async function getPopularMovies(page = 1, { signal } = {}) {
  const cacheKey = buildCacheKey("popular", page);
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const response = await fetchWithSignal(
    `${BASE_URL}/movie/popular?page=${page}&include_adult=false&api_key=${API_KEY}`,
    { signal }
  );
  const data = await response.json();
  const result = { results: data.results, totalPages: data.total_pages };
  setCached(cacheKey, result, 10 * 60 * 1000);
  return result;
}

export async function getGenres({ signal } = {}) {
  const cacheKey = buildCacheKey("genres");
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const response = await fetchWithSignal(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
    { signal }
  );
  const data = await response.json();
  setCached(cacheKey, data.genres, 60 * 60 * 1000);
  return data.genres; // Direct array – your original format
}

export async function getMoviesByGenre(genreId, page = 1, { signal } = {}) {
  const cacheKey = buildCacheKey("genre", genreId, page);
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const response = await fetchWithSignal(
    `${BASE_URL}/discover/movie?with_genres=${genreId}&page=${page}&include_adult=false&api_key=${API_KEY}`,
    { signal }
  );
  const data = await response.json();
  const result = { results: data.results, totalPages: data.total_pages };
  setCached(cacheKey, result);
  return result;
}

export async function getMovieVideos(id, { signal } = {}) {
  const cacheKey = buildCacheKey("videos", id);
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const response = await fetchWithSignal(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`,
    { signal }
  );
  const data = await response.json();
  setCached(cacheKey, data.results, 30 * 60 * 1000);
  return data.results;
}

export async function getPersonDetails(id, { signal } = {}) {
  const cacheKey = buildCacheKey("person", id);
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const response = await fetchWithSignal(
    `${BASE_URL}/person/${id}?api_key=${API_KEY}&append_to_response=movie_credits`,
    { signal }
  );
  const data = await response.json();
  setCached(cacheKey, data, 60 * 60 * 1000);
  return data;
}