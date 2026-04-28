import { NavLink, Link, useLocation } from "react-router-dom"
import { FiFilm, FiHeart } from "react-icons/fi"

function Header({ onLogoClick }) {
  const location = useLocation();

  const handleLogoClick = () => {
    // Only clear if already on home page
    if (location.pathname === '/' && onLogoClick) {
      onLogoClick();
    }
  }

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-2 sm:px-4 py-4">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <Link to="/" onClick={handleLogoClick}>
            <FiFilm className="text-xl sm:text-2xl text-red-500" />
          </Link>
          <Link to="/" onClick={handleLogoClick} className="text-base sm:text-xl font-bold">
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
      </nav>
    </header>
  )
}

export default Header