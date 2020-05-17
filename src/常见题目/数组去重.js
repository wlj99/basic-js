function unique(array) {
  // res用来存储结果
  var res = [];
  for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
    for (var j = 0, resLen = res.length; j < resLen; j++) {
      if (array[i] === res[j]) {
        break;
      }
    }
    // 如果array[i]是唯一的，那么执行完循环，j等于resLen
    if (j === resLen) {
      res.push(array[i])
    }
  }
  return res;
}

function unique(array) {
  var res = [];
  for (var i = 0, len = array.length; i < len; i++) {
    var current = array[i];
    if (res.indexOf(current) === -1) {
      res.push(current)
    }
  }
  return res;
}

function unique(array) {
  var res = [];
  var sortedArray = array.concat().sort((a, b) => a - b);
  var seen;
  for (var i = 0, len = sortedArray.length; i < len; i++) {
    // 如果是第一个元素或者相邻的元素不相同
    if (!i || seen !== sortedArray[i]) {
      res.push(sortedArray[i])
    }
    seen = sortedArray[i];
  }
  return res;
}
/* 
根据一个参数 isSorted 判断传入的数组是否是已排序的，
如果为 true，我们就判断相邻元素是否相同，如果为 false，我们就使用 indexOf 进行判断
*/
function unique(array, isSorted) {
  var res = [];
  var seen;

  for (var i = 0, len = array.length; i < len; i++) {
    var value = array[i];
    if (isSorted) {
      if (!i || seen !== value) {
        res.push(value)
      }
      seen = value;
    } else if (res.indexOf(value) === -1) {
      res.push(value);
    }
  }
  return res;
}

function unique(array) {
  var res = array.filter(function (item, index, array) {
    return array.indexOf(item) === index;
  })
  return res;
}

function unique(array) {
  var obj = {};
  return array.filter(function (item, index, array) {
    return obj.hasOwnProperty(item) ? false : (obj[item] = true)
  })
}

function unique(array) {
  return [...new Set(array)];
}