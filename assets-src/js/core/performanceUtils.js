export function weakCache(fn) {
  const cache = new WeakMap();
  return (arg) => {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    const computed = fn(arg);
    cache.set(arg, computed);
    return computed;
  }
}
