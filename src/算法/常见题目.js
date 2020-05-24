/* 驼峰命名法 */

function cacleCase(s) {
  return s.replace(/-\w/, function (v) {
    return v.slice(1).toUpperCase();
  })
}

let s = "get-element-by-id";


function debounce(fn, delay = 1000) {
  let timer;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    })
  }
}

function throttle(fn, delay = 1000) {
  let timer;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, arguments);
      })
    }
  }
}

function maxHuiWen(str) {
  let len = str.length;
  if (len <= 1) return str;
  let dps = Array.from(new Array(len), () => new Array(len).fill(0));
  let res = '';
  for (let i = 0; i < len; i++) {
    for (let j = i; j >= 0; j--) {
      dps[i][j] = str[i] === str[j] && (i - j < 2 || dps[i - 1][j + 1]);
      if (dps[i][j] && i - j + 1 > res.length) {
        res = str.substring(j, i + 1);
      }
    }
  }
  return res;
}

console.log(maxHuiWen("babad"));

function isObj(str) {
  return Object.prototype.toString.call(str) === '[object Object]';
}

function flagObj(obj, prefix = '', res = {}) {
  for (let key in obj) {
    let temp = prefix ? prefix + '.' + key : key;
    isObj(obj[key]) ? flagObj(obj[key], temp, res) : (res[temp] = obj[key]);
  }
  return res;
}

function flagObjArray(obj, prefix = '', res = {}) {
  for (let key in obj) {
    let pre = prefix ? prefix + '.' + key : key;
    let temp = obj[key];
    if (Array.isArray(temp)) {
      temp.forEach((item, idx) => {
        pre = prefix ? prefix + '.' + key + '[' + idx + ']' : key;
        res[pre] = item;
      })
    } else if (isObj(temp)) {
      flagObjArray(temp, pre, res)
    } else {
      res[pre] = temp;
    }
  }
  return res;
}

var entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd'
      }
    },
    d: {
      xx: 'adxx'
    },
    e: ['2', '3']
  }
}
console.log(flagObjArray(entry));

function buildObj(obj) {
  let result = {};
  Object.keys(obj).forEach(item => {
    let stack = item.split('.');
    let res = result;
    while (stack.length !== 0) {
      let temp = stack.shift();
      if (!res.hasOwnProperty(temp)) {
        res[temp] = stack.length === 0 ? obj[item] : {}
      }
      res = res[temp];
    }
  })

  return result;
}

var entry = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae',
  'f.g': ["a", "b"]
}

console.log(buildObj(entry));


const obj = {
  selector: {
    to: {
      toutiao: 'FE coder'
    }
  },
  target: [
    1,
    2,
    {
      name: 'byted'
    }
  ]
}

console.log(getMySlef(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name'));

function getMySlef() {
  let [obj, ...args] = arguments;
  let res = [];
  args.forEach(item => {
    let stack = item.split('.');
    let current = Object.create(obj);
    stack.forEach(key => {
      if (key.indexOf('[') === -1) {
        current = current ? current[key] : undefined;
      } else {
        let left = key.indexOf('[');
        let right = key.indexOf(']');
        let pro = key.slice(0, left);
        let idx = key.slice(left + 1, right);
        current = current ? current[pro][idx] : undefined;
      }
    })
    res.push(current);
  })
  return res;

}


/**
 * 给定一个有N×M的整型矩阵matrix和一个整数K，matrix每行每列都排好序了。
    实现一个函数，判断K是否在matrix中。

    核心在于创造判定条件：从右上角找
*/

const matrix = [
  [0, 1, 2, 5],
  [2, 3, 4, 7],
  [4, 4, 4, 8],
  [5, 7, 7, 9]
];

function findNum(arr, target) {
  let row = arr.length;
  let col = arr[0].length;
  let startRow = 0;
  let colStart = col - 1;
  while (startRow < row || colStart >= 0) {
    if (arr[startRow][colStart] === target) {
      return true
    } else if (arr[startRow][colStart] > target) {
      colStart--;
    } else if (arr[startRow][colStart] < target) {
      startRow++;
    }
  }
  return false;
}

console.log(findNum(matrix, 5))

function combineArr(arr1, arr2) {
  let res = [];
  while (arr1.length && arr2.length) {
    arr1[0] < arr2[0] ? res.push(arr1.shift()) : res.push(arr2.shift());
  }

  while (arr1.length) {
    res.push(arr1.shift());
  }

  while (arr2.length) {
    res.push(arr2.shift());
  }
}