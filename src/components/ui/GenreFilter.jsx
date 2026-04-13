function GenreFilter({ genres, selectedGenre, onSelect }) {
  if (genres.length === 0) return null;

  return (
    <div className="mb-8">
      <p className="text-gray-400 text-sm mb-3">Browse by Genre</p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelect(null)}
          className={`px-4 py-2 rounded-full text-sm font-semibold
                     transition-all duration-200
                     ${
                       selectedGenre === null
                         ? "bg-red-500 text-white"
                         : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                     }`}>
          All
        </button>
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onSelect(genre)}
            className={`px-4 py-2 rounded-full text-sm font-semibold
                       transition-all duration-200
                       ${
                         selectedGenre?.id === genre.id
                           ? "bg-red-500 text-white"
                           : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                       }`}>
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GenreFilter;
