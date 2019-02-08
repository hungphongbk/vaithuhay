export const intersectionOptions = {
  root: document.getElementById('app'),
  rootMargin: '0px 0px 10% 0px',
  threshold: 0
}

export function deepEqual (val1, val2) {
  if (val1 === val2) return true
  if (typeof val1 === 'object') {
    for (const key in val1) {
      if (!deepEqual(val1[key], val2[key])) {
        return false
      }
    }
    return true
  }
  return false
}
