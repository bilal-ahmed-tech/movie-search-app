import { FiArrowUp } from "react-icons/fi"
import { useScroll } from "../../hooks/useScroll"

function BackToTop() {
  const showButton = useScroll(300)

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!showButton) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 p-3 
                 bg-red-500 hover:bg-red-600 text-white 
                 rounded-full shadow-lg hover:shadow-xl
                 transition-all duration-200 active:scale-95
                 z-50"
    >
      <FiArrowUp className="text-xl" />
    </button>
  )
}

export default BackToTop