/* 
将函数设为对象的属性
执行该函数
删除该函数 
*/

let foo = {
  value: 1,
  bar: function () {
    console.log(this.value)
  }
};

foo.bar(); // 1
/* 
// 第一步
foo.fn = bar
// 第二步
foo.fn()
// 第三步
delete foo.fn */

Function.prototype.call2 = function (context) {
  let result, [, ...args] = arguments;
  console.log(context, 'context');
  context = context || window;
  context.fn = this;
  console.log(this, 'this');
  result = context.fn(...args);
  delete context.fn;

  return result;
}

function bar() {
  console.log(this.value);
}

function bar2(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value);
}

// 测试一下
var foo = {
  value: 1,
};
bar.call2(foo);
// bar2.call2(foo, 'kevin', 18);

/* var obj = {
  value: 1
}

function bar3(name, age) {
  return {
    value: this.value,
    name: name,
    age: age
  }
}
var value = 4;
bar.call2(null);
console.log(bar3.call2(obj, 'kevin', 18)); */