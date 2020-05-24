// 字符串 利用数组的reverse 
function reverse(str) {
  return str.split('').reverse().join('');
}

// 输入一个字符串，有加减乘除，整数，和小数，得出最后的结果
function operation(str) {
  let res = [];
  let lastIndex = 0;
  let currIndex = 0;

}

// 最长回文串
function longestPalindrome(s) {
  let res = '';
  const len = s.length;
  let dp = Array.from(new Array(len), () => new Array(len).fill(0));
  for (let i = 0; i < len; i++) {
    for (let j = i; j >= 0; j--) {
      dp[i][j] = s[i] = s[j] && (i - j < 2 || dp[i - 1][j + 1]);
      console.log(dp[i][j]);
      if (dp[i][j] && i - j + 1 > res.length) {
        res = s.substring(j, i + 1);
      }
    }
  }
  return res;
}
console.log(longestPalindrome('bb'));