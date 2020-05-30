import {
  remove
} from './utils.js';

let uid = 0;

export default class Dep {
  static target = null;

  constructor() {
    this.uid = uid++;
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  removeSub(sub) {
    remove(this.subs, sub);
  }

  depend() {
    if (Dep.target) {
      console.log(this, 'depend this');
      Dep.target.addDep(this);
    }
  }

  notify() {
    const subs = this.subs.slice();
    let len = subs.length;
    for (let i = 0; i < len; i++) {
      subs[i].update();
    }
  }
}

const targetStack = [];


export function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

export function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}