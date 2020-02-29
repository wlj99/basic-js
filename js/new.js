function newCreat(obj){
  let o = {};
  o.call(obj,arguments);
  o.__proto__ = obj.prototype;
  return new o();
}