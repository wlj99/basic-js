function myConst(key, value) {
  const desc = {
    value,
    writable: false
  }

  Object.defineProperty(window, key, desc)
}