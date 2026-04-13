import { useState, useEffect } from "react";
import {
  searchMoviesByTitle,
  getPopularMovies,
  getGenres,
  getMoviesByGenre,
} from "../services/movieService";

export function useSearch() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

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

  // Load popular movies on mount
  useEffect(() => {
    loadPopular();
  }, []);

  async function searchMovies(title, pageNum = 1) {
    if (!title.trim()) return;

    if (pageNum === 1) {
      setLoading(true);
      setMovies([]);
      setSelectedGenre(null);
    } else {
      setLoadingMore(true);
    }

    setError(null);

    try {
      const { results, totalPages } = await searchMoviesByTitle(title, pageNum);
      setMovies((prev) => (pageNum === 1 ? results : [...prev, ...results]));
      setQuery(title);
      setPage(pageNum);
      setHasMore(pageNum < totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  async function searchByGenre(genre, pageNum = 1) {
    if (pageNum === 1) {
      setLoading(true);
      setMovies([]);
      setQuery("");
      setSelectedGenre(genre);
    } else {
      setLoadingMore(true);
    }

    setError(null);

    try {
      const { results, totalPages } = await getMoviesByGenre(genre.id, pageNum);
      setMovies((prev) => (pageNum === 1 ? results : [...prev, ...results]));
      setPage(pageNum);
      setHasMore(pageNum < totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  async function loadPopular(pageNum = 1) {
    if (pageNum === 1) {
      setLoading(true);
      setSelectedGenre(null); 
      setQuery(""); 
      setMovies([]);
    } else {
      setLoadingMore(true);
    }

    setError(null);

    try {
      const { results, totalPages } = await getPopularMovies(pageNum);
      setMovies((prev) => (pageNum === 1 ? results : [...prev, ...results]));
      setPage(pageNum);
      setHasMore(pageNum < totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  async function loadMore() {
    if (query) {
      await searchMovies(query, page + 1);
    } else if (selectedGenre) {
      await searchByGenre(selectedGenre, page + 1);
    } else {
      await loadPopular(page + 1);
    }
  }

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
  };
}
