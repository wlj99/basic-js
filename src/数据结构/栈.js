/* 最小栈（包含getMin函数的栈） */

class maxStack {
  constructor() {
    this.stack = [];
    this.min = null;
  }

  push(val) {
    if (!this.stack.length) this.min = val;
    this.min = Math.min(val, this.min);
    this.stack.push(val);
  }

  pop() {
    if (!this.stack.length) return null;
    let temp = this.stack.pop();
    this.min = Math.min(...this.stack);
    return temp;
  }
  // 获取栈顶元素 不出栈
  top() {
    if (!this.stack.length) return null;
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.min;
  }
}

/* 有效的括号 */

function isValid(str) {
  let map = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  let stack = [];
  for (let key of str) {
    if (map[key]) {
      stack.push(key);
    } else if (key !== map[stack.pop()]) {
      return false;
    }
  }
  return stack.length === 0;
}

console.log(isValid('{{}'))

/* 删除字符串中的所有相邻重复项 */

function removeDup(str) {
  let stack = [];
  for (let key of str) {
    let temp = stack.pop();
    if (temp !== key) {
      stack.push(temp, key);
    }
  }
  return stack.join('');
}

/* 删除字符串中的所有相邻重复项 k 
遍历字符串依次入栈，入栈时，判断当前元素与栈头元素是否一致，如果不一致则入栈，
如果一致，判断栈头字符是否长度为 k - 1 ，如果为 k-1 ，
即加入该字符时，满足连续相同字符 k 个，
此时，需要栈头出栈，当前字符不进栈，
如果小于 k-1 ，则取出栈头字符，加上当前字符，重新入栈

*/

function removeDup(str, k) {
  let stack = [];
  for (let key of str) {
    let prev = stack.pop();
    if (!prev || prev[0] !== key) {
      stack.push(prev, key);
    } else if (prev.length < k - 1) {
      stack.push(prev + key);
    }
  }

  return stack.join('')
}