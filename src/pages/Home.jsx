import { useCallback, useMemo } from "react";
import { useSearch } from "../hooks/useSearch";
import { useFavourites } from "../hooks/useFavourites";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import SearchBar from "../components/ui/SearchBar";
import MovieCard from "../components/ui/MovieCard";
import SkeletonCard from "../components/ui/SkeletonCard";
import EmptyState from "../components/ui/EmptyState";
import GenreFilter from "../components/ui/GenreFilter";
import { FiFilm, FiLoader } from "react-icons/fi";
import { usePageTitle } from "../hooks/usePageTitle";

function Home() {
  usePageTitle(null);

  const {
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
    clearSearch,
    loadPopular,
  } = useSearch();

  const { addFavourite, removeFavourite, isFavourite } = useFavourites();
  // Memoized favourite handler
  const handleFavourite = useCallback(
    (movie) => {
      if (isFavourite(movie.id)) {
        removeFavourite(movie.id);
      } else {
        addFavourite(movie);
      }
    },
    [isFavourite, addFavourite, removeFavourite],
  );

  // Memoized genre selection handler
  const handleGenreSelect = useCallback(
    (genre) => {
      if (genre === null) {
        loadPopular();
      } else {
        searchByGenre(genre);
      }
    },
    [loadPopular, searchByGenre],
  );

  // Deduplicate movies by ID to prevent duplicate keys warning
  const uniqueMovies = useMemo(() => {
    const seen = new Set();
    return movies.filter((movie) => {
      if (seen.has(movie.id)) return false;
      seen.add(movie.id);
      return true;
    });
  }, [movies]);

  // Attach sentinel for infinite scroll
  const { sentinelRef } = useInfiniteScroll({
    hasMore,
    loading,
    loadingMore,
    onLoadMore: loadMore,
  });

  // Determine if we should show empty state
  const showEmptyState =
    !loading && !error && uniqueMovies.length === 0 && (query || selectedGenre);

  return (
    <div>
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Find Your Movie
        </h1>
        <p className="text-gray-400 text-center mb-6">
          Search from millions of movies and TV shows
        </p>
        <SearchBar
          onSearch={searchMovies}
          onClear={clearSearch}
          loading={loading}
        />
      </div>

      {/* Genre Filter */}
      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onSelect={handleGenreSelect}
      />

      {/* Results Title */}
      {query && (
        <p className="text-gray-400 mb-4">
          Results for{" "}
          <span className="text-white font-semibold">"{query}"</span>
        </p>
      )}
      {selectedGenre && !query && (
        <p className="text-gray-400 mb-4">
          Browsing{" "}
          <span className="text-white font-semibold">{selectedGenre.name}</span>
        </p>
      )}

      {/* Error State */}
      {error && (
        <EmptyState
          icon={FiFilm}
          title="Something went wrong"
          message={error}
        />
      )}

      {/* Empty Results */}
      {showEmptyState && (
        <EmptyState
          icon={FiFilm}
          title="No movies found"
          message={
            query
              ? `We couldn't find any movies for "${query}"`
              : `No movies available in "${selectedGenre?.name}"`
          }
        />
      )}

      {/* Initial Loading State */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Movies Grid with live region for screen readers */}
      {!loading && !error && uniqueMovies.length > 0 && (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          aria-live="polite"
          aria-busy={loadingMore}>
          {uniqueMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavourite={handleFavourite}
              isFavourited={isFavourite(movie.id)}
            />
          ))}
        </div>
      )}

      {/* Load More Spinner (no extra skeletons) */}
      {loadingMore && (
        <div className="flex justify-center mt-4">
          <FiLoader className="animate-spin text-red-500 text-2xl" />
        </div>
      )}

      {/* Sentinel — invisible div that triggers infinite scroll */}
      {hasMore && !error && (
        <div ref={sentinelRef} className="h-10 mt-4" aria-hidden="true" />
      )}
    </div>
  );
}

export default Home;
