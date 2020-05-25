/* 字符串翻转 */

function reverse(str) {
  return str.trim().replace(/\s+/g, ' ').split('').reverse().join('');
}

function reverseNode(str) {
  let left = 0;
  let right = str.length;
  let res = [];
  let word = '';
  while (str.charAt(left) === ' ') left++;
  while (str.chatAt(right) === ' ') right--;
  while (left <= right) {
    let temp = str.chatAt(left);
    if (temp === ' ' && word) {
      res.unshift(temp);
      word = '';
    } else if (temp !== ' ') {
      word += temp;
    }
    left++;
  }
  res.unshift(word);
  return res.join(' ');
}

/* 提取公共字符串最大前缀 */

function samePrefix(strArr) {

  let len = strArr.length;

  let second = strArr[0].length;
  let res = '';
  for (let i = 1; i < len; i++) {
    let j = 0;
    for (; j < second.length && j < strArr[i].length; j++) {
      if (second[j] !== strArr[i][j]) break;
    }
    second = second.substring(0, j);
    if (second === "") return "";
  }
  return second;
}
console.log(samePrefix(['pwe', 'pw', 'pdddd']));

// 无重复字符的最长子串个数

function noRepeat(str) {
  let arr = [],
    max = 0;
  let len = str.length;
  for (let i = 0; i < len; i++) {
    let idx = arr.indexOf(str[i]);
    if (idx !== -1) {
      arr.splice(0, idx + 1);
    }
    arr.push(str.charAt(i));
    max = Math.max(arr.length, max);
  }

  return max;

}

function noRepeat(str) {

  let idx = 0,
    max = 0;
  for (let i = 0, j = 0; j < str.length; j++) {
    idx = str.substring(i, j).indexOf(str[j]);
    if (idx !== -1) {
      i = i + idx + 1;
    }

    max = Math.max(max, j - i + 1);
  }

  return max;
}

function noRepeat(str) {
  let map = new Map(),
    max = 0;
  for (let i = 0, j = 0; j < str.length; j++) {
    if (map.has(str[j])) {
      i = Math.max(map.get(str[j]) + 1, j);
    }
    max = Math.max(max, j - i + 1);
    map.set(str[j], j);
  }
  return max;
}

/* 字符串相加 */

function addNum(str1, str2) {
  let len1 = str1.length,
    len2 = str2.length,
    res = '',
    point = 0;

  while (len1 || len2) {
    len1 ? point += +str1[--len1] : '';
    len2 ? point += +str2[--len2] : '';
    res = point % 10 + res;
    if (point > 9) point = 1;
  }

  if (point) res = 1 + res;
  return res;
}

function addNum(str1, str2) {
  let stack1 = str1.split(''),
    stack2 = str2.split(''),
    point = 0;
  res = '';
  while (stack1.length || stack2.length) {
    let temp1 = stack1.pop();
    let temp2 = stack2.pop();
    temp1 = temp1 !== undefined ? temp1 : 0;
    temp2 = temp2 !== undefined ? temp2 : 0;
    console.log(temp1, temp2, point);
    point = Number(temp1) + Number(temp2) + Number(point);
    console.log(point, 'point');
    res = point % 10 + res;
    point = point > 9 ? 1 : 0;
  }
  if (point) res = 1 + res;
  return res;
}
console.log(addNum('123', '81'));