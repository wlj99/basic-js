// 1.以下结果中，返回true的是
null === undefined; //false
[] == '' // true
!![] // true
!!'' //false


//2.实现函数 使fn只能小于n次
function before(n, fn) {

}

let vote = before(3, function () {
  console.log('vote success');
})

vote(); // vote success
vote(); // vote success
vote();
vote();

//3.以下代码会输出什么结果 ? why?
function getFn() {
  var ret = [];
  for (var i = 0; i < 3; i++) {
    ret.push(function () {
      return i;
    })
  }
  return ret;
}

var arr = getFn();
console.log(arr[0]() + arr[1]()); // 6   ？var 定义的i  会变量申明提升