//如何让 (a == 1 && a == 2 && a == 3) 的值为true？
const a = {
  i: 1,
  // valueOf 也可达到相同效果
  toString: function () {
    return a.i++;
  }
}
a == 1 && a == 2 && a == 3; // true


let a = new Proxy({}, {
  i: 1,
  get: function () {
    return () => this.i++
  },
})