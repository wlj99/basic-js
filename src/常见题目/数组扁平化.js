function flatten(arr) {
  var result = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result;
}

function flat1(arr) {
  let result = []
  arr.forEach(element => {
    if (Array.isArray(element)) {
      result = result.concat(flat1(element))
    } else {
      result.push(element)
    }
  });
  return result
}

function flat(arr) {
  let res = arr.toString().replace('/\[+\]+/g', '');
  return res.split(',');
}

function flatten(arr) {
  return arr.reduce(function (prev, next) {
    return prev.concat(Array.isArray(next) ? flatten(next) : next)
  }, [])
}

function flatten2(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}