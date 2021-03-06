class Animail {
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log(`the  ${this.name} is eating`)
  }
}

class Dog extends Animail {
  constructor(name, food) {
    super(name);
    this.food = food;
  }
  smile() {
    console.log(`the ${this.name} is eating ${this.food}`)
  }

}
let an = new Animail('mimi');
an.eat();
let dog = new Dog('dahuang', 'meat');
dog.smile();

/* console.log(an.__proto__ === Animail.prototype);
console.log(an.__proto__.__proto__ === Object.prototype);
console.log(an.__proto__.__proto__.__proto__ === Object.prototype.__proto__);

console.log(dog.__proto__ === Dog.prototype);
console.log(dog.__proto__ ,Dog.prototype.__proto__ === Animail.prototype);
console.log(Dog.prototype.__proto__.__proto__ === Object.prototype);
console.log(dog.prototype,Dog.__proto__,'22'); */
// console.log(Dog.prototype , '1', Dog.prototype.constructor, Dog.prototype.__proto__);

/* let a = {};
console.log(a.__proto__.__proto__ === null);

let b = Object.create({});
console.log(b.__proto__.__proto__ === Object.prototype); */


// function F() {};
// Object.prototype.a = function () {
//   console.log('a');
// }

// Function.prototype.b = function (){
//   console.log('b');
// }

// var f = new F();
// f.a();
// // f.b();
// console.log( F.__proto__ === Function.prototype, F.__proto__, Function.prototype);
// F.a();
// F.b();

// function Person(name){
//   this.name = name;
// }

// let p = new Person('Tom');
// console.log(p.__proto__ === Person.prototype);
// console.log(Person.__proto__ === Function.prototype);

/* let b = 0 && 1 && 2; // 0 
let c = 2 || 0;//2

let obj = {
  a:{
    c:1
  },
  b:2
}
let m = new Map();
m.set('b',1).set({a : {c:1}} , 5);
console.log([...m]); */


function P() {}

var p1 = new P();
P.prototype.age = 18;
P.prototype = {
  constructor: P,
  name: 'zz'
}
P.prototype.num = 20;
P.prototype.age = 20;
// console.log(P.prototype);
console.log(p1.__proto__ === P.prototype); //false
var p2 = new P();
console.log(p2.__proto__ === P.prototype); //true
// console.log(P.prototype);

console.log(p1.name); //undefined
console.log(p1.age, 'dd'); //8
console.log(p1.num); //undefined 
console.log(p2.name); //zz


function setupHelp() {
  let res = [];
  for (var i = 0; i < 3; i++) {
    res.push((function () {
      return i;
    })())
  }
  return res;
}

function factorial(num) {
  if (num <= 1) {
    return 1
  } else {
    return num * factorial(num - 1)
  }
}
var anotherFactorial = factorial
factorial = null
anotherFactorial(4) // 报错 ，因为最好是return num* arguments.callee（num-1），arguments.callee指向当前执行函数，但是在严格模式下不能使用该属性也会报错，所以借助闭包来实现


// 使用闭包实现递归
function newFactorial = (function f(num) {
  if (num < 1) {
    return 1
  } else {
    return num * f(num - 1)
  }
}) //这样就没有问题了，实际上起作用的是闭包函数f，而不是外面的函数newFactorial



function A() {
  this.name = '122';
  this.deg = [1, 2, 3];
}

function B() {

}
B.prototype = new A();
let b1 = new B();
let b2 = new B();
b1.name = '3444';
b1.deg.push('233');
console.log(b1.name);
console.log(b1.deg);
console.log(b2.name);
console.log(b2.deg);