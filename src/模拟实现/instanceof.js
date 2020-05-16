function myInstanceof(left, right) {
  let leftProp = left.__proto__;
  let rightProp = right.prototype;
  while (true) {
    if (leftProp === null) return false;

    if (leftProp === rightProp) {
      return true;
    } else {
      leftProp = leftProp.__proto__;
    }
  }
}

let a = [];
console.log(myInstanceof(a, Array));