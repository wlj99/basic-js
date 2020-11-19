// 1 typeof
typeof 123 // number
typeof '123' // string
typeof true // boolean
typeof [12, 34] // object

typeof {} // object 
typeof undefined // undefined
typeof (function () {

}) // function

typeof /\a-z/ // object
typeof new RegExp() // object
typeof null // object 
/* 
JS 最初版本中，使用的是 32 位系统，为了性能考虑使用低位存储了变量的类型信息，
000 开头代表是对象.然而 null 表示为全零，所以被错误的判断为object。虽然现在的内部类型判断代码已经改变，但是这Bug却一直流传下来
*/


typeof Symbol() // symbol
typeof new Map() // object

function type(input) {
  return typeof (input)
}


// 2 instanceof  但是左边的表达式必须是对象 否则会报错


//3 Object.prototype.toString.call( obj); [object Type]
let a = {}, //[object Object]
  b = undefined, //[object Undefined]
  c = null, //[object Null]
  d = () => {}, //[object Function]
  e = [], //[object Array]
  f = 1, //[object Number]
  g = '', //[object String]j
  h = Symbol(), //[object Symbol]
  i = false //[object Boolean]
console.log(Object.prototype.toString.call(a))
// 方法
const isType = (type, target) => `[object ${type}]` === Object.prototype.toString.call(target);
let isArray = isType('Array', [11111]); // 首字母必须大写
console.log(isArray);
// b 方法
const type = data =>
  Object.prototype.toString
  .call(data)
  .replace(/^\[object (.+)\]$/, '$1')
  .toLowerCase()
// c 方法
function getType(obj) {
  const str = Object.prototype.toString.call(obj);
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    // 判断是否是dom元素，如div等
    return 'element';
  }
  return map[str];
}



/* var funcs = [];
for (var i = 0; i < 10; i++) {
  funcs.push((function (value) {
    return function () {
      console.log(value);
    }
  }(i)));
}
funcs.forEach(function (func) {
  func();
}) */

var funcs = [];
for (var i = 0; i < 10; i++) {
  funcs.push(function (value) {
    return function () {
      console.log(value);
    }
  }(i));
}
funcs.forEach(function (func) {
  func();
})
var text1 = "";
console.log(text1.length); // 2 
console.log(/^.$/.test(text1)); // false 
console.log(text1.charAt(0)); // "" 
console.log(text1.charAt(1)); // "" 
console.log(text1.charCodeAt(0)); // 55362 
console.log(text1.charCodeAt(1)); // 57271



function Person(name) {
  if (typeof new.target !== "undefined") {
    this.name = name; // 使用 new 
  } else {
    throw new Error("You must use new with Person.")
  }
}
var person = new Person("Nicholas");
var notAPerson = Person.call(person, "Michael");

function Person(name) {
  if (this instanceof Person) {
    this.name = name; // 使用 new
  } else {
    throw new Error("You must use new with Person.")
  }
}
var person = new Person("Nicholas");
var notAPerson1 = Person.call(person, "Michael");
var notAPerson1 = Person("Nicholas");


var getTempItem = id => ({
  id: id,
  name: "Temp"
});


let node = {
  type: "Identifier",
  name: "foo",
  loc: {
    start: {
      line: 1,
      column: 1
    },
    end: {
      line: 1,
      column: 4
    }
  }
};
let {
  loc: {
    start
  }
} = node;
console.log(loc);


let colors = ["red", ["green", "lightgreen"], "blue"];
let [firstColor, secondColor] = colors