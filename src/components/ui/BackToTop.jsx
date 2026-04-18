import { FiArrowUp } from "react-icons/fi";
import { useScroll } from "../../hooks/useScroll";

function BackToTop({ threshold = 300, scrollBehavior = "smooth" }) {
  const showButton = useScroll(threshold);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: scrollBehavior });
    // Move focus to a landmark element after scroll completes
    setTimeout(() => {
      const mainContent = document.querySelector("main") || document.body;
      mainContent.setAttribute("tabindex", "-1");
      mainContent.focus();
      mainContent.removeAttribute("tabindex");
    }, 100); // Delay matches typical smooth scroll duration
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 transition-opacity duration-200"
      style={{ opacity: showButton ? 1 : 0, visibility: showButton ? "visible" : "hidden" }}
    >
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
        className="p-3 bg-red-500 hover:bg-red-600 text-white 
                   rounded-full shadow-lg hover:shadow-xl
                   transition-all duration-200 active:scale-95
                   focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
      >
        <FiArrowUp className="text-xl" aria-hidden="true" />
      </button>
    </div>
  );
}

export default BackToTop;