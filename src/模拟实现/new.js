/* new被调用后做了三件事情:

让实例可以访问到私有属性
让实例可以访问构造函数原型(constructor.prototype)所在原型链上的属性
如果构造函数返回的结果不是引用数据类型 */

function objectFactory() {

  let obj = new Object(),
    Constructor = [].shift.call(arguments);

  obj.__proto__ = Constructor.prototype;
  Constructor.apply(obj, arguments);

  return obj;

};

function objectFactory() {

  let obj = new Object(),
    Constructor = [].shift.call(arguments);

  obj.__proto__ = Constructor.prototype;

  let ret = Constructor.apply(obj, arguments);

  return typeof ret === 'object' ? ret : obj;

};

function newOperator(ctor, ...args) {
  if (typeof ctor !== 'function') {
    throw 'newOperator function the first param must be a function';
  }
  let obj = Object.create(ctor.prototype);
  let res = ctor.apply(obj, args);

  let isObject = typeof res === 'object' && res !== null;
  let isFunction = typeof res === 'function';
  return isObect || isFunction ? res : obj;
};

// Object.create
function create(proto) {
  function F() {}
  F.prototype = proto;

  return new F();
}