function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    for (let j = 1; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
// 优化
function bubbelSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let flag = true;
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        flag = false;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    if (flag) break;
  }
  return arr;
}
let arr = [9, 23, 4, 5, 5, 8];
console.log(bubbelSort(arr));

// 快排
function quickSort(arr, left, right) {
  if (left < right) {
    let pos = left - 1;
    for (let i = left; i <= right; i++) {
      let basic = arr[right];
      if (arr[i] <= basic) {
        pos++;
        [arr[pos], arr[i]] = [arr[i], arr[pos]];
      }
    }
    quickSort(arr, left, pos - 1);
    quickSort(arr, pos + 1, right);
  }
  return arr;
}
let arr = [9, 23, 4, 5, 5, 8];
console.log(quickSort(arr, 0, arr.length - 1));

// 归并排序
function mergeSort(arr) {
  let len = arr.length;
  if (len <= 1) return arr;
  let midIndex = Math.floor(len / 2);

  let left = arr.slice(0, midIndex);
  let right = arr.slice(midIndex, len);
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let res = [];
  while (left.length && right.length) {
    left[0] <= right[0] ? res.push(left.shift()) : res.push(right.shift());
  }
  while (left.length) {
    res.push(left.shift());
  }
  while (right.length) {
    res.push(right.shift());
  }
  return res;
}

let arr = [9, 23, 4, 5, 5, 8];
console.log(mergeSort(arr));

/* 
 链表求和
*/
function NodeList(val) {
  this.val = val;
  this.next = nu
}

function reverse(node) {
  let prev = null,
    current = node;
  while (current !== null) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
}

function listSum(l1, l2) {
  let curr1 = reverse(l1);
  let curr2 = reverse(l2);
  let resNode = new NodeList(0);
  let currentNode = resNode;
  let point = 0;
  while (curr1 !== null || curr2 !== null) {
    let current1 = curr1.val ? curr1.val : 0;
    let current2 = curr2.val ? curr2.val : 0;
    let val = current1 + current2 + point;
    currentNode.next = new NodeList(val % 10);
    point = val > 9 ? Math.floor(val / 10) : 0;
    currentNode = currentNode.next;
    current1 = current1 !== null ? current1.next : null;
    current2 = current2.next !== null ? current2.next : null
  }
  return reverse(resNode.next);
}

// 大数相加

function add(num1, num2) {
  let first = (num1 || '').split('');
  let second = (num2 || '').split('');
  let indexA = first.length;
  let indexB = seconde.length;
  let point = 0;
  let res = [];
  while (indexA || indexB) {
    let v1 = first[indexA];
    let v2 = first[indexB];
    let val = v1 + v2 + point;
    res.shift(val % 10);
    point = point > 9 ? Math.floor(val / 10) : 0;
    indexA--;
    indexB--;
  }
  return res.join('');
}


/* 字符串翻转 */
function reverse(num) {

  if (num < 10) {
    return num.toString();
  }

  let bit = num % 10;
  let newNum = Math.floor(num / 10);

  return bit.toString + reverse(newNum);

}

/* 两数之和 */

function findSum(arr, target) {
  let obj = {};
  let len = arr.length;
  for (let i = 0; i < arr.length; i++) {
    let temp = target - arr[i];
    if (obj[arr[i]] >= 0) {
      return [obj[arr[i]], i];
    }
    obj[temp] = i;
  }
}

/* 对象扁平化 */

function flagObj(obj, prefix = '', res = {}) {
  for (let key in obj) {
    prefix = prefix ? prefix + '.' + key : key;
    isObj(obj[key]) ? flagObj(obj[key], prefix, res) : (res[key] = obj[key]);
  }
  return res;
}

function isObj(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
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
    e: 'ae'
  }
}

console.log(flagObj(entry));

/* 对象还原 */
function buildObj(obj) {
  let res = {};
  Object.keys(obj).forEach(key => {
    let arr = item.split('.');

    while (arr.length !== 0) {
      let item = arr.shift();
      if (!res.hasOwnProperty(item)) {
        res[key] = arr.length === 0 ? obj[key] : {}
      }
      res = res[key];
    }
  })

  return res;
}

function deepCloneObjArr(obj) {
  if (typeof obj !== 'object') return;
  let res = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (Object.hasOwnProperty(key)) {
      let temp = obj[key];
      res[key] = typeof obj[key] === 'object' ? deepCloneObjArr(temp) : temp;
    }
  }
}



const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromse {
  constructor(fn) {
    this.state = PENDING;
    this.callbacks = [];
    this.value = undefined;
    // this.resoveHandler = [];
    // this.rejectHandler = [];
  }

  then(onFulifilled, onRejected) {
    return new MyPromse((resolve, reject) => {
      let callback = {
        onFulifilled,
        onRejected,
        resolve,
        reject
      };
      if (this.state === PENDING) return;

    })
  }
}








function myJsonp({
  ulr,
  params,
  cb
} = {}) {
  return new Promise(resolve, reject => {
    let srcript = document.createElement('script');
    params = {
      ...params,
      cb
    };

    window[cb] = function (data) {
      resolve(data);
      document.body.appendChild(script);
    }

    let arr = [];
    for (let key in params) {
      arr.push(`${key}=${params[key]}`)
    };
    srcript.src = `${url}?${arr.join('&')}`;
    document.body.appendChild(script);
  })
}



/* 有序链表的合并 */

function mergeTwoLists(l1, l2) {
  if (l1 === null) {
    return l2
  }
  if (l2 === null) {
    return l1
  }
  if (l1.val <= l2.val) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoLists(l2.next, l1)
    return l2
  }
}



var LRUCache = function (capacity) {
  this.cache = new Map()
  this.capacity = capacity
}

LRUCache.prototype.get = function (key) {
  if (this.cache.has(key)) {
    // 存在即更新
    let temp = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, temp)
    return temp
  }
  return -1
}

LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    // 存在即更新（删除后加入）
    this.cache.delete(key)
  } else if (this.cache.size >= this.capacity) {
    // 不存在即加入
    // 缓存超过最大值，则移除最近没有使用的
    this.cache.delete(this.cache.keys().next().value)
  }
  this.cache.set(key, value)
}


var merge = function (nums1, m, nums2, n) {
  let length = m + n
  while (n > 0) {
    if (m <= 0) {
      nums1[--length] = nums2[--n]
      continue
    }
    nums1[--length] = nums1[m - 1] >= nums2[n - 1] ? nums1[--m] : nums2[--n]
  }
};