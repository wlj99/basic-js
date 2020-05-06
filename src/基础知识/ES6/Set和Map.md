# Set Map

## Set

1. 基础用法

   类似于数组，但是成员的值都是唯一的，没有重复的值。

   - Set 本身是一个构造函数，用来生成 Set 数据结构。

   ```js
   const s = new Set();

   [2, 3, 5, 4, 5, 2, 2].forEach((x) => s.add(x));

   for (let i of s) {
     console.log(i); // 2 3 5 4
   }
   ```

   - Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

   ```js
   // 例一
   const set = new Set([1, 2, 3, 4, 4]);
   [...set]; // [1, 2, 3, 4]

   // 例二
   const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
   items.size; // 5

   // 例三
   const set = new Set(document.querySelectorAll("div"));
   set.size; // 56

   // 类似于
   const set = new Set();
   document.querySelectorAll("div").forEach((div) => set.add(div));
   set.size; // 56
   ```

   - 向 Set 加入值的时候，不会发生类型转换，例如 5 和"5"是两个不同的值。

   - Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为 NaN 等于自身。

   ```js
   let set = new Set();
   let a = NaN;
   let b = NaN;
   set.add(a);
   set.add(b);
   set; // Set {NaN}
   ```

   - 两个对象总是不相等的

   ```js
   let set = new Set();

   set.add({});
   set.size; // 1

   set.add({});
   set.size; // 2
   ```

2. 实例的属性和方法

   - 实例属性

     - Set.prototype.constructor：构造函数，默认就是 Set 函数。

     - Set.prototype.size：返回 Set 实例的成员总数。

   - 实例方法

     - Set.prototype.add(value)：添加某个值，返回 Set 结构本身。

     - Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。

     - Set.prototype.has(value)：返回一个布尔值，表示该值是否为 Set 的成员。

     - Set.prototype.clear()：清除所有成员，没有返回值。

   ```js
   s.add(1).add(2).add(2);
   // 注意2被加入了两次

   s.size; // 2

   s.has(1); // true
   s.has(2); // true
   s.has(3); // false

   s.delete(2);
   s.has(2); // false
   ```

   判断是否包括一个键上面，Object 结构和 Set 结构的写法

   ```js
   // 对象的写法
   const properties = {
     width: 1,
     height: 1,
   };

   if (properties[someName]) {
     // do something
   }

   // Set的写法
   const properties = new Set();

   properties.add("width");
   properties.add("height");

   if (properties.has(someName)) {
     // do something
   }
   ```

   Array.from 方法可以将 Set 结构转为数组

   ```js
   const items = new Set([1, 2, 3, 4, 5]);
   const array = Array.from(items);
   ```

   去除数组重复成员的方法：

   ```js
   // 方法一
   [...new Set(array)];

   // 方法二
   function dedupe(array) {
     return Array.from(new Set(array));
   }

   dedupe([1, 1, 2, 3]); // [1, 2, 3]
   ```

3. 遍历操作

   - Set.prototype.keys()：返回键名的遍历器

   - Set.prototype.values()：返回键值的遍历器

   - Set.prototype.entries()：返回键值对的遍历器

   - Set.prototype.forEach()：使用回调函数遍历每个成员

   Set 的遍历顺序就是插入顺序

   1). keys 方法、values 方法、entries 方法返回的都是遍历器对象。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以 keys 方法和 values 方法的行为完全一致。

   ```js
   let set = new Set(["red", "green", "blue"]);

   for (let item of set.keys()) {
     console.log(item);
   }
   // red
   // green
   // blue

   for (let item of set.values()) {
     console.log(item);
   }
   // red
   // green
   // blue

   for (let item of set.entries()) {
     console.log(item);
   }
   // ["red", "red"]
   // ["green", "green"]
   // ["blue", "blue"]
   ```

   2). Set 结构的实例与数组一样，也拥有 forEach 方法，用于对每个成员执行某种操作，没有返回值。

   ```js
   let set = new Set([1, 4, 9]);
   set.forEach((value, key) => console.log(key + " : " + value));
   // 1 : 1
   // 4 : 4
   // 9 : 9
   ```

   - 扩展运算符（...）内部使用 for...of 循环，所以也可以用于 Set 结构

   ```js
   let set = new Set(["red", "green", "blue"]);
   let arr = [...set]; // ['red', 'green', 'blue']
   ```

   - 数组的 map 和 filter 方法也可以间接用于 Set

   ```js
   let set = new Set([1, 2, 3]);
   set = new Set([...set].map((x) => x * 2)); // 返回Set结构：{2, 4, 6}

   let set = new Set([1, 2, 3, 4, 5]);
   set = new Set([...set].filter((x) => x % 2 == 0)); // 返回Set结构：{2, 4}
   ```

   ```js
   let a = new Set([1, 2, 3]);
   let b = new Set([4, 3, 2]);

   // 并集
   let union = new Set([...a, ...b]); // Set {1, 2, 3, 4}

   // 交集
   let intersect = new Set([...a].filter((x) => b.has(x))); // set {2, 3}

   // 差集
   let difference = new Set([...a].filter((x) => !b.has(x))); // Set {1}
   ```

   在遍历操作中，同步改变原来的 Set 结构，目前没有直接的方法，但可以：

   - 利用原 Set 结构映射出一个新的结构，然后赋值给原来的 Set 结构

   - 利用 Array.from 方法

   ```js
   // 方法一
   let set = new Set([1, 2, 3]);
   set = new Set([...set].map((val) => val * 2)); // set的值是2, 4, 6

   // 方法二
   let set = new Set([1, 2, 3]);
   set = new Set(Array.from(set, (val) => val * 2)); // set的值是2, 4, 6
   ```

## WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合

与 Set 的区别：

- WeakSet 的成员只能是对象，而不能是其他类型的值。

  ```js
  const ws = new WeakSet();
  ws.add(1); // TypeError: Invalid value used in weak set
  ws.add(Symbol()); // TypeError: invalid value used in weak set
  ```

- WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用（如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中）

1. 基础使用

   `const ws = new WeakSet();`

   ```js
   const a = [
     [1, 2],
     [3, 4],
   ];
   const ws = new WeakSet(a); // WeakSet {[1, 2], [3, 4]}
   ```

   是 a 数组的成员成为 WeakSet 的成员，而不是 a 数组本身。数组的成员只能是对象。

   ```js
   const b = [3, 4];
   const ws = new WeakSet(b); // Uncaught TypeError: Invalid value used in weak set(…)
   ```

   有以下三个方法：

   - WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员

   - WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员

   - WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中

   WeakSet 不能遍历，因为成员都是弱引用

## Map

1.  基本用法

    JS 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。

    ES6 Map 数据结构 它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

    ```js
    const m = new Map();
    const o = { p: "Hello World" };

    m.set(o, "content");
    m.get(o); // "content"

    m.has(o); // true
    m.delete(o); // true
    m.has(o); // false
    ```

    不仅仅是数组，任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作 Map 构造函数的参数。即 Set 和 Map 都可以用来生成新的 Map。

    ```js
    const set = new Set([
      ["foo", 1],
      ["bar", 2],
    ]);
    const m1 = new Map(set);
    m1.get("foo"); // 1

    const m2 = new Map([["baz", 3]]); // {"baz" => 3}
    const m3 = new Map(m2); // {"baz" => 3}
    m3.get("baz"); // 3
    ```

    如果对同一个键多次赋值，后面的值将覆盖前面的值

    ```js
    const map = new Map();

    map.set(1, "aaa").set(1, "bbb");

    map.get(1); // "bbb"
    ```

    如果读取一个未知的键，则返回 undefined

    `new Map().get('asfddfsasadf');// undefined`

    注意，只有对同一个对象的引用，Map 结构才将其视为同一个键

    ```js
    const map = new Map();

    map.set(["a"], 555);
    map.get(["a"]); // undefined
    // 表面是针对同一个键，但实际上这是两个不同的数组实例，内存地址是不一样的，因此get方法无法读取该键，返回undefined
    ```

    ```js
    const map = new Map();

    const k1 = ["a"];
    const k2 = ["a"];

    map.set(k1, 111).set(k2, 222);

    map.get(k1); // 111
    map.get(k2); // 222
    ```

    如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键

    - 0 和-0 就是一个键

    - 布尔值 true 和字符串 true 是两个不同的键

    - undefined 和 null 也是两个不同的键

    - NaN 不严格相等于自身，但 Map 将其视为同一个键

2.  实例的属性和操作方法

    - size 属性返回 Map 结构的成员总数

      ```js
      const map = new Map();
      map.set("foo", true);
      map.set("bar", false);

      map.size; // 2
      ```

    - Map.prototype.set(key, value)

      设置键名 key 对应的键值为 value，然后返回整个 Map 结构。如果 key 已经有值，则键值会被更新，否则就新生成该键

      ```js
      const m = new Map();

      m.set("edition", 6); // 键是字符串
      m.set(262, "standard"); // 键是数值
      m.set(undefined, "nah"); // 键是 undefined
      ```

    - Map.prototype.get(key)

      读取 key 对应的键值，如果找不到 key，返回 undefined

      ```js
      const m = new Map();

      const hello = function () {
        console.log("hello");
      };
      m.set(hello, "Hello ES6!"); // 键是函数

      m.get(hello); // Hello ES6!
      ```

    - Map.prototype.has(key) has 方法返回一个布尔值，表示某个键是否在当前 Map 对象之中

      ```js
      const m = new Map();

      m.set("edition", 6);
      m.set(262, "standard");
      m.set(undefined, "nah");

      m.has("edition"); // true
      m.has("years"); // false
      m.has(262); // true
      m.has(undefined); // true
      ```

    - Map.prototype.delete(key) 删除某个键，返回 true。如果删除失败，返回 false

    - Map.prototype.clear() 清除所有成员，没有返回值

