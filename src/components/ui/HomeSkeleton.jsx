// components/ui/HomeSkeleton.jsx
import { FiSearch } from "react-icons/fi";

export default function HomeSkeleton() {
  return (
    <div className="bg-black min-h-screen">
      {/* Search Bar Section */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="h-10 w-48 bg-gray-800 rounded-lg mx-auto mb-2 animate-pulse" />
        <div className="h-4 w-64 bg-gray-800 rounded-lg mx-auto mb-6 animate-pulse" />
        <div className="relative">
          <div className="w-full h-12 bg-gray-800 rounded-xl animate-pulse" />
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
        </div>
      </div>

      {/* Genre Filter Skeleton */}
      <div className="flex flex-wrap gap-2 mb-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-9 w-20 bg-gray-800 rounded-full animate-pulse"
          />
        ))}
      </div>

      {/* Movies Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden bg-gray-900 animate-pulse">
            <div className="aspect-[2/3] bg-gray-800" />
            <div className="p-2 space-y-2">
              <div className="h-4 bg-gray-800 rounded w-3/4" />
              <div className="h-3 bg-gray-800 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}