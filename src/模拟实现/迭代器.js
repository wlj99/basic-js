/* 
所谓迭代器，其实就是一个具有 next() 方法的对象，每次调用 next() 都会返回一个结果对象，
该结果对象有两个属性，value 表示当前的值，done 表示遍历是否结束。
 */

function createIterator(items) {
  var i = 0;
  return {
    next: function () {
      var done = i >= item.length;
      var value = !done ? items[i++] : undefined;

      return {
        done: done,
        value: value
      };
    }
  };
}

// iterator 就是一个迭代器对象
var iterator = createIterator([1, 2, 3]);

console.log(iterator.next()); // { done: false, value: 1 }
console.log(iterator.next()); // { done: false, value: 2 }
console.log(iterator.next()); // { done: false, value: 3 }
console.log(iterator.next()); // { done: true, value: undefined }

// 其实一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）

const obj = {
  value: 1
};

obj[Symbol.iterator] = function () {
  return createIterator([1, 2, 3]);
};

for (value of obj) {
  console.log(value); // 1,2,3
}


/* for... of 循环可以使用的范围包括：

数组
Set
Map
类数组对象， 如 arguments 对象、 DOM NodeList 对象
Generator 对象
字符串 */


function forOf(obj, cb) {
  let iterable, result;

  if (typeof obj[Symbol.iterator] !== "function")
    throw new TypeError(result + " is not iterable");
  if (typeof cb !== "function") throw new TypeError("cb must be callable");

  iterable = obj[Symbol.iterator]();

  result = iterable.next();
  while (!result.done) {
    cb(result.value);
    result = iterable.next();
  }
}

/* 
return 方法的使用场合是，如果 for...of 循环提前退出（通常是因为出错，或者有 break 语句或 continue 语句），
就会调用 return 方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署 return 方法。 */

function createIterator(items) {
  var i = 0;
  return {
    next: function () {
      var done = i >= items.length;
      var value = !done ? items[i++] : undefined;

      return {
        done: done,
        value: value
      };
    },
    return: function () {
      console.log("执行了 return 方法");
      return {
        value: 23333,
        done: true
      };
    }
  };
}

var colors = ["red", "green", "blue"];

var iterator = createIterator([1, 2, 3]);

colors[Symbol.iterator] = function () {
  return iterator;
};

for (let color of colors) {
  if (color == 1) break;
  console.log(color);
}
// 执行了 return 方法


function createIterator(items) {
  function addIterator(items) {
    let i = 0
    let done = false
    return {
      next() {
        done = i >= items.length
        return {
          value: items[i++],
          done
        }
      }
    }
  }
  let iterator = addIterator(items)
  iterator[Symbol.iterator] = () => addIterator(items)
  return iterator
}