let arr = [2, 4, 5, 6],
  k = 2;
getKvalue(arr);

function getKvalue(arr) {
  let max = Math.max(arr[0], arr[1]);
  let second = Math.min(arr[0], arr[1]);

  for (let i = 2; i < arr.length; i++) {

    if (arr[i] > max) {
      second = max;
      max = arr[i];
    } else if (arr[i] > second) {
      second = arr[i];
    }

  }
}