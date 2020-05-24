/* 
给定一个 8 * 8维的矩阵，如果某行或某列的值为1的个数大于2  返回 true 否则为false
*/

function hasHook(arr) {
  let len = arr.length;

  let col = new Array(8).fill(0);
  let row = new Array(8).fill(0);
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === 1) {
        col[i]++;
        row[j]++;
      }
    }
  }
  for (let i = 0; i < 8; i++) {
    if (arr[i] > 2) {
      return true;
    }
  }

}