3.  遍历方法

    - Map.prototype.keys()：返回键名的遍历器。

    - Map.prototype.values()：返回键值的遍历器。

    - Map.prototype.entries()：返回所有成员的遍历器。

    - Map.prototype.forEach()：遍历 Map 的所有成员。

    特别注意的是，Map 的遍历顺序就是插入顺序

    ```js
    const map = new Map([
      ["F", "no"],
      ["T", "yes"],
    ]);

    for (let key of map.keys()) {
      console.log(key);
    }
    // "F"
    // "T"

    for (let value of map.values()) {
      console.log(value);
    }
    // "no"
    // "yes"

    for (let item of map.entries()) {
      console.log(item[0], item[1]);
    }
    // "F" "no"
    // "T" "yes"

    // 或者
    for (let [key, value] of map.entries()) {
      console.log(key, value);
    }
    // "F" "no"
    // "T" "yes"

    // 等同于使用map.entries()
    for (let [key, value] of map) {
      console.log(key, value);
    }
    // "F" "no"
    // "T" "yes"

    const map2 = new Map([
      [1, "one"],
      [2, "two"],
      [3, "three"],
    ]);

    [...map2.keys()]; // [1, 2, 3]
    [...map]; // [[1,'one'], [2, 'two'], [3, 'three']]
    ```

4.  与其他数据结构的互相转换

    - Map 转为数组 使用扩展运算符（...）

    - 数组 转为 Map

      ```js
      new Map([
        [true, 7],
        [{ foo: 3 }, ["abc"]],
      ]);
      // Map {
      //   true => 7,
      //   Object {foo: 3} => ['abc']
      // }
      ```

    - Map 转为对象

      如果所有 Map 的键都是字符串，它可以无损地转为对象

      ```js
      function strMapToObj(strMap) {
        let obj = Object.create(null);
        for (let [k, v] of strMap) {
          obj[k] = v;
        }
        return obj;
      }

      const myMap = new Map().set("yes", true).set("no", false);
      strMapToObj(myMap); // { yes: true, no: false }
      ```

      如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名

    - 对象转为 Map

      ```js
      let obj = { a: 1, b: 2 };
      let map = new Map(Object.entries(obj)); // Map {"a" => 1, "b" => 2}
      ```

      ```js
      function objToStrMap(obj) {
        let strMap = new Map();
        for (let k of Object.keys(obj)) {
          strMap.set(k, obj[k]);
        }
        return strMap;
      }

      objToStrMap({ yes: true, no: false }); // Map {"yes" => true, "no" => false}
      ```

    - Map 转为 JSON

      1. Map 的键名都是字符串 可转为对象 JSON

         ```js
         function strMapToJson(strMap) {
           return JSON.stringify(strMapToObj(strMap));
         }

         let myMap = new Map().set("yes", true).set("no", false);
         strMapToJson(myMap); // '{"yes":true,"no":false}'
         ```

      2. Map 的键名有非字符串，可转为数组 JSON

         ```js
         function mapToArrayJson(map) {
           return JSON.stringify([...map]);
         }

         let myMap = new Map().set(true, 7).set({ foo: 3 }, ["abc"]);
         mapToArrayJson(myMap); // '[[true,7],[{"foo":3},["abc"]]]'
         ```

    - JSON 转为 Map

      ```js
      function jsonToStrMap(jsonStr) {
        return objToStrMap(JSON.parse(jsonStr));
      }

      jsonToStrMap('{"yes": true, "no": false}'); // Map {'yes' => true, 'no' => false}
      ```

      特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。

      ```js
      function jsonToMap(jsonStr) {
        return new Map(JSON.parse(jsonStr));
      }

      jsonToMap('[[true,7],[{"foo":3},["abc"]]]'); // Map {true => 7, Object {foo: 3} => ['abc']}
      ```

## WeakMap

1. 基础介绍

   WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合

   WeakMap 与 Map 的区别有两点：

   -. WeakMap 只接受对象作为键名（null 除外），不接受其他类型的值作为键名

   -. WeakMap 的键名所指向的对象，不计入垃圾回收机制

   注意，WeakMap 弱引用的只是键名，而不是键值

   ```js
   const wm = new WeakMap();
   let key = {};
   let obj = { foo: 1 };

   wm.set(key, obj);
   obj = null;
   wm.get(key); // Object {foo: 1}

   // 键值obj是正常引用。所以，即使在 WeakMap 外部消除了obj的引用，WeakMap 内部的引用依然存在
   ```

2. WeakMap 的语法

   - 没有遍历操作（即没有 keys()、values()和 entries()方法），也没有 size 属性

   - 无法清空，即不支持 clear 方法

   - 只有四个方法可用：get()、set()、has()、delete()
