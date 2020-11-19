function passthru(literals, ...substitutions) {
  let result = "";
  console.log(literals);
  console.log(substitutions);
  // 仅使用 substitution 的元素数量来进行循环 
  for (let i = 0; i < substitutions.length; i++) {
    result += literals[i];
    result += substitutions[i];
  }
  // 添加最后一个字面量 
  result += literals[literals.length - 1];
  return result;
}
let count = 10,
  price = 0.25,
  message = passthru `${count} items cost $${(count * price).toFixed(2)}.`;
console.log(message);