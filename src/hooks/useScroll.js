import { useState, useEffect } from "react"

export function useScroll(threshold = 300) {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setShowButton(window.scrollY > threshold)
    }

    window.addEventListener("scroll", handleScroll)
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  return showButton
}