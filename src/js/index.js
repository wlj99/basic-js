 // 原数组 const arr = ['a', '-', 1, 3.1, 'bb', '*', 33, 100, 0, '**']; 
 // 求返回值 const result = [1, 3.1, 33, 100, 0, 'a', '-', 'bb', '*', '**']；

 function setArr(arr) {
   let res = [],
     end = [];
   arr.filter((item, idx) => {
     typeof item === 'number' ? res.push(item) : end.push(item);
   })

   return [...res, ...end]
 }

 let a = ['a'];
 a.push(...['b', 'c', 'd']);
 a.splice(1, 1);
 console.log(a); // a,c,d