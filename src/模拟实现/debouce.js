let count = 1;

let div = document.querySelector('.container');

console.log(div, 'fff')

function addAcount(e) {
  // console.log(e);
  console.log(count);
  div.innerHTML = count++;
}

// div.onmousemove = addAcount;

/*  
防抖的原理就是：
  连续触发事件，但是在事件触发 n 秒后才执行，
  如果在一个事件触发的 n 秒内又触发了这个事件，以新的事件的时间为准，n 秒后才执行，
  总之，要等触发完事件 n 秒内不再触发事件，才执行
*/

function debounce(fn, wait = 1000) {
  let timer;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait)
  }
}

//不希望非要等到事件停止触发后才执行，希望立刻执行函数，然后等到停止触发 n 秒后，才可以重新触发执行
function debounceState2(fn, wait = 300, immediate = false) {
  let timer;
  return function () {
    if (timer) clearTimeout(timer);
    if (immediate) {
      //以下内容尚未搞懂
      let isNow = !timer; // timer 为 null 未执行

      timer = setTimeout(() => {
        timer = null;
      }, wait)

      if (isNow) fn.apply(this, arguments);

    } else {

      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, wait)

    }
  }
}

/* 
  函数fn若有返回值需要返回函数的返回值，
  当immediate为false的时候，通过setTimeout，将fu.apply(this, arguments) 的返回值赋给变量，
  最后 return 的时候，值将会一直是 undefined，当immediate为true 的时候返回函数的执行结果
*/

function debounceState3(fn, wait, immediate = false) {
  let timer, result;
  return function () {
    if (timer) clearTimeout(timer);
    if (immediate) {
      //以下内容尚未搞懂
      let isNow = !timer; // timer 为 null 未执行

      timer = setTimeout(() => {
        timer = null;
      }, wait)

      if (isNow) result = fn.apply(this, arguments);

    } else {

      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, wait)

    }
    return result;
  }
}

//取消 debounce 函数 有一个按钮，点击后，取消防抖，再次触发，立刻执行
function debounceState4(fn, wait, immediate = false) {
  let timer, result;
  let debounced = function () {
    if (timer) clearTimeout(timer);
    if (immediate) {
      //以下内容尚未搞懂
      let isNow = !timer; // timer 为 null 未执行

      timer = setTimeout(() => {
        timer = null;
      }, wait)

      if (isNow) result = fn.apply(this, arguments);

    } else {

      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, wait)

    }
    return result;
  }
  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
  }

  return debounced;
}
div.onmousemove = debounceState2(addAcount, 1000, true);