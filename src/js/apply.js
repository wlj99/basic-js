Function.prototype.apply2 = function (context, arr) {
  let result;
  context = context || window;
  context.fn = this;
  result = arr ? context.fn(...arr) : context.fn();

  delete context.fn;
  return result;
}

var value = 5;

function bar() {
  console.log(this.value);
}

function bar2(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
}

function bar3(name, age) {
  return {
    value: this.value,
    name: name,
    age: age
  }
}

let foo = {
  value: 1
};

bar.apply2(); //5
bar.apply2(foo); //1
// bar2.apply2(foo,['test',29]);
// console.log(bar3.apply2(foo,['test',29]));


function foo() {
  let a = {
    num: 0,
    fn: function () {
      console.log('first', this);
      (function () {
        console.log('second', this);
      })();
      (() => {
        console.log('third', this);
      })();
    }
  }
  return a;
}

foo().fn();