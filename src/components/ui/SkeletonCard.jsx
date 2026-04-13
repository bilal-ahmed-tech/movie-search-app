export default function SkeletonCard() {
  return (
    <div className="bg-gray-800 rounded-md shadow-md overflow-hidden">
      <div className="bg-gray-600 h-48 animate-pulse"></div>
      <div className="p-4">
        <div className="bg-gray-600 h-6 mb-2 animate-pulse"></div>
        <div className="bg-gray-600 h-4 mb-2 animate-pulse"></div>
        <div className="bg-gray-600 h-4 animate-pulse"></div>
      </div>
    </div>
  );
}