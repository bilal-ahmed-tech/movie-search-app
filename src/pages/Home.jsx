import { useSearch } from "../hooks/useSearch";
import { useFavourites } from "../hooks/useFavourites";
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
    loadPopular,
  } = useSearch();
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();

  function handleFavourite(movie) {
    if (isFavourite(movie.id)) {
      removeFavourite(movie.id);
    } else {
      addFavourite(movie);
    }
  }

  function handleGenreSelect(genre) {
    if (genre === null) {
      loadPopular(); 
    } else {
      searchByGenre(genre);
    }
  }

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
        <SearchBar onSearch={searchMovies} loading={loading} />
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
      {selectedGenre && (
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
      {!loading && !error && movies.length === 0 && query && (
        <EmptyState
          icon={FiFilm}
          title="No movies found"
          message={`We couldn't find any movies for "${query}"`}
        />
      )}
      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Movies Grid */}
      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavourite={handleFavourite}
              isFavourited={isFavourite(movie.id)}
            />
          ))}
        </div>
      )}

      {/* Load More */}
      {hasMore && !loading && !error && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="flex items-center gap-2 px-8 py-3
                       bg-red-500 hover:bg-red-600 text-white
                       rounded-xl font-semibold transition-all
                       duration-200 active:scale-95
                       disabled:opacity-50">
            {loadingMore ? (
              <>
                <FiLoader className="animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}

      {/* Load More Skeleton */}
      {loadingMore && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
