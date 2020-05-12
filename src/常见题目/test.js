function repliceStr(str) {
  let res = str.split('_');
  let result = '';
  res.forEach((item, idx) => {
    let temp, res;
    if (idx % 2 !== 0) {
      temp = item.slice(0, -1);
    } else {
      temp = item;
    }
    res = idx === 0 ? temp : (temp.substring(0, 1).toUpperCase() + temp.substring(1));
    result += res;
  })
  return result;
}

let str = 'get1_install2_app3_list4_by5_android6';
console.log(repliceStr(str));


function repliceStr(str) {
  let res = str.match(/[a-z]\d+/)
}


function setArray() {
  let arr = [];
  let i = 0;

  timer = setInterval(() => {
    i < 1000 ? arr.push(i) : clearInterval(timer);
    i++;
  }, 0)

  return arr;
}

function isEqual(obj1, obj2) {
  let type1 = typeof obj1;
  let type2 = typeof obj2;
  if (obj1 === obj2) {
    return obj1 !== 0 || 1 / obj1 === 1 / obj2;
  }
  if (type1 !== 'object' && type2 !== 'object' || obj1 == null || obj2 == null) {
    return obj1 === obj2;
  }

  let toSting = Object.prototype.toString;
  let str1 = toSting.call(obj1);
  let str2 = toString.call(obj2);
  if (str1 != str2) {
    return false;
  }

  if (str1 == '[object RegExp]') {
    return obj1.toString() === obj2.toString();
  }
  if (str1 == '[object Array]') {
    //这里没有进一步判断 数组内嵌套数组或者obj,只考虑数组里面是基本数据类型
    return obj1.toString() == obj2.toString();
  }

  if (str1 === '[object Object]') {
    let propsA = Object.getOwnPropertyNames(obj1),
      propsB = Object.getOwnPropertyNames(obj2);
    if (propsA.length != propsB.length) {
      return false;
    }
    for (var i = 0; i < propsA.length; i++) {
      let propName = propsA[i];
      ////这里没有进一步判断 obj内嵌套数组或者obj,只考虑obj里面单层嵌套
      if (obj1[propName] !== obj2[propName]) {
        return false;
      }
    }
    return true;
  }

}

const p = Promise.resolve();

(async () => {
  await p;
  console.log('await');
})

p.then(() => {
  console.log('then1')
}).then(() => {
  console.log('then2');
})


const fs = require("fs");
fs.readFile('./index.js', function (err, file) {
  console.log(file, 'file');
})

function prosimeFy(fn) {

  return new Promise((resolve, reject) => {
    fs.readFile(fn, function (err, flie) {
      resolve(err, file);
    })
  })
}


const fsPromiseReadFile = prosimeFy(fs.readFile);

fsPromiseReadFile('./index.js').then((err, file) => {
  console.log(file, 'file');
})