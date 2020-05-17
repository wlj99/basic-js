/* 
  节流：持续触发事件，每隔一段时间，只执行一次事件
  两种主流的实现方式：时间戳，定时器
*/

//时间戳
function throttle(fn, wait) {
  let prev = 0;
  return function () {
    let current = +new Date();
    if (current - prev > wait) {
      fn.apply(this, arguments);
      prev = +new Date();
    }
  }
}

//定时器
function throttleTime(fn, wait) {
  let timer;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, arguments);
      }, wait)
    }
  }
}

function throttleFina(fn, wait) {
  let timer, prev = 0;
  let later = () => {
    prev = +new Date();
    timer = null;
    fn.apply(this, arguments);
  }
  let throttled = function () {
    let current = +new Date();
    let hasTime = wait - (current - prev);
    //没有剩余时间或者改动系统时间
    if (hasTime <= 0 || hasTime > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      prev = current;
      fn.apply(this, arguments);
    } else if (!timer) {
      timer = setTimeout(later, hasTime);
    }
  }

  throttled.cancel = function () {
    clearTimeout(timeout);
    prev = 0;
    timer = null;
  }

  return throttled;
}

// leading 代表首次是否执行，trailing 代表结束后是否再执行一次
function throttleLast(fn, wait, opt) {
  let timer, prev, args, self;

  if (!opt) opt = {};

  let later = () => {
    prev = opt.leading === false ? 0 : new Date().getTime();
    timer = null;
    fn.apply(self, args);
    if (!timer) args = self = null;
  }

  let throttled = function () {
    let current = new Date().getTime();
    if (!prev && opt.leading === false) prev = current;
    let hasTime = wait - (current - prev);
    self = this, args = arguments;
    if (hasTime <= 0 || hasTime > wait) {
      if (timer) {
        clearTimeout(timer);
        tiemr = null;
      }

      prev = current;
      fn.apply(self, args);
      if (!timer) self = args = null;
    } else if (!timer && opt.trailing === false) {
      timer = setTimeout(later, hasTime);
    }
  }
  throttled.cancel = function () {
    clearTimeout(timeout);
    prev = 0;
    timer = null;
  }
  return throttled;
}

let count = 1;

let div = document.querySelector('.container');

console.log(div, 'fff')

function addAcount(e) {
  console.log(count);
  div.innerHTML = count++;
}

div.onmousemove = throttleLast(addAcount, 3000, {
  leading: false
});