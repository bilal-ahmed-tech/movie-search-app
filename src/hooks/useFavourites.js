import { useState, useCallback } from "react"

const STORAGE_KEY = "favourites"

function loadFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function persistFavourites(favourites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
  } catch (err) {
    console.warn("Failed to save favourites:", err)
  }
}

export function useFavourites() {
  const [favourites, setFavourites] = useState(loadFavourites)

  const addFavourite = useCallback((movie) => {
    if (!movie?.id) return

    setFavourites(prev => {
      if (prev.some(m => m.id === movie.id)) return prev
      const updated = [...prev, movie]
      persistFavourites(updated)
      return updated
    })
  }, [])

  const removeFavourite = useCallback((id) => {
    setFavourites(prev => {
      const updated = prev.filter(m => m.id !== id)
      persistFavourites(updated)
      return updated
    })
  }, [])

  const toggleFavourite = useCallback((movie) => {
    if (!movie?.id) return
    setFavourites(prev => {
      const exists = prev.some(m => m.id === movie.id)
      const updated = exists
        ? prev.filter(m => m.id !== movie.id)
        : [...prev, movie]
      persistFavourites(updated)
      return updated
    })
  }, [])

  const isFavourite = useCallback((id) => {
    return favourites.some(m => m.id === id)
  }, [favourites])

  const clearFavourites = useCallback(() => {
    setFavourites([])
    persistFavourites([])
  }, [])

  return {
    favourites,
    addFavourite,
    removeFavourite,
    toggleFavourite,
    isFavourite,
    clearFavourites,
    count: favourites.length,
  }
}