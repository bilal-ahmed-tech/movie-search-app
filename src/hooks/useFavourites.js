import { useState } from "react"

export function useFavourites() {
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem("favourites")
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      return []
    }
  })

  function addFavourite(movie) {
    if (!movie || !movie.id) return
    
    setFavourites(prev => {
      // Check if movie already exists
      if (prev.some(m => m.id === movie.id)) {
        return prev
      }
      const updated = [...prev, movie]
      localStorage.setItem("favourites", JSON.stringify(updated))
      return updated
    })
  }

  function removeFavourite(id) {
    setFavourites(prev => {
      const updated = prev.filter(m => m.id !== id)
      localStorage.setItem("favourites", JSON.stringify(updated))
      return updated
    })
  }

  function isFavourite(id) {
    return favourites.some(m => m.id === id)
  }

  return { favourites, addFavourite, removeFavourite, isFavourite }
}