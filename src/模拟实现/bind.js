Function.prototype.bind2 = function (context) {
  let self = this,
    [, ...args] = arguments;
  // let args1 = Array.prototype.slice.call(arguments, 1);
  return function () {

    // let bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(context, [...args, arguments]);
    // return self.apply(context,args1.concat(bindArgs));
  }
}

Function.prototype.bind3 = function (context) {
  let self = this;
  let args = Array.prototype.slice.call(arguments, 1);

  let fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);
    // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return self.apply(this instanceof fBound ? this : context, args.concat(bindArgs));
  }
  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
  fBound.prototype = this.prototype;
  return fBound;
}
//需要后续再次研究理解
Function.prototype.bind4 = function (context) {
  if (typeof this !== 'function') throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
  let self = this,
    [, ...args] = arguments;
  let obj = function () {};
  let temp = function () {
    return self.apply(this instanceof obj ? this : context, ...args, arguments);
  }
  obj.prototype = this.prototype;
  temp.prototype = new obj();
  return temp;
}

var foo = {
  value: 1
};

function bar() {
  console.log(this.value);
  return this.value;
}

function bar2(name, age) {
  console.log(this.value);
  console.log(name);
  console.log(age);

}

let b2 = bar2.bind2(foo, 'test');
b2(25);