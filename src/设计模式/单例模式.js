/* 
单例模式即一个类只能构造出唯一实例，
单例模式的意义在于共享、唯一，
Redux/Vuex中的store、JQ的$或者业务场景中的购物车、登录框都是单例模式的应用
 */
class SingletonLogin {
  constructor(name, password) {
    this.name = name
    this.password = password
  }
  static getInstance(name, password) {
    //判断对象是否已经被创建,若创建则返回旧对象
    if (!this.instance) this.instance = new SingletonLogin(name, password)
    return this.instance
  }
}

let obj1 = SingletonLogin.getInstance('CXK', '123')
let obj2 = SingletonLogin.getInstance('CXK', '321')

console.log(obj1 === obj2) // true
console.log(obj1) // {name:CXK,password:123}
console.log(obj2) // 输出的依然是{name:CXK,password:123}