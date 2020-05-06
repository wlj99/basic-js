# Reflect

1. 基础介绍

   - 将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty），放到 Reflect 对象上。

   - 修改某些 Object 方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而 Reflect.defineProperty(obj, name, desc)则会返回 false

   ```js
   // 老写法
   try {
     Object.defineProperty(target, property, attributes);
     // success
   } catch (e) {
     // failure
   }

   // 新写法
   if (Reflect.defineProperty(target, property, attributes)) {
     // success
   } else {
     // failure
   }
   ```

   - 让 Object 操作都变成函数行为。某些 Object 操作是命令式，比如 name in obj 和 delete obj[name]，而 Reflect.has(obj, name)和 Reflect.deleteProperty(obj, name)让它们变成了函数行为

   ```js
   // 老写法
   "assign" in Object; // true

   // 新写法
   Reflect.has(Object, "assign"); // true
   ```

   - Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。

   ```js
   Proxy(target, {
     set: function (target, name, value, receiver) {
       var success = Reflect.set(target, name, value, receiver);
       if (success) {
         console.log("property " + name + " on " + target + " set to " + value);
       }
       return success;
     },
   });
   ```

   ```js
   // 老写法
   Function.prototype.apply.call(Math.floor, undefined, [1.75]); // 1

   // 新写法
   Reflect.apply(Math.floor, undefined, [1.75]); // 1
   ```

