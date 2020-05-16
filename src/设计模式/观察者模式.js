/* 
观察者模式概念很简单：观察者监听被观察者的变化，被观察者发生改变时，通知所有的观察者 */
//观察者
class Observer {
  constructor(fn) {
    this.update = fn
  }
}
//被观察者
class Subject {
  constructor() {
    this.observers = [] //观察者队列    
  }
  addObserver(observer) {
    this.observers.push(observer) //往观察者队列添加观察者    
  }
  notify() { //通知所有观察者,实际上是把观察者的update()都执行了一遍       
    this.observers.forEach(observer => {
      observer.update() //依次取出观察者,并执行观察者的update方法        
    })
  }
}

var subject = new Subject() //被观察者
const update = () => {
  console.log('被观察者发出通知')
} //收到广播时要执行的方法
var ob1 = new Observer(update) //观察者1
var ob2 = new Observer(update) //观察者2
subject.addObserver(ob1) //观察者1订阅subject的通知
subject.addObserver(ob2) //观察者2订阅subject的通知
subject.notify() //发出广播,执行所有观察者的update方法