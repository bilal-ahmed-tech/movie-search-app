import { Link } from "react-router-dom"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { FiEye } from "react-icons/fi"
import { getPosterUrl, getYear } from "../../utils/helpers"
import noPoster from "../../assets/no-poster.svg"

function MovieCard({ movie, onFavourite, isFavourited }) {
  const poster = movie.poster_path
    ? getPosterUrl(movie.poster_path)
    : noPoster

  return (
    <div className="relative group rounded-xl overflow-hidden bg-gray-800 
                    shadow-lg hover:shadow-2xl hover:scale-105 
                    transition-all duration-300">
      
      {/* Poster */}
      <img
        src={poster}
        alt={movie.title}
        onError={(e) => { e.target.src = noPoster }}
        className="w-full h-72 object-cover"
      />

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 flex flex-col 
                      justify-end p-4">
        
        {/* Movie Info */}
        <h3 className="text-white font-bold text-lg leading-tight">
          {movie.title}
        </h3>
        <p className="text-gray-300 text-sm mb-3">
          {getYear(movie.release_date)}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/movie/${movie.id}`}
            className="flex-1 flex items-center justify-center gap-1
                       bg-red-500 hover:bg-red-600 text-white 
                       rounded-lg py-2 text-sm font-semibold
                       transition-colors duration-200"
          >
            <FiEye /> View
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onFavourite(movie)
            }}
            className={`p-2 rounded-lg transition-colors duration-200
                       ${isFavourited
                         ? "bg-red-500 text-white"
                         : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                       }`}
          >
            {isFavourited ? <BsHeartFill /> : <BsHeart />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieCard