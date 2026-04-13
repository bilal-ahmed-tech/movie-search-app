import { getCached, setCached, buildCacheKey } from "../utils/cache"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

export async function searchMoviesByTitle(title, page = 1) {
  const cacheKey = buildCacheKey("search", title, page)
  const cached = getCached(cacheKey)
  if (cached) return cached

  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(title)}&page=${page}&api_key=${API_KEY}`
  )
  if (!response.ok) throw new Error("Failed to fetch movies")

  const data = await response.json()
  if (data.results.length === 0) {
    throw new Error("No movies found. Try a different search.")
  }

  const result = { results: data.results, totalPages: data.total_pages }
  setCached(cacheKey, result)
  return result
}

export async function searchMovieById(id) {
  const cacheKey = buildCacheKey("movie", id)
  const cached = getCached(cacheKey)
  if (cached) return cached

  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
  )
  if (!response.ok) throw new Error("Failed to fetch movie details")

  const data = await response.json()
  setCached(cacheKey, data)
  return data
}

export async function getPopularMovies(page = 1) {
  const cacheKey = buildCacheKey("popular", page)
  const cached = getCached(cacheKey)
  if (cached) return cached

  const response = await fetch(
    `${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`
  )
  if (!response.ok) throw new Error("Failed to fetch popular movies")

  const data = await response.json()
  const result = { results: data.results, totalPages: data.total_pages }
  setCached(cacheKey, result)
  return result
}

export async function getGenres() {
  const cacheKey = "genres"
  const cached = getCached(cacheKey)
  if (cached) return cached

  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  )
  if (!response.ok) throw new Error("Failed to fetch genres")

  const data = await response.json()
  setCached(cacheKey, data.genres)
  return data.genres
}

export async function getMoviesByGenre(genreId, page = 1) {
  const cacheKey = buildCacheKey("genre", genreId, page)
  const cached = getCached(cacheKey)
  if (cached) return cached

  const response = await fetch(
    `${BASE_URL}/discover/movie?with_genres=${genreId}&page=${page}&api_key=${API_KEY}`
  )
  if (!response.ok) throw new Error("Failed to fetch movies")

  const data = await response.json()
  const result = { results: data.results, totalPages: data.total_pages }
  setCached(cacheKey, result)
  return result
}