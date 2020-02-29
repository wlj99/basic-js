function flat(arr){
  let res = arr.toString().replace('/\[+\]+/g','');
  return res.split(',');
}

function flatten(arr) {
  return arr.reduce(function(prev, next){
      return prev.concat(Array.isArray(next) ? flatten(next) : next)
  }, [])
}

function flatten2(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}

let arr = [1, [2, [3, 4]],[5,6]];
console.log(flatten2(arr))