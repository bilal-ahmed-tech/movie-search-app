const memoryCache = new Map();

export function getCached(key) {
  if (memoryCache.has(key)) {
    const cached = memoryCache.get(key);
    if (!cached.expiry || cached.expiry > Date.now()) {
      return cached.data;
    }
    memoryCache.delete(key); 
  }

  try {
    const val = sessionStorage.getItem(key);
    if (val) {
      const parsed = JSON.parse(val);

      if (!parsed.expiry || parsed.expiry > Date.now()) {
        memoryCache.set(key, parsed); 
        return parsed.data;
      }

      sessionStorage.removeItem(key); 
    }
  } catch (err) {
    console.warn("Cache read failed:", err);
  }

  return null;
}

export function setCached(key, data, ttlMs = 5 * 60 * 1000) {
  const payload = {
    data,
    expiry: ttlMs === null ? null : Date.now() + ttlMs,
  };

  memoryCache.set(key, payload);

  try {
    sessionStorage.setItem(key, JSON.stringify(payload));
  } catch (err) {
    console.warn("Cache write failed:", err);
  }
}

export function buildCacheKey(...args) {
  return JSON.stringify(args);
}