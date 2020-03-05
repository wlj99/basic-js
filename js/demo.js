
/* function Par(fn){
  return function (val) {
    return fn(val);
  };
}

let parse = Par(parseInt);
console.log(['1.1', '2', '0.3'].map(parse)); */

/* const p = Promise.resolve();

( async () => {
  await p;
  console.log('await');
})();

p.then( () => {
  console.log('then1')
}).then( () => {
  console.log('then2');
}) */

/* async function async1() {
  await async2();
  console.log('async1 end');
}

async function async2() {
  // return 'async2';
  return Promise.resolve('async2');
}

async1();

new Promise(function(resolve) {
  console.log('promise');
  resolve();
}).then(function() {
  console.log('Promise then');
}); */

/*   setTimeout(_ => console.log(6));

async function test() {
console.log(1);
// 我的理解是
// 遇到 await 先执行其同步内容
// 让出执行线程（跳出当前任务）同时推入微任务队列  继续往下执行
// 执行完之后 回来继续执行
await new Promise((resolve, reject) => {
console.log(2);
resolve();
}).then(_ => console.log(4));
// 这里 5 没有进入微任务队列 只不是相当于被挂起了
console.log(5);
}

test();
// test();

console.log(3); */

// Let's get hold of those elements
var outer = document.querySelector('.outer');
var inner = document.querySelector('.inner');

// Let's listen for attribute changes on the
// outer element
new MutationObserver(function() {
console.log('mutate');
}).observe(outer, {
attributes: true
});

// Here's a click listener…
function onClick() {
console.log('click');

setTimeout(function() {
console.log('timeout');
}, 0);

Promise.resolve().then(function() {
console.log('promise');
});

outer.setAttribute('data-random', Math.random());
}

// …which we'll attach to both elements
inner.addEventListener('click', onClick);
outer.addEventListener('click', onClick);

// inner.click();


/* async function async1() {
console.log('async1 start');//2
await async2();
console.log('async1 end');//6
}
async function async2() {
console.log('async2');//3
}
console.log('script start');//1
setTimeout(function() {
console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
console.log('promise1');//4
resolve();
}).then(function() {
console.log('promise2');//7
});
console.log('script end');//5 */


/* var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
function ArrStr(arr){
let temp = arr.flat(Infinity);
// let temp = flatArr(arr);
// console.log(temp);
temp = new Set(temp);
// console.log(temp);
temp = [...temp].sort( (a,b) =>{
return b-a;  
})

console.log(temp);
// return temp;
}

function flatArr(arr){
while( arr.some( item => Array.isArray(item))) {
 arr = [].concat(...arr);
}
return arr;
}
*/
// ArrStr(arr);


/* var a = 0
var b = () => {
Promise.resolve(10)
.then((r) => {
  a = a + r;
})
.then(() => {
  console.log('2', a)
})
}
b()
a++
console.log('1', a) */
/* 
var arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
var arr2 = ['A', 'B','C', 'D'];
let res = [...arr1,...arr2].sort().sort( (prev,next) => {
let reg = /([0-9]*)/;
if( prev && reg.test(prev) && prev.charCodeAt(0) === next.charCodeAt(0)) return -1;
}); */


// console.log(res);


/* for (let i = 0; i< 10; i++){
setTimeout(() => {
console.log(i);
}, 1000)
}

for (var i = 0; i< 10; i++){
let fn = function (i){
return setTimeout(() => {
  console.log(i);
}, 1000)
}(i);
} */

/* var b = 10;
(function b(){
let b = 20;
console.log(window.b); 
})();
*/

/*  var obj = {
'2': 3,
'3': 4,
'length': 0,
'splice': Array.prototype.splice,
'push': Array.prototype.push
}
console.log(obj);
obj.push(1)
obj.push(2)
console.log(obj) */

console.time();
let data = {1:222, 2:123, 5:888};
let arr = Array.from({length:12}).map((it,i)=> data[i+1]||null);
console.log(arr);
// default: 2.119873046875ms
console.timeEnd();

console.time()
let obj = {1:222, 2:123, 5:888};
let res = Array.from({length:12}).fill(null);
Object.keys(obj).forEach(it=>res[it-1] = obj[it]);
console.log(res);
// default: 0.7451171875ms
console.timeEnd();
