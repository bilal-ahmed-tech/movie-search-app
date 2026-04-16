import { NavLink , Link } from "react-router-dom"
import { FiFilm, FiHeart } from "react-icons/fi"

function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-2 sm:px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <Link to="/"><FiFilm className="text-xl sm:text-2xl text-red-500" /></Link>
          <Link to="/" className="text-base sm:text-xl font-bold">
            MovieSearch
          </Link>
        </div>
        <nav className="flex items-center gap-3 sm:gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 font-semibold"
                : "text-gray-400 hover:text-white font-semibold transition-colors"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 font-semibold"
                : "text-gray-400 hover:text-white font-semibold transition-colors"
            }
          >
            <FiHeart className="inline mr-1" />
            Favourites
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header