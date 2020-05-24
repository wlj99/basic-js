function flagObj(obj, parentKey = "", result = {}) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let keyName = `${parentKey}${key}`;
      if (typeof obj[key] === 'object') {
        flagObj(obj[key], keyName + ".", result)
      } else {
        result[keyName] = obj[key];
      }
    }
  }
  return result;
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

function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

function flatObj(obj, prefix = '', res = {}) {
  for (let i in obj) {
    let key = prefix ? prefix + '.' + i : i
    isObject(obj[i]) ? flatObj(obj[i], key, res) : (res[key] = obj[i])
  }
  return res
}

function flagObjArray(obj, prefix = '', res = {}) {
  for (let i in obj) {
    let key = prefix ? prefix + '.' + i : i;
    // let key = `${prefix}.${i}`;
    if (Array.isArray(obj[i])) {

      obj[i].forEach((item, idx) => {
        // key = `${prefix}.${i}[${idx}]`;
        key = prefix ? prefix + '.' + i + '[' + idx + ']' : i;
        res[key] = item;
      })
    } else if (isObject(obj[i])) {
      flagObjArray(obj[i], key, res);
    } else {
      res[key] = obj[i];
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
  let result = {}
  Object.keys(obj).forEach(key => {
    let stack = key.split('.'),
      res = result
    while (stack.length !== 0) {
      let k = stack.shift()
      if (!res.hasOwnProperty(k)) {
        res[k] = stack.length === 0 ? obj[key] : {}
      }
      res = res[k]
    }
  })
  return result
}

var entry = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae',
  'f.g': ["a", "b"]
}

console.log(buildObj(entry));