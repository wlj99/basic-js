class Animail{
  constructor(name){
    this.name = name;
  }
  eat(){
    console.log(`the  ${this.name} is eating`)
  }
}

class Dog extends Animail{
  constructor(name,food){
    super(name);
    this.food = food;
  }
  smile(){
    console.log(`the ${this.name} is eating ${this.food}`)
  }

}
let an = new Animail('mimi');
an.eat();
let dog = new Dog('dahuang','meat');
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
console.log(p1.__proto__ === P.prototype);//false
var p2 = new P();
console.log(p2.__proto__ === P.prototype);//true
// console.log(P.prototype);
/* 
console.log(p1.name);//undefined
console.log(p1.age, 'dd');//8
console.log(p1.num); //undefined 
console.log(p2.name);//zz */