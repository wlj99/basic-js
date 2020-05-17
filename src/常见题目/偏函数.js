/* 局部应用则是固定一个函数的一个或者多个参数，也就是将一个 n 元函数转换成一个 n - x 元函数 */

function partial(fn) {
  var args = [].slice.call(arguments, 1);
  return function () {
    var newArgs = args.concat([].slice.call(arguments));
    return fn.apply(this, newArgs);
  };
};


var _ = {};

function partial(fn) {
  var args = [].slice.call(arguments, 1);
  return function () {
    var position = 0,
      len = args.length;
    for (var i = 0; i < len; i++) {
      args[i] = args[i] === _ ? arguments[position++] : args[i]
    }
    while (position < arguments.length) args.push(arguments[position++]);
    return fn.apply(this, args);
  };
};