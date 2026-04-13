const cache = new Map()

export function getCached(key) {
  return cache.get(key) || null
}

export function setCached(key, data) {
  cache.set(key, data)
}

export function buildCacheKey(...args) {
  return args.join("_")
}