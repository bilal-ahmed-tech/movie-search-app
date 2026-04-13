
function EmptyState({ icon: Icon, title, message }) {
  return (
    <div className="text-center py-20">
      <Icon className="text-6xl mx-auto mb-4 text-gray-600" />
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{message}</p>
    </div>
  )
}

export default EmptyState