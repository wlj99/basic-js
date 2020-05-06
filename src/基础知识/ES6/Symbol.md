# Symbol

1. 基础介绍

   ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值。

   JS 数据类型是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）、Symbol 、BigInt。

   对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。

   ```js
   let s = Symbol();

   typeof s;
   // "symbol"
   ```

   注意 ⚠️，Symbol 函数前不能使用 new 命令。

   生成的 Symbol 是一个原始类型的值，不是对象。由于 Symbol 值不是对象，所以不能添加属性。基本上，它是一种类似于字符串的数据类型。

   - Symbol 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述。

   ```js
   let s1 = Symbol("foo");
   let s2 = Symbol("bar");

   s1; // Symbol(foo)
   s2; // Symbol(bar)

   s1.toString(); // "Symbol(foo)"
   s2.toString(); // "Symbol(bar)"
   ```

   - Symbol 的参数是一个对象，就会调用该对象的 toString 方法，将其转为字符串，然后才生成一个 Symbol 值。

   ```js
   const obj = {
     toString() {
       return "abc";
     },
   };
   const sym = Symbol(obj);
   sym; // Symbol(abc)
   ```

   - Symbol 函数的参数只是表示对当前 Symbol 值的描述，相同参数的 Symbol 函数的返回值是不相等的。

   ```js
   // 没有参数的情况
   let s1 = Symbol();
   let s2 = Symbol();

   s1 === s2; // false

   // 有参数的情况
   let s1 = Symbol("foo");
   let s2 = Symbol("foo");

   s1 === s2; // false
   ```

   - Symbol 值不能与其他类型的值进行运算

   ```js
   let sym = Symbol("My symbol");

   "your symbol is " + sym; // TypeError: can't convert symbol to string
   `your symbol is ${sym}`; // TypeError: can't convert symbol to string
   ```

   - Symbol 值可以显式转为字符串

   ```js
   let sym = Symbol("My symbol");

   String(sym); // 'Symbol(My symbol)'
   sym.toString(); // 'Symbol(My symbol)'
   ```

   - Symbol 值也可以转为布尔值，但是不能转为数值

   ```js
   let sym = Symbol();
   Boolean(sym); // true
   !sym; // false

   if (sym) {
     // ...
   }

   Number(sym); // TypeError
   sym + 2; // TypeError
   ```

2. Symbol.prototype.description

   `const sym = Symbol('foo'); // sym的描述就是字符串foo`

   - 读取这个描述需要将 Symbol 显式转为字符串

   ```js
   const sym = Symbol("foo");

   String(sym); // "Symbol(foo)"
   sym.toString(); // "Symbol(foo)"
   ```

   - ES2019 提供了一个实例属性 description，直接返回 Symbol 的描述

   ```js
   const sym = Symbol("foo");

   sym.description; // "foo"
   ```

3. 作为属性名的 Symbol

   每一个 Symbol 值都是不相等的，即 Symbol 值可以作为标识符，用于对象的属性名，保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

   ```js
   let mySymbol = Symbol();

   // 第一种写法
   let a = {};
   a[mySymbol] = "Hello!";

   // 第二种写法
   let a = {
     [mySymbol]: "Hello!",
   };

   // 第三种写法
   let a = {};
   Object.defineProperty(a, mySymbol, { value: "Hello!" });

   // 以上写法都得到同样结果
   a[mySymbol]; // "Hello!"
   ```

   注意 ⚠️，Symbol 值作为对象属性名时，不能用点运算符。

   ```js
   const mySymbol = Symbol();
   const a = {};

   a.mySymbol = "Hello!";
   a[mySymbol]; // undefined
   a["mySymbol"]; // "Hello!"
   ```

   点运算符后面总是字符串，所以不会读取 mySymbol 作为标识名所指代的那个值，导致 a 的属性名实际上是一个字符串，而不是一个 Symbol 值。

   在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。

   ```js
   let s = Symbol();

   let obj = {
     [s]: function (arg) { ... }
   };

   obj[s](123);
   ```

   如果 s 不放在方括号中，该属性的键名就是字符串 s，而不是 s 所代表的那个 Symbol 值。

   Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的

   Symbol 值作为属性名时，该属性还是公开属性，不是私有属性

