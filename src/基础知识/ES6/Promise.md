# Promse

1. 基础介绍

   Promise 是异步编程的一种解决方案，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。

   有以下两个特点：

   - 对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

   - 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise 对象的状态改变，只有两种可能：从 pending 变为 fulfilled 和从 pending 变为 rejected。

   缺点：

   - 无法取消 Promise，一旦新建它就会立即执行，无法中途取消。

   - 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。

   - 当处于 pending 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

2. 基础用法

   ES6 规定，Promise 对象是一个构造函数，用来生成 Promise 实例，实例生成以后，可以用 then 方法分别指定 resolved 状态和 rejected 状态的回调函数。

   ```js
   const promise = new Promise(function(resolve, reject) {
     // ... some code

     if (/* 异步操作成功 */){
       resolve(value);
     } else {
       reject(error);
     }
   });

   promise.then(function(value) {
      // success
    }, function(error) {
      // failure
    });

   ```

   Promise 新建后就会立即执行

   ```js
   let promise = new Promise(function (resolve, reject) {
     console.log("Promise");
     resolve();
   });

   promise.then(function () {
     console.log("resolved.");
   });

   console.log("Hi!"); // Promise  Hi!  resolved
   ```

   异步加载图片

   ```js
   function loadImageAsync(url) {
     return new Promise(function (resolve, reject) {
       const image = new Image();

       image.onload = function () {
         resolve(image);
       };

       image.onerror = function () {
         reject(new Error("Could not load image at " + url));
       };

       image.src = url;
     });
   }
   ```

3. Promise.prototype.then()

   第一个参数是 resolved 状态的回调函数，第二个参数（可选）是 rejected 状态的回调函数。

4. Promise.prototype.catch()

   是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数

5. Promise.prototype.finally()

   指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

6. Promise.all()

   用于将多个 Promise 实例，包装成一个新的 Promise 实例

   `const p = Promise.all([p1, p2, p3]);`

   Promise.all()方法接受一个数组作为参数，p1、p2、p3 都是 Promise 实例，如果不是，就会先调用 Promise.resolve 方法，将参数转为 Promise 实例，再进一步处理。另外，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

   p 的状态由 p1、p2、p3 决定，分成两种情况：

   - 只有 p1、p2、p3 的状态都变成 fulfilled，p 的状态才会变成 fulfilled，此时 p1、p2、p3 的返回值组成一个数组，传递给 p 的回调函数。

   - 只要 p1、p2、p3 之中有一个被 rejected，p 的状态就变成 rejected，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数。

   ```js
   // 生成一个Promise对象的数组
   const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
     return getJSON("/post/" + id + ".json");
   });

   Promise.all(promises)
     .then(function (posts) {
       // ...
     })
     .catch(function (reason) {
       // ...
     });
   ```

   ```js
   const databasePromise = connectDatabase();

   const booksPromise = databasePromise.then(findAllBooks);

   const userPromise = databasePromise.then(getCurrentUser);

   Promise.all([booksPromise, userPromise]).then(([books, user]) =>
     pickTopRecommendations(books, user)
   );
   ```

   注意，如果作为参数的 Promise 实例，定义了 catch 方法，那么它一旦被 rejected，并不会触发 Promise.all()的 catch 方法。

   ```js
   const p1 = new Promise((resolve, reject) => {
     resolve("hello");
   })
     .then((result) => result)
     .catch((e) => e);

   const p2 = new Promise((resolve, reject) => {
     throw new Error("报错了");
   })
     .then((result) => result)
     .catch((e) => e);

   Promise.all([p1, p2])
     .then((result) => console.log(result))
     .catch((e) => console.log(e));
   // ["hello", Error: 报错了]
   ```

7. Promise.race()
