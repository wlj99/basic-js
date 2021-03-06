/* 
用两个栈实现队列

栈后进先出，队列先进先出
双栈可以实现序列倒置：假设有 stack1=[1, 2, 3] 、 stack2=[] ，
如果循环出栈 stack1 并将出栈元素进栈 stack2 ，则循环结束后， stack1=[] 、 stack2=[3, 2, 1] ，
即通过 stack2 实现了 stack1 中元素的倒置
当需要删除队首元素时，仅仅需要 stack2 出栈即可；
当 stack2 为空时，出队就需要将 stack1 元素倒置倒 stack2 ， stack2 再出队即可；
如果 stack1 也为空，即队列中没有元素，返回 -1

*/

class queueStack {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  appendTail(val) {
    this.stack1.push(val);
  }

  deleteTail(val) {
    if (this.stack2.length) {
      return this.stack2.pop();
    }
    if (!this.stack1.length) return -1;
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop());
    }
    return this.stack2.pop();
  }
}

/* 滑动窗口最大值问题 */