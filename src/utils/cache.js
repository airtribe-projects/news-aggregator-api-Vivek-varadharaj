const Store = new Map();

const getCache = (key) => {
  const cached = Store.get(key);
  if (!cached) {
    return null;
  }
  const { value, expiresAt } = cached;
  if (Date.now() > expiresAt) {
    Store.delete(key);
    return null;
  }
  return value;
};

const setCache = (key, value, ttlSeconds = 600) => {
  Store.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
};

module.exports = { getCache, setCache };
