import { useState } from "react"
import { FiSearch, FiX } from "react-icons/fi"

export default function SearchBar({ onSearch, onClear, loading }) {
  const [input, setInput] = useState("")

  const handleClear = () => {
    setInput("");
    onClear();
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search for movies..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch(input)}
          className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white
                     placeholder:text-gray-500 min-w-48 border border-gray-700
                     focus:outline-none focus:ring-2 focus:ring-red-500
                     transition-all duration-200"
        />
        {input && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 
                       text-gray-400 hover:text-white transition-colors"
          >
            <FiX size={18} />
          </button>
        )}
      </div>
      <button
        onClick={() => onSearch(input)}
        disabled={loading}
        className="px-3 sm:px-6 py-3 bg-red-500 hover:bg-red-600 
                   text-white rounded-xl font-semibold
                   disabled:opacity-50 transition-all duration-200
                   flex items-center gap-2"
      >
        <FiSearch />
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  )
}