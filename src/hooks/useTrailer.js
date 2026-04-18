import { useState, useCallback, useEffect, useRef } from "react";
import { getMovieVideos } from "../services/movieService";

export function useTrailer(movieId) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ref to track the latest movieId for cancellation/ignoring stale responses
  const currentMovieIdRef = useRef(movieId);
  const abortControllerRef = useRef(null);

  // Reset when movie changes
  useEffect(() => {
    currentMovieIdRef.current = movieId;
    setTrailerKey(null);
    setError(null);
    setIsOpen(false);
    // Cancel any ongoing fetch for the previous movie
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, [movieId]);

  const openTrailer = useCallback(async () => {
    // Guard against duplicate requests while loading
    if (loading) return;

    // If we already have the key, just open the modal
    if (trailerKey) {
      setIsOpen(true);
      return;
    }

    setLoading(true);
    setError(null);

    // Create a new AbortController for this request
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;
    const requestMovieId = currentMovieIdRef.current;

    try {
      const videos = (await getMovieVideos(movieId, { signal })) || [];

      // If movieId changed during fetch, ignore result
      if (requestMovieId !== currentMovieIdRef.current) {
        return;
      }

      // Find best trailer – case‑insensitive site check
      const trailer =
        videos.find(v => v.type === "Trailer" && v.official && v.site?.toLowerCase() === "youtube") ||
        videos.find(v => v.type === "Trailer" && v.site?.toLowerCase() === "youtube") ||
        videos.find(v => v.type === "Teaser" && v.site?.toLowerCase() === "youtube");

      if (!trailer) {
        setError("No trailer available for this movie.");
        return;
      }

      setTrailerKey(trailer.key);
      setIsOpen(true);
    } catch (err) {
      // Ignore abort errors (they are expected when movieId changes)
      if (err.name === "AbortError") return;
      setError(err.message || "Failed to load trailer");
    } finally {
      if (requestMovieId === currentMovieIdRef.current) {
        setLoading(false);
      }
      abortControllerRef.current = null;
    }
  }, [movieId, trailerKey, loading]);

  const closeTrailer = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { trailerKey, isOpen, loading, error, openTrailer, closeTrailer };
}