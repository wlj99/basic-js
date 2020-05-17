/* 惰性函数就是解决每次都要进行判断的这个问题，解决原理很简单，重写函数 */

// 需要写一个 foo 函数，这个函数返回首次调用时的 Date 对象，注意是首次

var t;

function foo() {
  if (t) return t;
  t = new Date()
  return t;
}
// 一是污染了全局变量，二是每次调用 foo 的时候都需要进行一次判断

var foo = (function () {
  var t;
  return function () {
    if (t) return t;
    t = new Date();
    return t;
  }
})();

function foo() {
  if (foo.t) return foo.t;
  foo.t = new Date();
  return foo.t;
}

var foo = function () {
  var t = new Date();
  foo = function () {
    return t;
  };
  return foo();
};

// 应用 当我们每次都需要进行条件判断，其实只需要判断一次，接下来的使用方式都不会发生改变的时候，想想是否可以考虑使用惰性函数。

// DOM 事件添加中，为了兼容现代浏览器和 IE 浏览器，我们需要对浏览器环境进行一次判断：
function addEvent(type, el, fn) {
  if (window.addEventListener) {
    el.addEventListener(type, fn, false);
  } else if (window.attachEvent) {
    el.attachEvent('on' + type, fn);
  }
}


function addEvent(type, el, fn) {
  if (window.addEventListener) {
    el.addEventListener(type, fn, false);
    addEvent = function (type, el, fn) {
      el.addEventListener(type, fn, false);
    }
  } else if (window.attachEvent) {
    el.attachEvent('on' + type, fn);
    addEvent = function (type, el, fn) {
      el.attachEvent('on' + type, fn);
    }
  }
}

var addEvent = (function () {
  if (window.addEventListener) {
    return function (type, el, fn) {
      el.addEventListener(type, fn, false);
    }
  } else if (window.attachEvent) {
    return function (type, el, fn) {
      el.attachEvent('on' + type, fn);
    }
  }
})();