2. 静态方法 如果第一个参数不是对象，会报错。

   - Reflect.apply(target, thisArg, args) 等同于 Function.prototype.apply.call(func, thisArg, args)，用于绑定 this 对象后执行给定函数。

     一般来说，如果要绑定一个函数的 this 对象，可以这样写 fn.apply(obj, args)，但是如果函数定义了自己的 apply 方法，就只能写成 Function.prototype.apply.call(fn, obj, args)，采用 Reflect 对象可以简化这种操作。

     ```js
     const ages = [11, 33, 12, 54, 18, 96];

     // 旧写法
     const youngest = Math.min.apply(Math, ages);
     const oldest = Math.max.apply(Math, ages);
     const type = Object.prototype.toString.call(youngest);

     // 新写法
     const youngest = Reflect.apply(Math.min, Math, ages);
     const oldest = Reflect.apply(Math.max, Math, ages);
     const type = Reflect.apply(Object.prototype.toString, youngest, []);
     ```

   - Reflect.construct(target, args) 等同于 new target(...args)，提供了一种不使用 new，来调用构造函数的方法

     ```js
     function Greeting(name) {
       this.name = name;
     }

     // new 的写法
     const instance = new Greeting("张三");

     // Reflect.construct 的写法
     const instance = Reflect.construct(Greeting, ["张三"]);
     ```

   - Reflect.get(target, name, receiver) 查找并返回 target 对象的 name 属性，如果没有该属性，则返回 undefined

     ```js
     var myObject = {
       foo: 1,
       bar: 2,
       get baz() {
         return this.foo + this.bar;
       },
     };

     Reflect.get(myObject, "foo"); // 1
     Reflect.get(myObject, "bar"); // 2
     Reflect.get(myObject, "baz"); // 3

     var myReceiverObject = {
       foo: 4,
       bar: 4,
     };

     Reflect.get(myObject, "baz", myReceiverObject); // 8
     ```

     如果 name 属性部署了读取函数（getter），则读取函数的 this 绑定 receiver

     `Reflect.get(1, 'foo') // 报错`

   - Reflect.set(target, name, value, receiver) 设置 target 对象的 name 属性等于 value

     ```js
     var myObject = {
       foo: 1,
       set bar(value) {
         return (this.foo = value);
       },
     };

     myObject.foo; // 1

     Reflect.set(myObject, "foo", 2);
     myObject.foo; // 2

     Reflect.set(myObject, "bar", 3);
     myObject.foo; // 3

     var myReceiverObject = {
       foo: 0,
     };

     Reflect.set(myObject, "bar", 1, myReceiverObject);
     myObject.foo; // 3
     myReceiverObject.foo; // 1
     ```

     如果 name 属性设置了赋值函数，则赋值函数的 this 绑定 receiver

     注意，如果 Proxy 对象和 Reflect 对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，而且传入了 receiver，那么 Reflect.set 会触发 Proxy.defineProperty 拦截。

     ```js
     let p = {
       a: "a",
     };

     let handler = {
       set(target, key, value, receiver) {
         console.log("set");
         Reflect.set(target, key, value, receiver);
       },
       defineProperty(target, key, attribute) {
         console.log("defineProperty");
         Reflect.defineProperty(target, key, attribute);
       },
     };

     let obj = new Proxy(p, handler);
     obj.a = "A"; // set  defineProperty

     // Proxy.set的receiver参数总是指向当前的 Proxy实例
     ```

     `Reflect.set(1, 'foo', {}); // 报错`

   - Reflect.defineProperty(target, name, desc) 基本等同于 Object.defineProperty，用来为对象定义属性。

     ```js
     function MyDate() {
       /*…*/
     }

     // 旧写法
     Object.defineProperty(MyDate, "now", {
       value: () => Date.now(),
     });

     // 新写法
     Reflect.defineProperty(MyDate, "now", {
       value: () => Date.now(),
     });
     ```

   - Reflect.deleteProperty(target, name) 同于 `delete obj[name]`，用于删除对象的属性，返回一个布尔值。如果删除成功，或者被删除的属性不存在，返回 true；删除失败，被删除的属性依然存在，返回 false。

     ```js
     const myObj = { foo: "bar" };

     // 旧写法
     delete myObj.foo;

     // 新写法
     Reflect.deleteProperty(myObj, "foo");
     ```

   - Reflect.has(target, name) 对应 name in obj 里面的 in 运算符，第一个参数不是对象，会报错

     ```js
     var myObject = {
       foo: 1,
     };

     // 旧写法
     "foo" in myObject; // true

     // 新写法
     Reflect.has(myObject, "foo"); // true
     ```

   - Reflect.ownKeys(target) 用于返回对象的所有属性，基本等同于 Object.getOwnPropertyNames 与 Object.getOwnPropertySymbols 之和

     ```js
     var myObject = {
       foo: 1,
       bar: 2,
       [Symbol.for("baz")]: 3,
       [Symbol.for("bing")]: 4,
     };

     // 旧写法
     Object.getOwnPropertyNames(myObject); // ['foo', 'bar']

     Object.getOwnPropertySymbols(myObject); //[Symbol(baz), Symbol(bing)]

     // 新写法
     Reflect.ownKeys(myObject); // ['foo', 'bar', Symbol(baz), Symbol(bing)]
     ```

   - Reflect.isExtensible(target) 对应 Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展

     ```js
     const myObject = {};
     // 旧写法
     Object.isExtensible(myObject); // true
     // 新写法
     Reflect.isExtensible(myObject); // true
     ```

   - Reflect.preventExtensions(target) 对应 Object.preventExtensions 方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。

     ```js
     var myObject = {};

     // 旧写法
     Object.preventExtensions(myObject); // Object {}

     // 新写法
     Reflect.preventExtensions(myObject); // true
     ```

   - Reflect.getOwnPropertyDescriptor(target, name) 基本等同于 Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象

     ```js
     var myObject = {};
     Object.defineProperty(myObject, "hidden", {
       value: true,
       enumerable: false,
     });

     // 旧写法
     var theDescriptor = Object.getOwnPropertyDescriptor(myObject, "hidden");

     // 新写法
     var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, "hidden");
     ```

   - Reflect.getPrototypeOf(target) 用于读取对象的`__proto__`属性，对应 Object.getPrototypeOf(obj)

     ```js
     const myObj = new FancyThing();

     // 旧写法
     Object.getPrototypeOf(myObj) === FancyThing.prototype; // 如果参数不是对象，Object.getPrototypeOf会将这个参数转为对象，然后再运行

     // 新写法
     Reflect.getPrototypeOf(myObj) === FancyThing.prototype; // 如果参数不是对象，Reflect.getPrototypeOf会报错
     ```

   - Reflect.setPrototypeOf(target, prototype) 用于设置目标对象的原型（prototype），对应 Object.setPrototypeOf(obj, newProto)方法。它返回一个布尔值，表示是否设置成功。

     ```js
     const myObj = {};

     // 旧写法
     Object.setPrototypeOf(myObj, Array.prototype);

     // 新写法
     Reflect.setPrototypeOf(myObj, Array.prototype);

     myObj.length; // 0
     ```

     如果无法设置目标对象的原型（比如，目标对象禁止扩展），Reflect.setPrototypeOf 方法返回 false。

     如果第一个参数是 undefined 或 null，Object.setPrototypeOf 和 Reflect.setPrototypeOf 都会报错。

3. 实例：使用 Proxy 实现观察者模式

   观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。

   ```js
   const person = observable({
     name: "张三",
     age: 20,
   });

   function print() {
     console.log(`${person.name}, ${person.age}`);
   }

   observe(print);
   person.name = "李四"; // 输出  李四, 20
   ```

   使用 Proxy 写一个观察者模式的最简单实现，即实现 observable 和 observe 这两个函数

   ```js
   const queuedObservers = new Set();

   const observe = (fn) => queuedObservers.add(fn);
   const observable = (obj) => new Proxy(obj, { set });

   function set(target, key, value, receiver) {
     const result = Reflect.set(target, key, value, receiver);
     queuedObservers.forEach((observer) => observer());
     return result;
   }
   ```
