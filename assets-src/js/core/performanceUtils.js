//region Polyfill
const elemsWithBoundingRects = [];

window.pbsGetBoundingClientRect = function(element) {
  // Check if we already got the client rect before.
  if (!element._bcr) {
    // If not, get it then store it for future use.
    element._bcr = element.getBoundingClientRect();
    elemsWithBoundingRects.push(element);
  }
  return element._bcr;
};
//endregion

export function weakCache(fn) {
  const cache = new WeakMap();
  return arg => {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    const computed = fn(arg);
    cache.set(arg, computed);
    return computed;
  };
}
