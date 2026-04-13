import { useState } from "react"

export function useFavourites() {
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites")
    return saved ? JSON.parse(saved) : []
  })

  function addFavourite(movie) {
    setFavourites(prev => {
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