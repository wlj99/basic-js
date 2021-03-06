# this

> 代表函数调用相关联的对象，通常也称之为执行上下文

1. 作为函数直接调用，非严格模式 window 严格模式 undefined

```js
function foo() {
  console.log(this); //// window
}
foo();

// 严格模式
("use strict");
function foo() {
  console.log(this); // undefined
}
foo();
```

2. 作为某对象的方法调用，this 通常指向调用的对象

```js
let foo = {
  bar: function () {
    console.log(this); // foo : { bar : f()}
  },
};

foo.bar();
```

3. 使用 apply、call、bind 可以绑定 this 的指向

> 不管给函数 bind 几次，函数中的 this 永远由第一次 bind 决定

```js
let a = {};
let fn = function () {
  console.log(this); //  a {}
};
fn.bind(a)();

let a = {};
let fn = function () {
  console.log(this); // window
};

fn.bind().bind(a)();
```

4. 在构造函数中，this 指向新创建的对象

```js
function Foo() {
  this.name = "hi";
  console.log(this); // Foo  { name: "hi" }
}
new Foo();
```

5. 箭头函数没有单独的 this 值，this 在箭头函数创建时确定，它与声明所在的上下文相同

```js
let a = {
  b: function () {
    console.log(this); // a: { b : f(), c: f()}
  },
  c: () => {
    console.log(this); // window
  },
};
a.b();
a.c();
```

```js
var name1 = 1;

function test() {
  let name1 = "kin";
  let a = {
    name1: "jack",
    fn: () => {
      var name1 = "black";
      console.log(this.name1);
    },
  };
  return a;
}

test().fn(); // 1
```

```js
var name1 = 1;

function test() {
  let name1 = "kin";
  let a = {
    name1: "jack",
    fn: function () {
      let b = () => {
        var name1 = "black";
        console.log(this); // a : { name1:'jack', fn : f()}
        console.log(this.name1);
      };
      return b;
    },
  };
  return a;
}

test().fn()(); // jack
```

```js
(function () {
  console.log(this); // window
})();

(() => {
  console.log(this); // window
})();
```

```js
function foo() {
  let a = {
    num: 0,
    fn: function () {
      console.log("first", this); // a: { num :0 , fn: f() }
      (function () {
        console.log("second", this); // window
      })();
      (() => {
        console.log("third", this); // a: { num :0 , fn: f() }
      })();
    },
  };
  return a;
}

foo().fn();

function foo() {
  let a = {
    num: 0,
    fn: function () {
      console.log("first", this);
    },
  };
  return a;
}
let a = foo().fn();
```

> 注意 ⚠️ 箭头函数的 this 一旦被绑定，就不会再被任何方式所改变

- 多个 this 规则出现时，this 最终指向
  - new 的方式优先级最高
  - 接下来是 bind 这些函数，
  - 然后是 obj.foo() 这种调用方式，
  - 最后是 foo 这种调用方式
