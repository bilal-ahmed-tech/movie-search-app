import { useEffect } from "react"

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title 
      ? `${title} | MovieSearch`
      : "MovieSearch | Discover Movies"
    
    return () => {
      document.title = "MovieSearch | Discover Movies"
    }
  }, [title])
}