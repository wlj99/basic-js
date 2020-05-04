let arr = [1, 2, 3, 4]
arr.test = 5;
for (let i of arr) {
  console.log(i); // 1 2 3 4 数组value
}

for (let i in arr) {
  console.log(i); // 0 1 2 3 test 数组index 
}

let obj = {
  a: 1,
  b: 2,
  c: 3
}

obj.d = 4;
for (let i of obj) {
  console.log(i); // 报错  obj is not iterable
}

for (let i in obj) {
  console.log(i); // a b c d  obj对应的key值
}

/* 
  for of 获取一对键值中的值  必须具有迭代器属性 
    具有迭代器属性的：   Array  String  Map  Set  argument  Nodelist


  for in 获取一对键值中的key 
    遍历当前 key 还会遍历原型以及手动添加的key值
    针对数组 可枚举属性 返回对应下标
    对于对象 返回键值 
 */