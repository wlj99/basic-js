# Proxy

1. 基础

   Proxy 用于修改某些操作的默认行为

   ```js
   var obj = new Proxy(
     {},
     {
       get: function (target, propKey, receiver) {
         console.log(`getting ${propKey}!`);
         return Reflect.get(target, propKey, receiver);
       },
       set: function (target, propKey, value, receiver) {
         console.log(`setting ${propKey}!`);
         return Reflect.set(target, propKey, value, receiver);
       },
     }
   );

   // 对一个空对象架设了一层拦截，重定义了属性的读取（get）和设置（set）行为

   obj.count = 1; //  setting count!
   ++obj.count; //  getting count!    setting count!   2

   // Proxy 实际上重载（overload）了点运算符，即用自己的定义覆盖了语言的原始定义
   ```

   ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例

   `var proxy = new Proxy(target, handler);`

   new Proxy()表示生成一个 Proxy 实例，target 参数表示所要拦截的目标对象，handler 参数也是一个对象，用来定制拦截行为

   ```js
   var proxy = new Proxy(
     {},
     {
       get: function (target, propKey) {
         return 35;
       },
     }
   );

   proxy.time; // 35
   proxy.name; // 35
   proxy.title; // 35
   ```

   注意 ⚠️，要使得 Proxy 起作用，必须针对 Proxy 实例（上例是 proxy 对象）进行操作，而不是针对目标对象（上例是空对象）进行操作

   ```js
   var target = {};
   var handler = {};
   var proxy = new Proxy(target, handler);
   proxy.a = "b";
   target.a; // "b"

   // handler是一个空对象，没有任何拦截效果，访问proxy就等同于访问target
   ```

   技巧是将 Proxy 对象，设置到 object.proxy 属性，从而可以在 object 对象上调用

   `var object = { proxy: new Proxy(target, handler) };`

   Proxy 实例也可以作为其他对象的原型对象

   ```js
   var proxy = new Proxy(
     {},
     {
       get: function (target, propKey) {
         return 35;
       },
     }
   );

   let obj = Object.create(proxy);
   obj.time; // 35

   // proxy对象是obj对象的原型，obj对象本身并没有time属性，所以根据原型链，会在proxy对象上读取该属性，导致被拦截
   ```

   同一个拦截器函数，可以设置拦截多个操作

   ```js
   var handler = {
     get: function (target, name) {
       if (name === "prototype") {
         return Object.prototype;
       }
       return "Hello, " + name;
     },

     apply: function (target, thisBinding, args) {
       return args[0];
     },

     construct: function (target, args) {
       return { value: args[1] };
     },
   };

   var fproxy = new Proxy(function (x, y) {
     return x + y;
   }, handler);

   fproxy(1, 2); // 1 实际调用apply方法
   new fproxy(1, 2); // {value: 2} 通过构造函数 获取结果
   fproxy.prototype === Object.prototype; // true
   fproxy.foo === "Hello, foo"; // true
   ```

