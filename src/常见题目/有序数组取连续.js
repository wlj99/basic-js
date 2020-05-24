function getSeries(arr) {
  let temp = arr[0]
  return arr.reduce((acc, cur, index) => {
    if (cur + 1 !== arr[index + 1]) {
      if (temp !== cur) {
        acc.push(`${temp}~${cur}`)
      } else {
        acc.push(cur)
      }
      temp = arr[index + 1]
    }
    return acc
  }, []).join(',')
}

let arr = ['1, 2, 3, 5, 7, 8, 10, 11'];
console.log(getSeries(arr));