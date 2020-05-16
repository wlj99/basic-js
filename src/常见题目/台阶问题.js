// 运用递归计算有n个台阶，每次只能走1，2步，共有多少种走法。
let haveSolvedList = {}

function f(n) {
  if (n === 1) return 1
  if (n === 2) return 2
  let ret = f(n - 1) + f(n - 2)
  // 运用散列表来存储已求解值, 避免重复计算
  if (haveSolvedList[n]) {
    return haveSolvedList[n]
  }
  haveSolvedList[n] = ret
  return ret
}
console.log(f(32)) //3524578

// 非递归迭代写法, 其实这种写法本质未变，是手动模拟了递归过程
function ff(n) {
  if (n === 1) return 1
  if (n === 2) return 2
  let ret = 0
  let prepre = 1
  let pre = 2
  for (let i = 3; i <= n; i++) {
    ret = pre + prepre
    prepre = pre
    pre = ret
  }
  return ret
}

console.log(ff(32)) //3524578