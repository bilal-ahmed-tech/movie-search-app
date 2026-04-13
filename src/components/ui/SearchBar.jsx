import { useState } from "react"
import { FiSearch } from "react-icons/fi"

export default function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState("")

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search for movies..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch(input)}
        className="flex-1 px-4 py-3 rounded-xl bg-gray-800 text-white
                   placeholder:text-gray-500 min-w-48 border border-gray-700
                   focus:outline-none focus:ring-2 focus:ring-red-500
                   transition-all duration-200"
      />
      <button
        onClick={() => onSearch(input)}
        disabled={loading}
        className=" px-3 sm:px-6 py-3 bg-red-500 hover:bg-red-600 
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