2. Proxy 支持的拦截操作一览，一共 13 种

   - get(target, propKey, receiver)：拦截对象属性的读取，比如 proxy.foo 和 proxy['foo']

     get 方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选

     ```js
     var person = {
       name: "张三",
     };

     var proxy = new Proxy(person, {
       get: function (target, propKey) {
         if (propKey in target) {
           return target[propKey];
         } else {
           throw new ReferenceError(
             'Prop name "' + propKey + '" does not exist.'
           );
         }
       },
     });

     proxy.name; // "张三"
     proxy.age; // 抛出一个错误

     person.name; // "张三"
     person.age; //undefined

     // 做了拦截的是返回的proxy实例，而不是 person对象自身
     ```

     get 方法可以继承

     ```js
     let proto = new Proxy(
       {},
       {
         get(target, propertyKey, receiver) {
           console.log("GET " + propertyKey);
           return target[propertyKey];
         },
       }
     );

     let obj = Object.create(proto);
     obj.foo; // "GET foo"
     ```

     如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错

     ```js
     const target = Object.defineProperties(
       {},
       {
         foo: {
           value: 123,
           writable: false,
           configurable: false,
         },
       }
     );

     const handler = {
       get(target, propKey) {
         return "abc";
       },
     };

     const proxy = new Proxy(target, handler);

     proxy.foo; // TypeError: Invariant check failed
     ```

   - set(target, propKey, value, receiver)：拦截对象属性的设置，比如 proxy.foo = v 或 proxy['foo'] = v，返回一个布尔值

     可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选

     ```js
     let validator = {
       set: function (obj, prop, value) {
         if (prop === "age") {
           if (!Number.isInteger(value)) {
             throw new TypeError("The age is not an integer");
           }
           if (value > 200) {
             throw new RangeError("The age seems invalid");
           }
         }

         // 对于满足条件的 age 属性以及其他属性，直接保存
         obj[prop] = value;
       },
     };

     let person = new Proxy({}, validator);

     person.age = 100;

     person.age; // 100
     person.age = "young"; // 报错
     person.age = 300; // 报错
     ```

     注意，如果目标对象自身的某个属性，不可写且不可配置，那么 set 方法将不起作用。

     注意，严格模式下，set 代理如果没有返回 true，就会报错。

   - has(target, propKey)：拦截 propKey in proxy 的操作，返回一个布尔值

     has 方法用来拦截 HasProperty 操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是 in 运算符，接受两个参数，分别是目标对象、需查询的属性名

     ```js
     var handler = {
       has(target, key) {
         if (key[0] === "_") {
           return false;
         }
         return key in target;
       },
     };
     var target = { _prop: "foo", prop: "foo" };
     var proxy = new Proxy(target, handler);
     "_prop" in proxy; // false
     ```

     - 如果原对象不可配置或者禁止扩展， has 拦截会报错。

     - has 方法拦截的是 HasProperty 操作，而不是 HasOwnProperty 操作，即 has 方法不判断一个属性是对象自身的属性，还是继承的属性。

     - 虽然 for...in 循环也用到了 in 运算符，但是 has 拦截对 for...in 循环不生效。

       ```js
       let stu1 = { name: "张三", score: 59 };
       let stu2 = { name: "李四", score: 99 };

       let handler = {
         has(target, prop) {
           if (prop === "score" && target[prop] < 60) {
             console.log(`${target.name} 不及格`);
             return false;
           }
           return prop in target;
         },
       };

       let oproxy1 = new Proxy(stu1, handler);
       let oproxy2 = new Proxy(stu2, handler);

       "score" in oproxy1; // 张三 不及格  false

       "score" in oproxy2; // true

       for (let a in oproxy1) {
         console.log(oproxy1[a]); // 张三   59
       }

       for (let b in oproxy2) {
         console.log(oproxy2[b]); //  李四 99
       }
       ```

   - deleteProperty(target, propKey)：拦截 delete proxy[propKey]的操作，返回一个布尔值

     deleteProperty 方法用于拦截 delete 操作，如果这个方法抛出错误或者返回 false，当前属性就无法被 delete 命令删除。

     ```js
     var handler = {
       deleteProperty(target, key) {
         invariant(key, "delete");
         delete target[key];
         return true;
       },
     };
     function invariant(key, action) {
       if (key[0] === "_") {
         throw new Error(
           `Invalid attempt to ${action} private "${key}" property`
         );
       }
     }

     var target = { _prop: "foo" };
     var proxy = new Proxy(target, handler);
     delete proxy._prop;
     ```

     注意，目标对象自身的不可配置（configurable）的属性，不能被 deleteProperty 方法删除

   - ownKeys(target)：拦截 Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in 循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 Object.keys()的返回结果仅包括目标对象自身的可遍历属性

     用来拦截对象自身属性的读取操作，具体拦截以下操作：

     - Object.getOwnPropertyNames()

     - Object.getOwnPropertySymbols()

     - Object.keys()

     ```js
     let target = {
       a: 1,
       b: 2,
       c: 3,
     };

     let handler = {
       ownKeys(target) {
         return ["a"];
       },
     };

     let proxy = new Proxy(target, handler);

     Object.keys(proxy); // [ 'a' ]
     ```

     注意，使用 Object.keys 方法时，有三类属性会被 ownKeys 方法自动过滤，不会返回：

     - 目标对象上不存在的属性

     - 属性名为 Symbol 值

     - 不可遍历（enumerable）的属性

     for...in 循环也受到 ownKeys 方法的拦截

     ownKeys 方法返回的数组成员，只能是字符串或 Symbol 值。如果有其他类型的值，或者返回的根本不是数组，就会报错

     如果目标对象自身包含不可配置的属性，则该属性必须被 ownKeys 方法返回

     ```js
     var obj = {};
     Object.defineProperty(obj, "a", {
       configurable: false,
       enumerable: true,
       value: 10,
     });

     var p = new Proxy(obj, {
       ownKeys: function (target) {
         return ["b"];
       },
     });

     Object.getOwnPropertyNames(p); // Uncaught TypeError: 'ownKeys' on proxy: trap result did not include 'a'
     ```

     如果目标对象是不可扩展的（non-extensible），这时 ownKeys 方法返回的数组之中，必须包含原对象的所有属性，且不能包含多余的属性

   - getOwnPropertyDescriptor(target, propKey)：拦截 Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象或者 undefined

     ```js
     var handler = {
       getOwnPropertyDescriptor(target, key) {
         if (key[0] === "_") {
           return;
         }
         return Object.getOwnPropertyDescriptor(target, key);
       },
     };
     var target = { _foo: "bar", baz: "tar" };
     var proxy = new Proxy(target, handler);
     Object.getOwnPropertyDescriptor(proxy, "wat"); // undefined
     Object.getOwnPropertyDescriptor(proxy, "_foo"); // undefined
     Object.getOwnPropertyDescriptor(proxy, "baz"); // { value: 'tar', writable: true, enumerable: true, configurable: true }
     ```

   - defineProperty(target, propKey, propDesc)：拦截 Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值

     ```js
     var handler = {
       defineProperty(target, key, descriptor) {
         return false;
       },
     };
     var target = {};
     var proxy = new Proxy(target, handler);
     proxy.foo = "bar"; // 不会生效

     //上面代码中，defineProperty方法返回false，导致添加新属性总是无效
     ```

     注意，如果目标对象不可扩展（non-extensible），则 defineProperty 不能增加目标对象上不存在的属性，否则会报错。

     另外，如果目标对象的某个属性不可写（writable）或不可配置（configurable），则 defineProperty 方法不得改变这两个设置。

   - preventExtensions(target)：拦截 Object.preventExtensions(proxy)，返回一个布尔值

     只有目标对象不可扩展时（即 Object.isExtensible(proxy)为 false），proxy.preventExtensions 才能返回 true

     ```js
     var proxy = new Proxy(
       {},
       {
         preventExtensions: function (target) {
           console.log("called");
           Object.preventExtensions(target); // 没有这个 会报错 proxy.preventExtensions方法返回true，Object.isExtensible(proxy)会返回true
           return true;
         },
       }
     );

     Object.preventExtensions(proxy); // "called"  Proxy {}
     ```

   - getPrototypeOf(target)：拦截 Object.getPrototypeOf(proxy)，返回一个对象

     主要用来拦截获取对象原型。具体来说，拦截下面这些操作：

     - `Object.prototype.__proto__`
     - Object.prototype.isPrototypeOf()
     - Object.getPrototypeOf()
     - Reflect.getPrototypeOf()
     - instanceof

     ```js
     var proto = {};
     var p = new Proxy(
       {},
       {
         getPrototypeOf(target) {
           return proto;
         },
       }
     );
     Object.getPrototypeOf(p) === proto; // true
     ```

     注意，getPrototypeOf 方法的返回值必须是对象或者 null，否则报错。另外，如果目标对象不可扩展（non-extensible）， getPrototypeOf 方法必须返回目标对象的原型对象。

   - isExtensible(target)：拦截 Object.isExtensible(proxy)，返回一个布尔值

     ```js
     var p = new Proxy(
       {},
       {
         isExtensible: function (target) {
           console.log("called");
           return true;
         },
       }
     );

     Object.isExtensible(p); // "called" true
     ```

     注意，该方法只能返回布尔值，否则返回值会被自动转为布尔值。

     它的返回值必须与目标对象的 isExtensible 属性保持一致

     `Object.isExtensible(proxy) === Object.isExtensible(target)`

   - setPrototypeOf(target, proto)：拦截 Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截

     ```js
     var handler = {
       setPrototypeOf(target, proto) {
         throw new Error("Changing the prototype is forbidden");
       },
     };
     var proto = {};
     var target = function () {};
     var proxy = new Proxy(target, handler);
     Object.setPrototypeOf(proxy, proto); // Error: Changing the prototype is forbidden
     ```

     注意，该方法只能返回布尔值，否则会被自动转为布尔值。另外，如果目标对象不可扩展（non-extensible），setPrototypeOf 方法不得改变目标对象的原型。

   - apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如 proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)

     apply 方法拦截函数的调用、call 和 apply 操作。可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。

     ```js
     var handler = {
       apply(target, ctx, args) {
         return Reflect.apply(...arguments);
       },
     };
     ```

     ```js
     var target = function () {
       return "I am the target";
     };
     var handler = {
       apply: function () {
         return "I am the proxy";
       },
     };

     var p = new Proxy(target, handler);

     p(); // "I am the proxy"
     ```

     ```js
     var twice = {
       apply(target, ctx, args) {
         return Reflect.apply(...arguments) * 2;
       },
     };
     function sum(left, right) {
       return left + right;
     }
     var proxy = new Proxy(sum, twice);
     proxy(1, 2); // 6
     proxy.call(null, 5, 6); // 22
     proxy.apply(null, [7, 8]); // 30

     // 每当执行proxy函数（直接调用或call和apply调用），就会被apply方法拦截

     Reflect.apply(proxy, null, [9, 10]); // 38
     // 直接调用Reflect.apply方法，也会被拦截
     ```

   - construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)

     用于拦截 new 命令， 可以接受三个参数：target 目标对象 arg 构造函数的参数对象 newTarge 创造实例对象时，new 命令作用的构造函数

     ```js
     var p = new Proxy(function () {}, {
       construct: function (target, args) {
         console.log("called: " + args.join(", "));
         return { value: args[0] * 10 };
       },
     });

     new p(1).value; // "called: 1"   10
     ```

     construct 方法返回的必须是一个对象

3. Proxy.revocable() 返回一个可取消的 Proxy 实例

   ```js
   let target = {};
   let handler = {};

   let { proxy, revoke } = Proxy.revocable(target, handler);

   proxy.foo = 123;
   proxy.foo; // 123

   revoke();
   proxy.foo; // TypeError: Revoked
   ```

   一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问
