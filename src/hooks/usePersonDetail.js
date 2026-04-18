import { useState, useEffect, useRef } from "react";
import { getPersonDetails } from "../services/movieService";

export function usePersonDetail(id) {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ref to track latest id for ignoring stale responses
  const currentIdRef = useRef(id);

  useEffect(() => {
    // Update ref immediately when id changes
    currentIdRef.current = id;

    // If no id, clear state and return
    if (!id) {
      setPerson(null);
      setError(null);
      setLoading(false);
      return;
    }

    const abortController = new AbortController();

    async function fetchPerson() {
      setLoading(true);
      setError(null);

      try {
        const data = await getPersonDetails(id, { signal: abortController.signal });

        // Only update if the id hasn't changed during the request
        if (currentIdRef.current !== id) return;

        setPerson(data);
      } catch (err) {
        // Ignore abort errors
        if (err.name === "AbortError") return;

        setError(err.message || "Failed to load person details");
      } finally {
        // Only reset loading if this request is still the latest
        if (currentIdRef.current === id) {
          setLoading(false);
        }
      }
    }

    fetchPerson();

    return () => {
      abortController.abort();
    };
  }, [id]);

  return { person, loading, error };
}