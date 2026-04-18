import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { FiArrowLeft, FiUser, FiMaximize2, FiMinimize2 } from "react-icons/fi";
import { usePersonDetail } from "../hooks/usePersonDetail";
import { usePageTitle } from "../hooks/usePageTitle";
import { getPosterUrl, getYear } from "../utils/helpers";
import noPoster from "../assets/no-poster.svg";

// Helper to format date
const formatDate = (dateString) => {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

function Person() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { person, loading, error } = usePersonDetail(id);
  const [bioExpanded, setBioExpanded] = useState(false);

  usePageTitle(person ? person.name : null);

  // Memoize filmography to avoid re‑sorting on every render
  const filmography = useMemo(() => {
    const credits = person?.movie_credits?.cast;
    if (!credits) return [];
    return credits
      .filter((m) => m.title && m.release_date)
      .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  }, [person]);

  if (loading) {
    return (
      <div
        className="flex justify-center items-center min-h-96"
        aria-label="Loading person details"
        role="status"
      >
        <div className="w-12 h-12 border-4 border-gray-700 border-t-red-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <FiUser className="text-6xl mx-auto mb-4 text-gray-600" />
        <p className="text-white text-xl">{error}</p>
        <div className="mt-4 space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600"
          >
            Go Back
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!person) return null;

  const photo = person.profile_path
    ? getPosterUrl(person.profile_path, "medium")
    : null;

  const hasBiography = person.biography && person.biography.trim().length > 0;
  const biographyText = person.biography || "";
  const shouldTruncate = !bioExpanded && biographyText.length > 400;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button with aria-label */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        aria-label="Go back to previous page"
      >
        <FiArrowLeft /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Photo + Basic Info */}
        <div className="md:col-span-1">
          {photo ? (
            <img
              src={photo}
              alt={`Portrait of ${person.name}`}
              className="w-full rounded-2xl shadow-2xl"
              loading="lazy"
            />
          ) : (
            <div
              className="w-full aspect-[2/3] rounded-2xl bg-gray-800 
                          flex items-center justify-center"
              aria-label="No portrait available"
            >
              <FiUser className="text-6xl text-gray-600" />
            </div>
          )}

          {/* Quick facts */}
          <div className="mt-4 space-y-3">
            {person.known_for_department && (
              <div>
                <p className="text-gray-500 text-sm">Known For</p>
                <p className="text-white">{person.known_for_department}</p>
              </div>
            )}
            {person.birthday && (
              <div>
                <p className="text-gray-500 text-sm">Born</p>
                <p className="text-white">{formatDate(person.birthday)}</p>
              </div>
            )}
            {person.deathday && (
              <div>
                <p className="text-gray-500 text-sm">Died</p>
                <p className="text-white">{formatDate(person.deathday)}</p>
              </div>
            )}
            {person.place_of_birth && (
              <div>
                <p className="text-gray-500 text-sm">Place of Birth</p>
                <p className="text-white">{person.place_of_birth}</p>
              </div>
            )}
            {person.also_known_as?.length > 0 && (
              <div>
                <p className="text-gray-500 text-sm">Also Known As</p>
                <p className="text-white text-sm">
                  {person.also_known_as.slice(0, 3).join(", ")}
                  {person.also_known_as.length > 3 && " ..."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="md:col-span-2 text-white">
          <h1 className="text-4xl font-bold mb-4">{person.name}</h1>

          {/* Biography with expand/collapse */}
          {hasBiography && (
            <div className="mb-8">
              <p className="text-gray-500 text-sm mb-2">Biography</p>
              <div className="text-gray-300 leading-relaxed">
                <p className={shouldTruncate ? "line-clamp-6" : ""}>
                  {biographyText}
                </p>
                {biographyText.length > 400 && (
                  <button
                    onClick={() => setBioExpanded(!bioExpanded)}
                    className="mt-2 text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                  >
                    {bioExpanded ? (
                      <>
                        <FiMinimize2 size={14} /> Show less
                      </>
                    ) : (
                      <>
                        <FiMaximize2 size={14} /> Read more
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Filmography */}
          {filmography.length > 0 ? (
            <div>
              <p className="text-gray-500 text-sm mb-4">
                Filmography ({filmography.length})
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filmography.slice(0, 12).map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    className="group bg-gray-800 rounded-xl overflow-hidden
                               hover:bg-gray-700 transition-all duration-200"
                    aria-label={`View details for ${movie.title}`}
                  >
                    <img
                      src={
                        movie.poster_path
                          ? getPosterUrl(movie.poster_path, "small")
                          : noPoster
                      }
                      alt={`Poster of ${movie.title}`}
                      onError={(e) => {
                        e.target.src = noPoster;
                      }}
                      className="w-full aspect-[2/3] object-cover"
                      loading="lazy"
                    />
                    <div className="p-2">
                      <p
                        className="text-white text-sm font-semibold truncate 
                                   group-hover:text-red-400 transition-colors"
                      >
                        {movie.title}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {getYear(movie.release_date)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              {filmography.length > 12 && (
                <p className="text-center text-gray-500 text-sm mt-4">
                  + {filmography.length - 12} more movies
                </p>
              )}
            </div>
          ) : (
            <div className="text-gray-400 text-center py-8">
              No filmography available for this person.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Person;