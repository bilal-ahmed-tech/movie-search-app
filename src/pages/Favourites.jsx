import { useFavourites } from "../hooks/useFavourites";
import MovieCard from "../components/ui/MovieCard";
import EmptyState from "../components/ui/EmptyState";
import { FiHeart } from "react-icons/fi";
import { usePageTitle } from "../hooks/usePageTitle";
function Favourites() {
  const { favourites, addFavourite, removeFavourite, isFavourite } =
    useFavourites();

  function handleFavourite(movie) {
    if (isFavourite(movie.id)) {
      removeFavourite(movie.id);
    } else {
      addFavourite(movie);
    }
  }

  usePageTitle("My Favourites")
  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-2">My Favourites</h1>
      <p className="text-gray-400 mb-8">
        {favourites.length} movie{favourites.length !== 1 ? "s" : ""} saved
      </p>

      {favourites.length === 0 ? (
        <EmptyState
          icon={FiHeart}
          title="No favourites yet"
          message="Start adding movies you love!"
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favourites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavourite={handleFavourite}
              isFavourited={isFavourite(movie.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favourites;
