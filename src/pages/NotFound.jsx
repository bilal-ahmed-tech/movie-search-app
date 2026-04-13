import { useNavigate } from "react-router-dom"
import { FiArrowLeft, FiFilm } from "react-icons/fi"
import { usePageTitle } from "../hooks/usePageTitle";
function NotFound() {
  const navigate = useNavigate()
  usePageTitle("404 Not Found")

  return (
    <div className="min-h-96 flex flex-col items-center justify-center text-center">
      <FiFilm className="text-8xl text-gray-700 mx-auto mb-6" />
      <h1 className="text-8xl font-bold text-gray-700 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-white mb-2">
        This Scene Was Cut
      </h2>
      <p className="text-gray-400 mb-8">
        Looks like this page ended up on the cutting room floor.
      </p>
      <button
        onClick={() => navigate("/", { replace: true })}
        className="flex items-center gap-2 px-6 py-3 
                   bg-red-500 hover:bg-red-600 text-white 
                   rounded-xl font-semibold transition-all duration-200
                   active:scale-95"
      >
        <FiArrowLeft /> Back to Home
      </button>
    </div>
  )
}

export default NotFound