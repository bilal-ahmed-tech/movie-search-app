import { useState, useEffect } from "react"
import { searchMovieById } from "../services/movieService"

export function useMovieDetail(id) {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    async function fetchMovie() {
      setLoading(true)
      setError(null)
      setMovie(null)

      try {
        const data = await searchMovieById(id)
        setMovie(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id])

  return { movie, loading, error }
}