function GenreFilter({ genres, selectedGenre, onSelect }) {
  if (genres.length === 0) return null;

  return (
    <div className="mb-8">
      <p className="text-gray-400 text-sm mb-3">Browse by Genre</p>

      <div
        className="flex gap-2 pb-2
                   overflow-x-auto md:overflow-x-visible
                   md:flex-wrap
                   [scrollbar-width:none] [-ms-overflow-style:none]
                   [&::-webkit-scrollbar]:hidden">

        <button
          onClick={() => onSelect(null)}
          className={`flex-shrink-0 md:flex-initial px-4 py-2 rounded-full text-sm font-semibold
                      transition-all duration-200
                      ${
                        selectedGenre === null
                          ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}>
          All
        </button>

        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onSelect(genre)}
            className={`flex-shrink-0 md:flex-initial px-4 py-2 rounded-full text-sm font-semibold
                        transition-all duration-200
                        ${
                          selectedGenre?.id === genre.id
                            ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}>
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GenreFilter;