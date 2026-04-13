import { useParams, useNavigate } from "react-router-dom"
import { FiArrowLeft, FiStar, FiClock, FiFilm } from "react-icons/fi"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { useMovieDetail } from "../hooks/useMovieDetail"
import { useFavourites } from "../hooks/useFavourites"
import { getPosterUrl, getYear } from "../utils/helpers"
import { MAX_CAST } from "../constants/index"
import noPoster from "../assets/no-poster.svg"
import { usePageTitle } from "../hooks/usePageTitle";

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { movie, loading, error } = useMovieDetail(id)
  const { addFavourite, removeFavourite, isFavourite } = useFavourites()
   usePageTitle(movie ? movie.title : null)
  function handleFavourite() {
    if (isFavourite(movie.id)) {
      removeFavourite(movie.id)
    } else {
      addFavourite(movie)
    }
  }

  if (loading) return (
    <div className="flex justify-center items-center min-h-96">
      <div className="w-12 h-12 border-4 border-gray-700 border-t-red-500 rounded-full animate-spin" />
    </div>
  )

  if (error) return (
    <div className="text-center py-20">
      <FiFilm className="text-6xl mx-auto mb-4 text-gray-600" />
      <p className="text-white text-xl">{error}</p>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-6 py-2 bg-red-500 text-white rounded-xl"
      >
        Go Back
      </button>
    </div>
  )

  if (!movie) return null

  const poster = movie.poster_path
    ? getPosterUrl(movie.poster_path, "w500")
    : noPoster

  const favourited = isFavourite(movie.id)
  const director = movie.credits?.crew?.find(c => c.job === "Director")
  const cast = movie.credits?.cast?.slice(0, MAX_CAST)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 
                   hover:text-white mb-6 transition-colors"
      >
        <FiArrowLeft /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Poster */}
        <div className="md:col-span-1">
          <img
            src={poster}
            alt={movie.title}
            onError={(e) => { e.target.src = noPoster }}
            className="w-full rounded-2xl shadow-2xl"
          />
          <button
            onClick={handleFavourite}
            className={`w-full mt-4 py-3 rounded-xl font-semibold
                       flex items-center justify-center gap-2
                       transition-all duration-200
                       ${favourited
                         ? "bg-red-500 text-white"
                         : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                       }`}
          >
            {favourited ? <BsHeartFill /> : <BsHeart />}
            {favourited ? "Remove from Favourites" : "Add to Favourites"}
          </button>
        </div>

        {/* Details */}
        <div className="md:col-span-2 text-white">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap gap-3 mb-4">
            {movie.vote_average > 0 && (
              <span className="flex items-center gap-1 text-yellow-400">
                <FiStar /> {movie.vote_average.toFixed(1)}
              </span>
            )}
            {movie.runtime > 0 && (
              <span className="flex items-center gap-1 text-gray-400">
                <FiClock /> {movie.runtime} min
              </span>
            )}
            {movie.release_date && (
              <span className="text-gray-400">
                {getYear(movie.release_date)}
              </span>
            )}
            {movie.status && (
              <span className="px-2 py-0.5 bg-gray-800 rounded 
                             text-gray-400 text-sm">
                {movie.status}
              </span>
            )}
          </div>

          {/* Genres */}
          {movie.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map(g => (
                <span key={g.id}
                  className="px-3 py-1 bg-gray-800 rounded-full 
                             text-sm text-gray-300">
                  {g.name}
                </span>
              ))}
            </div>
          )}

          {/* Plot */}
          {movie.overview && (
            <p className="text-gray-300 leading-relaxed mb-6">
              {movie.overview}
            </p>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {director && (
              <div>
                <p className="text-gray-500 text-sm">Director</p>
                <p className="text-white">{director.name}</p>
              </div>
            )}
            {movie.original_language && (
              <div>
                <p className="text-gray-500 text-sm">Language</p>
                <p className="text-white uppercase">
                  {movie.original_language}
                </p>
              </div>
            )}
            {movie.budget > 0 && (
              <div>
                <p className="text-gray-500 text-sm">Budget</p>
                <p className="text-white">
                  ${movie.budget.toLocaleString()}
                </p>
              </div>
            )}
            {movie.revenue > 0 && (
              <div>
                <p className="text-gray-500 text-sm">Revenue</p>
                <p className="text-white">
                  ${movie.revenue.toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {/* Cast */}
          {cast?.length > 0 && (
            <div>
              <p className="text-gray-500 text-sm mb-3">Top Cast</p>
              <div className="flex flex-wrap gap-2">
                {cast.map(actor => (
                  <span key={actor.id}
                    className="px-3 py-1 bg-gray-800 rounded-full 
                               text-sm text-gray-300">
                    {actor.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieDetail