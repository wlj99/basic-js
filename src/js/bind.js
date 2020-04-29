Function.prototype.bind2 = function(context){
  let self = this, [,...args] = arguments;
  // let args1 = Array.prototype.slice.call(arguments, 1);
  return function(){

    // let bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(context,...args,arguments);
    // return self.apply(context,args1.concat(bindArgs));
  }
}
//需要后续再次研究理解
Function.prototype.bind3 = function(context){
  if(typeof this !== 'function' ) throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
  let self = this, [,...args] = arguments;
  let obj =function(){};
  let temp = function(){
    return self.apply( this instanceof obj ? this: context, ...args,arguments);
  }
  obj.prototype = this.prototype;
  temp.prototype = new obj();
  return temp;
}

var foo = {
  value: 1
};

function bar() {
  console.log(this.value);
  return this.value;
}

function bar2(name, age) {
  console.log(this.value);
  console.log(name);
  console.log(age);

}

let b2 = bar2.bind2(foo,'test');
b2(25);