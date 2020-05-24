function sameStr(arr) {
  let res = arr[0];
  for (let i = 0, j = arr.length; i < j; i++) {
    for (let k = 0, m = arr[0].length; k < m; k++) {
      if (arr[i][k] !== res[k]) {
        if (i === 0) {
          return '';
        }
        res = res.substr(0, k);
      }
    }
  }

  return res;
}

let str1 = ["flower", "flow", "flight"];
console.log(sameStr(str1));

function samePath(arr) {
  let res = arr[0];

}