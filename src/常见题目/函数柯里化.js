/*柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术  */


var curry = function (fn) {
  // var args = [].slice.call(arguments, 1);
  let [, ..args] = arguments;
  return function () {
    // var newArgs = args.concat([].slice.call(arguments));
    return fn.apply(this, [..agrs, ...arguments]);
  };
};

function sub_curry(fn) {
  // var args = [].slice.call(arguments, 1);
  let [, ...args] = arguments;
  return function () {
    // return fn.apply(this, args.concat([].slice.call(arguments)));
    return fn.apply(this, [...args, arguments]);
  };
}

// 很难理解
function curry(fn, length) {

  length = length || fn.length;

  let slice = Array.prototype.slice;

  return function () {
    if (arguments.length < length) {
      var combined = [fn].concat(slice.call(arguments));
      return curry(sub_curry.apply(this, combined), length - arguments.length);
    } else {
      return fn.apply(this, arguments);
    }
  };
}

var fn = curry(function (a, b, c) {
  return [a, b, c];
});

fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]

function curry(fn, args) {
  let length = fn.length;

  args = args || [];

  return function () {

    var _args = args.slice(0),

      arg, i;

    for (i = 0; i < arguments.length; i++) {

      arg = arguments[i];

      _args.push(arg);

    }
    if (_args.length < length) {
      return curry.call(this, fn, _args);
    } else {
      return fn.apply(this, _args);
    }
  }
}