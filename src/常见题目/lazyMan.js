/* LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food */


class LazyMan{
  constructor(name){
    this.name = name;
    this.taskArray = [];
    this.init();
  };

  init(){
    console.log(`Hi I am ${this.name}`);
    setTimeout(() => {
      this.next();
    }, 0);
  };

  eat(param){
    let that = this;
    let fn = (function (param){
      
      return function (){
        console.log(`I am eating ${param}`);
        that.next();
      }
    })(param);

    this.taskArray.push(fn);
    return this;
  };

  sleep(timer){
    let that = this;
    let fn = (function (param) {
      return function (){
        setTimeout( () => {
          console.log(`等待了${param}秒...`)
          that.next();
        },param)
      }
    })(timer);

    this.taskArray.push(fn);
    return this;
  };

  sleepFirst(timer){

    let that = this;
    let fn = (function (param) {
      return function (){
        setTimeout( () => {
          console.log(`等待了${param}秒...`)
          that.next();
        },param)
      }
    })(timer);

    this.taskArray.unshift(fn);
    return this;
  };

  next () {
    let fn = this.taskArray.shift();
    // console.log(fn);
    fn && fn();
  }

}

class LazyManClass {
  constructor(name) {
    this.name = name
    this.queue = []
    console.log(`Hi I am ${name}`)
    setTimeout(() => {
      this.next()
    },0)
  }

  sleepFirst(time) {
    const fn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`)
        this.next()
      }, time)
    }
    this.queue.unshift(fn)
    return this
  }

  sleep(time) {
    const fn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`)
        this.next()
      },time)
    }
    this.queue.push(fn)
    return this
  }

  eat(food) {
    const fn = () => {
      console.log(`I am eating ${food}`)
      this.next()
    }
    this.queue.push(fn)
    return this
  }

  next() {
    const fn = this.queue.shift()
    fn && fn()
  }
}


function LazyManNew(name) {
  return new LazyMan(name);
};


function LazyManNew2(name) {
  return new LazyManClass(name)
}

// LazyManNew2('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(4).eat('junk food');
/*  let fn = (function (param) {
  // return function (){
    console.log(param);
  // }
})(123333); */

// 给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。

function  differ(a,b){
  let temp = a.length >= b.length ? a : b;
   return temp.filter( item => {
    return b.indexOf(item);
  })
}


let nums1 = [1, 2, 2, 1],nums2 = [2, 2];

// console.log(differ(nums1, nums2));

/* var a={}, b='123', c=123;  
a[b]='b';
a[c]='c';  
console.log(a[b]);

// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  
a[b]='b';
a[c]='c';  
console.log(a[b]);
// example 3
var a={}, b={key:'123'}, c={key:'456'};  
a[b]='b';
a[c]='c';  
console.log(a[b]); */

function rever(arr,len){
  while(len > 0){
    let temp = arr.pop();
    // console.log(temp ,arr);
    arr.unshift(temp);
    // console.log(temp ,arr);
    len --;
  }
  return arr;
}

let t = [1, 2, 3, 4, 5, 6, 7], k = 3;
// console.log(rever(t,k));

function add(...args){
  let sum = 0;
  args.forEach( item => sum += item );
  function next(...args) { 
    args.forEach( item => sum += item );
    return next;
   }

   next.toString = function () {
     return sum;
   }

   return next;
}

/* console.log(add(1)); 	// 1
console.log(add(1)(2));  	// 3
console.log(add(1)(2)(3));  // 6
console.log(add(1)(2, 3));   // 6
console.log(add(1, 2)(3));   // 6
console.log(add(1, 2, 3)); */

function hasTarget(obj,target){
  let res = {};
  let len = obj.length;
  for(let i=0;i<len;i++){
    let red = target - obj[i];
    if(i !== 0 || res[ obj[i]]){
        return [res[obj[i]], i];
    }
    res[red] = i;
  }
}

let nums = [2, 7, 11, 15], target = 9;
// console.log(hasTarget(nums,target));


const convert = list => {
  let map = new Map();
  let result = []
  list.forEach(el => {
    map.set(el.id, el);
  });
  list.forEach(el => {
		let parent = map.get(el.parentId);
		if (!parent) {
			// parentId === 0
			el.children = []
			return 
		}
    if (parent.hasOwnProperty('children')) {
      parent.children.push(el);
    } else {
      parent['children'] = [];
      parent.children.push(el);
    }
	});
	for (let i = 0; i < list.length; i++) {
		const el = list[i];
		if (el.parentId === 0) {
			result.push(el)
		}
	}
	return result
};
let list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
];
// console.dir(convert(list));

function revese(str){
  if(str.length < 2 ){
    return str;
  }else {
    return str.toString().slice(-1) + revese(str.toString().slice(0, - 1));
  }

}

// let tt = 1234;
// console.log(revese(tt),typeof revese(tt));

/* function print(n){ 
  setTimeout(() => { 
    console.log(n); 
  }, Math.floor(Math.random()+1) * 1000); } 
  
for(var i = 0; i < 100; i++){ 
  print(i); 
}
 */

 function getArr(str,target){
   if(!str || !target )  return;
   let idx  = str.indexOf(target);
   let res = [];
   console.log(idx);
   if(idx){
     let temp = str.slice(idx,-1);
     console.log(temp);
     temp = temp.split('&')[0].split('=')[1];
     if(temp){
       temp = temp.split(',');
        res = [...temp];
     }

   }
   return res;
 }

//  let href = 'https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33';
//  let href = 'https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800&local_province_id=33';
let href = 'https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33';
 console.log(getArr(href,'elective'));