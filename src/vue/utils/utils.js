export function remove(arr, item) {
  if (arr.length) {
    const idx = arr.indexOf(item);
    if (idx > -1) {
      return arr.splice(idx, 1);
    }
  }
}