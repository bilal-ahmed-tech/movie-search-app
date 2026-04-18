import { useEffect, useCallback, useRef } from "react";
import { FiX } from "react-icons/fi";

// Custom hook to manage body scroll with a counter
let scrollLockCount = 0;
function useLockBodyScroll(lock) {
  useEffect(() => {
    if (lock) {
      const originalOverflow = document.body.style.overflow;
      scrollLockCount++;
      document.body.style.overflow = "hidden";
      return () => {
        scrollLockCount--;
        if (scrollLockCount === 0) {
          document.body.style.overflow = originalOverflow;
        }
      };
    }
  }, [lock]);
}

function TrailerModal({ isOpen, trailerKey, onClose }) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  const onCloseRef = useRef(onClose);

  // Keep ref up to date
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Lock body scroll
  useLockBodyScroll(isOpen);

  // Handle Escape key – stable callback using ref
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      onCloseRef.current();
    }
  }, []);

  // Focus management
  useEffect(() => {
    if (!isOpen) {
      // Restore focus when modal closes
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
      return;
    }

    // Store currently focused element
    previousFocusRef.current = document.activeElement;

    // Trap focus inside modal
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements?.length) {
      focusableElements[0].focus();
    }

    // Add event listener
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !trailerKey) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
      role="presentation" // indicates this div is just a visual backdrop
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Movie trailer"
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-red-400
                     transition-colors flex items-center gap-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="Close trailer"
        >
          <FiX size={20} /> Close
        </button>

        <div className="relative w-full aspect-video">
          <iframe
            className="absolute inset-0 w-full h-full rounded-xl"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&rel=0`}
            title="Movie Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;