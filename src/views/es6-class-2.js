// 1.es5中的继承
function Food() {
  this.type = 'food'
}
Food.prototype.getType = function() {
  return this.type
}
function Vegetable(name) {
  this.name = name
}
Vegetable.prototype = new Food()
const tomato = new Vegetable('tomato')
console.log(tomato.getType())

// 2.es6中的继承
class Parent {
  constructor(name) {
    this.name = name
  }
  getName() {
    return this.name
  }
  static getNames() {
    return this.name
  }
}
class Child extends Parent {
  constructor(name, age) {
    super(name) // 只有调用了super之后才可以使用this
    this.age = age
  }
}
const c = new Child('lison', 18)
console.log(c)
console.log(c.getName())
// 通过继承来的类创建的实例，既是子类的，也是父类的
console.log(c instanceof Child) // true
console.log(c instanceof Parent) // true
console.log(Parent.getNames()) //Parent  父类调用直接要打印Parent
console.log(Child.getNames()) //Child  静态方法子类也可以继承过来直接用
console.log(Object.getPrototypeOf(Child) === Parent) // true 获取构造函数的原型对象,说明Child的原型就是Parent

// super作为函数：代表父类的构造函数constructor
// super作为对象：在constructor和普通方法中指向的是父类的原型对象，在静态方法中指向的是父类
class Parent2 {
  constructor() {
    // constructor中定义的属性，都会添加到子类的实例上去
    this.type = 'parent'
  }
  // 定义一个父类的普通方法，是定义在原型对象上的
  getName() {
    return this.type
  }
}
// 父类的本身上定义一个方法
Parent2.getType = () => {
  return 'is parent'
}
class Child2 extends Parent2 {
  constructor() {
    super()
    console.log('constructor:' + super.getName()) // 在这里是可以访问的，super代表父类的原型对象
  }
  // 普通方法是定义在原型对象上的
  getParentName() {
    console.log('getParentName' + super.getName()) // 在这里是可以访问的，super代表父类的原型对象
  }
  getParentType() {
    // super代表父类的原型对象，父类的原型对象上没有getType方法，所以会报错
    console.log('getParentType' + super.getType())
  }
  // 静态方法
  static getParentType() {
    // 如果在Child2类中加上static,super代表的是父类本身，父类本身是定义了getType方法的
    console.log('getParentType' + super.getType())
  }
}
const c2 = new Child2()
c2.getParentName() // ok
// c2.getParentType() // 会报错
Child2.getParentType() // ok


// 在父类的原型中定义方法，方法里面的this指向的是子类的实例
class Parent3 {
  constructor() {
    this.name = 'parent'
  }
  print() {
    console.log(this.name) // 此时this代表的是子类的实例
  }
}
class Child3 extends Parent3 {
  constructor() {
    super()
    this.name = 'child'
  }
  childPrint() {
    super.print()
    // console.log(super)  不可以单独拿来用，直接报错
  }
}
const c3 = new Child3()
c3.childPrint() //child
// 总结：使用super的时候，要么作为函数调用，要么当作对象访问它的属性或方法，不能不做任何的操作
// console.log(super)是会报错的，所以是打印不出来的，要记清楚相关概念，才会用的明白！

// prototype
// __proto__
var objs = new Object()
console.log(objs.__proto__ === Object.prototype)

// 子类的__proto__指向父类本身
// 子类的prototype属性的__proto__指向父类的prototype属性
// 实例的__proto__属性的__proto__指向父类实例的__proto__

// 原生构造函数的继承
// es5中原生构造函数是没法继承的：Boolean、Number、String、Array、Date、Function、RegExp、Error、Object
// es6中是可以继承的
// Array构造函数中，如果接受一个参数，是作为长度来使用，但是没有元素的空数组，如果大于1个参数，是把这些参数作为每一项组成的数组
class CustomArray extends Array {
  constructor(...args) {
    super(...args) // 把参数传到父类(Array)构造函数中
  }
}
// 创建的实例也会继承原生构造函数上的方法，可以直接用
const arr = new CustomArray(3) // 一个参数
const arr2 = new CustomArray(3, 3, 4) // 多个参数
console.log(arr.fill('+'))
console.log(arr.join('_'))
console.log(arr2)
// es5构造函数 和 es6类在实现继承机制上存在差异：
// es5构造函数是先创建子构造函数的实例this，然后再将父类构造函数的方法属性添加到这个this上
// es6类是先从父类取到实例对象this，然后再调用super函数之后，再将子类的属性和方法加到this上，
// 这也就是为啥要先调用super，才能使用this的原因
