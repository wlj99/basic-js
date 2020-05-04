# let const

## let 基础用法

`let a = 1`

```js
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```

变量 i 是 var 命令声明的，在全局范围内都有效，所以全局只有一个变量 i。每一次循环，变量 i 的值都会发生改变，而循环内被赋给数组 a 的函数内部的 console.log(i)，里面的 i 指向的就是全局的 i。也就是说，所有数组 a 的成员里面的 i，指向的都是同一个 i，导致运行时输出的是最后一轮的 i 的值，也就是 10

```js
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

变量 i 是 let 声明的，当前的 i 只在本轮循环有效，所以每一次循环的 i 其实都是一个新的变量，所以最后输出的是 6

注意 ⚠️

1. 不存在变量提升

```js
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

2. 暂时性死区 只要块级作用域内存在 let 命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响

```js
var tmp = 123;

if (true) {
  tmp = "abc"; // ReferenceError
  let tmp;
}
```

上面代码中，存在全局变量 tmp，但是块级作用域内 let 又声明了一个局部变量 tmp，导致后者绑定这个块级作用域，所以在 let 声明变量前，对 tmp 赋值会报错

---

ES6 明确规定，如果区块中存在 let 和 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
总之，在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

> “暂时性死区”也意味着 typeof 不再是一个百分之百安全的操作

3. 不允许重复声明 （不允许在相同作用域内，重复声明同一个变量）

## 块级作用域

注意 ⚠️ ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域

```js
// 第一种写法，报错
if (true) let x = 1;

// 第二种写法，不报错
if (true) {
  let x = 1;
}
```

```js
// 不报错
"use strict";
if (true) {
  function f() {}
}

// 报错
("use strict");
if (true) function f() {}
```

严格模式下，函数只能声明在当前作用域的顶层

## const 变量

`const PI = 3.1415;`

注意 一旦声明 必须初始化

const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const 只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。

## ES6 声明变量的六种方式

`var function let const import class`

顶层对象，在浏览器环境指的是 window 对象，在 Node 指的是 global 对象。ES5 之中，顶层对象的属性与全局变量是等价的。
ES6 规定： var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性；let 命令、const 命令、class 命令声明的全局变量，不属于顶层对象的属性

- 全局环境中，this 会返回顶层对象。但是，Node 模块和 ES6 模块中，this 返回的是当前模块。
- 函数里面的 this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this 会指向顶层对象。但是，严格模式下，这时 this 会返回 undefined。
- 不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么 eval、new Function 这些方法都可能无法使用
