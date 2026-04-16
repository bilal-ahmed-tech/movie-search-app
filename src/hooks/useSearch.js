import { useState, useEffect, useRef, useCallback } from "react";
import {
  searchMoviesByTitle,
  getPopularMovies,
  getGenres,
  getMoviesByGenre,
} from "../services/movieService";

const SESSION_KEY = "homeSearchState";

function saveState(state) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn("Failed to save search state:", err);
  }
}

function loadState() {
  try {
    const saved = sessionStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function useSearch() {
  const saved = loadState();

  const [movies, setMovies] = useState(saved?.movies ?? []);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(saved?.query ?? "");
  const [page, setPage] = useState(saved?.page ?? 1);
  const [hasMore, setHasMore] = useState(saved?.hasMore ?? false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(saved?.selectedGenre ?? null);

  const isRestored = useRef(!!saved?.movies?.length);

  // Load genres on mount
  useEffect(() => {
    async function fetchGenres() {
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    }
    fetchGenres();
  }, []);

  // Load popular movies only if nothing was restored
  useEffect(() => {
    if (!isRestored.current) {
      loadPopular();
    }
  }, []);

  // Persist state whenever key values change
  useEffect(() => {
    if (movies.length > 0) {
      saveState({ movies, query, page, hasMore, selectedGenre });
    }
  }, [movies, query, page, hasMore, selectedGenre]);

  const searchMovies = useCallback(async (title, pageNum = 1) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    if (pageNum === 1) {
      setLoading(true);
      setMovies([]);
      setSelectedGenre(null);
      setError(null);
    } else {
      setLoadingMore(true);
    }

    try {
      const { results, totalPages } = await searchMoviesByTitle(trimmed, pageNum);
      setMovies(prev => pageNum === 1 ? results : [...prev, ...results]);
      setQuery(trimmed);
      setPage(pageNum);
      setHasMore(pageNum < totalPages);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const searchByGenre = useCallback(async (genre, pageNum = 1) => {
    if (!genre?.id) return;

    if (pageNum === 1) {
      setLoading(true);
      setMovies([]);
      setQuery("");
      setSelectedGenre(genre);
      setError(null);
    } else {
      setLoadingMore(true);
    }

    try {
      const { results, totalPages } = await getMoviesByGenre(genre.id, pageNum);
      setMovies(prev => pageNum === 1 ? results : [...prev, ...results]);
      setPage(pageNum);
      setHasMore(pageNum < totalPages);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const loadPopular = useCallback(async (pageNum = 1) => {
    if (pageNum === 1) {
      setLoading(true);
      setSelectedGenre(null);
      setQuery("");
      setMovies([]);
      setError(null);
    } else {
      setLoadingMore(true);
    }

    try {
      const { results, totalPages } = await getPopularMovies(pageNum);
      setMovies(prev => pageNum === 1 ? results : [...prev, ...results]);
      setPage(pageNum);
      setHasMore(pageNum < totalPages);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (loading || loadingMore) return;
    if (query) {
      await searchMovies(query, page + 1);
    } else if (selectedGenre) {
      await searchByGenre(selectedGenre, page + 1);
    } else {
      await loadPopular(page + 1);
    }
  }, [query, selectedGenre, page, loading, loadingMore, searchMovies, searchByGenre, loadPopular]);

  const clearSearch = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    loadPopular();
  }, [loadPopular]);

  return {
    movies,
    loading,
    loadingMore,
    error,
    query,
    hasMore,
    genres,
    selectedGenre,
    searchMovies,
    searchByGenre,
    loadMore,
    loadPopular,
    clearSearch,
  };
}