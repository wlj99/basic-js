//concat 和 slice 是一种浅拷贝
/* 
  数组元素是基本类型，拷贝一份，互不影响，
  数组元素是对象或者数组，会只拷贝对象和数组的引用，
  无论是新/旧数组进行修改，两者都会发生变化
  把这种复制引用的拷贝方法称之为浅拷贝
  
  深拷贝，深拷贝就是指完全的拷贝一个对象，即使嵌套了对象，
  两者也相互分离，修改一个对象的属性，不会影响另一个 
*/

//浅拷贝
function shallowCopy(obj){
  if(typeof obj !== 'object') return obj;
  let  newObj = obj instanceof Array  ? [] :{};
  for(let key in obj ){
    if( obj.hasOwnProperty(key)) newObj[key] = obj[key];
  } 
  return newObj;
}

//深拷贝
//方案一:JSON.parse( JSON.stringify( source) )可以拷贝对象/数组（简单粗暴，不能拷贝函数）
let source = {
  a:{
    b:1
  }
}
let cp = JSON.parse( JSON.stringify( source) );
cp.a.b = 100;
console.log(source,cp);

//方案二：递归拷贝
function deepClone(obj){
  if(obj === null || typeof obj !== 'object') return obj;
  let res = obj instanceof Array ? [] : {};
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      let temp = obj[key];
      res[key] = typeof temp === 'object' ? deepClone(temp): temp;
    }
  }
  return res;
}

let arr = [
  function a(){
    console.log('aaaa');
  },
  function b(){
    console.log('bbbb')
  }
]

console.log(JSON.parse(JSON.stringify(arr)));//[null,null]
let arr2 = deepClone(arr);//[ a() ,b()]
arr2[0] = function c(){
  console.log('ccccc');
}
console.log(arr2,arr);// [c(), b()] ,[ a() ,b()]
