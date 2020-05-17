/* 
当调用 Symbol 的时候，会采用以下步骤：

如果使用 new ，就报错
如果 description 是 undefined，让 descString 为 undefined
否则 让 descString 为 ToString(description)
如果报错，就返回
返回一个新的唯一的 Symbol 值，它的内部属性 [[Description]] 值为 descString
考虑到还需要定义一个 [[Description]] 属性，如果直接返回一个基本类型的值，是无法做到这一点的，所以我们最终还是返回一个对象。
*/

// 第一版
(function () {
  var root = this;

  var SymbolPolyfill = function Symbol(description) {

    // 实现特性第 2 点：Symbol 函数前不能使用 new 命令
    if (this instanceof SymbolPolyfill) throw new TypeError('Symbol is not a constructor');

    // 实现特性第 5 点：如果 Symbol 的参数是一个对象，就会调用该对象的 toString 方法，将其转为字符串，然后才生成一个 Symbol 值。
    var descString = description === undefined ? undefined : String(description)

    // var symbol = Object.create(null); //第一版 
    var symbol = Object.create({
      toString: function () {
        return 'Symbol(' + this.__Description__ + ')';
      },
    });
    // 第二版  当调用 String 方法的时候，如果该对象有 toString 方法，就会调用该 toString 方法，
    // 所以我们只要给返回的对象添加一个 toString 方法，即可实现这两个效果。

    Object.defineProperties(symbol, {
      '__Description__': {
        value: descString,
        writable: false,
        enumerable: false,
        configurable: false
      }
    });

    // 实现特性第 6 点，因为调用该方法，返回的是一个新对象，两个对象之间，只要引用不同，就不会相同
    return symbol;
  }

  root.SymbolPolyfill = SymbolPolyfill;
})();

var a = SymbolPolyfill('foo');
var b = SymbolPolyfill('foo');

console.log(a === b); // false

var o = {};
o[a] = 'hello';
o[b] = 'hi';

console.log(o); // {Symbol(foo): 'hi'}
// 当作为对象的属性名的时候，都会隐式转换为 Symbol(foo) 字符串，这个时候就会造成同名的属性

// 第三版
(function () {
  var root = this;

  var generateName = (function () {
    var postfix = 0;
    return function (descString) {
      postfix++;
      return '@@' + descString + '_' + postfix
    }
  })()

  var SymbolPolyfill = function Symbol(description) {

    if (this instanceof SymbolPolyfill) throw new TypeError('Symbol is not a constructor');

    var descString = description === undefined ? undefined : String(description)

    var symbol = Object.create({
      toString: function () {
        return this.__Name__;
      },
      /*  valueOf: function () {
         throw new Error('Cannot convert a Symbol value')
       }, //隐式调用报错 目前只能二选一 */
      valueOf: function () {
        return this;
      } // 显式调用返回该值
    })

    Object.defineProperties(symbol, {
      '__Description__': {
        value: descString,
        writable: false,
        enumerable: false,
        configurable: false
      },
      '__Name__': {
        value: generateName(descString),
        writable: false,
        enumerable: false,
        configurable: false
      }
    });

    return symbol;
  }

  var forMap = {};

  Object.defineProperties(SymbolPolyfill, {
    'for': {
      value: function (description) {
        var descString = description === undefined ? undefined : String(description)
        return forMap[descString] ? forMap[descString] : forMap[descString] = SymbolPolyfill(descString);
      },
      writable: true,
      enumerable: false,
      configurable: true
    },
    'keyFor': {
      value: function (symbol) {
        for (var key in forMap) {
          if (forMap[key] === symbol) return key;
        }
      },
      writable: true,
      enumerable: false,
      configurable: true
    }
  });


  root.SymbolPolyfill = SymbolPolyfill;

})();

var a = SymbolPolyfill('foo');
var b = SymbolPolyfill('foo');

console.log(a === b); // false

var o = {};
o[a] = 'hello';
o[b] = 'hi';

console.log(o); // Object { "@@foo_1": "hello", "@@foo_2": "hi" }