4. 实例：消除魔术字符串

   魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。

   ```js
   function getArea(shape, options) {
     let area = 0;

     switch (shape) {
       case "Triangle": // 魔术字符串
         area = 0.5 * options.width * options.height;
         break;
       /* ... more code ... */
     }

     return area;
   }

   getArea("Triangle", { width: 100, height: 100 }); // 魔术字符串
   ```

   字符串 Triangle 就是一个魔术字符串。它多次出现，与代码形成“强耦合”，不利于将来的修改和维护。

   ```js
   const shapeType = {
     triangle: "Triangle",
   };

   function getArea(shape, options) {
     let area = 0;
     switch (shape) {
       case shapeType.triangle:
         area = 0.5 * options.width * options.height;
         break;
     }
     return area;
   }

   getArea(shapeType.triangle, { width: 100, height: 100 });
   ```

   shapeType.triangle 等于哪个值并不重要，只要确保不会跟其他 shapeType 属性的值冲突即可。可改用 Symbol 值

   ```js
   const shapeType = {
     triangle: Symbol(),
   };
   ```

5. 属性名的遍历

   Symbol 作为属性名，遍历对象的时候，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyNames()、

   JSON.stringify()返回。

   ```js
   const obj = {};
   const foo = Symbol("foo");

   obj[foo] = "bar";

   for (let i in obj) {
     console.log(i); // 无输出
   }

   Object.getOwnPropertyNames(obj); // []
   Object.getOwnPropertySymbols(obj); // [Symbol(foo)]
   ```

   它也不是私有属性，有一个 Object.getOwnPropertySymbols()方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有

   用作属性名的 Symbol 值。

   ```js
   const obj = {};
   let a = Symbol("a");
   let b = Symbol("b");

   obj[a] = "Hello";
   obj[b] = "World";

   const objectSymbols = Object.getOwnPropertySymbols(obj);

   objectSymbols; // [Symbol(a), Symbol(b)]
   ```

   Reflect.ownKeys()方法可以返回所有类型的键名，包括常规键名和 Symbol 键名

   ```js
   let obj = {
     [Symbol("my_key")]: 1,
     enum: 2,
     nonEnum: 3,
   };

   Reflect.ownKeys(obj); //  ["enum", "nonEnum", Symbol(my_key)]
   ```

   由于以 Symbol 值作为键名，不会被常规方法遍历得到。可以利用这个特性，为对象定义一些非私有的、只用于内部的方法。

   ```js
   let size = Symbol("size");

   class Collection {
     constructor() {
       this[size] = 0;
     }

     add(item) {
       this[this[size]] = item;
       this[size]++;
     }

     static sizeOf(instance) {
       return instance[size];
     }
   }

   let x = new Collection();
   Collection.sizeOf(x); // 0

   x.add("foo");
   Collection.sizeOf(x); // 1

   Object.keys(x); // ['0']
   Object.getOwnPropertyNames(x); // ['0']
   Object.getOwnPropertySymbols(x); // [Symbol(size)]
   ```

6. Symbol.for()，Symbol.keyFor()

   - Symbol.for()方法 重新使用同一个 Symbol 值

   > 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。

   ```js
   let s1 = Symbol.for("foo");
   let s2 = Symbol.for("foo");

   s1 === s2; // true
   ```

   ```js
   Symbol.for("bar") === Symbol.for("bar"); // true

   Symbol("bar") === Symbol("bar"); // false
   ```

   - Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的 key

   ```js
   let s1 = Symbol.for("foo");
   Symbol.keyFor(s1); // "foo"

   let s2 = Symbol("foo");
   Symbol.keyFor(s2); // undefined
   ```

   - Symbol.for()为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。

   ```js
   function foo() {
     return Symbol.for("bar");
   }

   const x = foo();
   const y = Symbol.for("bar");
   console.log(x === y); // true
   ```

   - Symbol.for()的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值

   ```js
   iframe = document.createElement("iframe");
   iframe.src = String(window.location);
   document.body.appendChild(iframe);

   iframe.contentWindow.Symbol.for("foo") === Symbol.for("foo"); // true
   ```
