// 1.es5中的写法
function Point(x, y) {
  this.x = x
  this.y = y
}
Point.prototype.getPosition = function() {
  return '(' + this.x + ',' + this.y + ')'
}
var p1 = new Point(2, 3)
console.log(p1)
console.log(p1.getPosition())
var p2 = new Point(4, 5)
console.log(p2.getPosition())

// 2.es6中的写法
// 每个类都必须有constructor函数，如果没有的话
// 会默认加一个空的constructor(){}
class Point2 {
  constructor(x, y) {
    this.x = x
    this.y = y
    // return {a:'a'} // 如果返回自己定义的对象，那么就会把这个对象返回
    // 这样的话在创建实例之后，那么实例instanceof Point2就会为false,就不是这个类的构造函数了
  }
  // 这个函数就是定义在原型对象上的
  getPosition() {
    return `${this.x},${this.y}`
  }
}
const p3 = new Point2(1, 2)
console.log(p3)
console.log(p3 instanceof Point2) // true，可以知道该实例p3是由基类Point2来实现的
// 在es6中必须使用new操作符来创建实例，不然会报错，es5中是可以不使用new的
// const p4 = Point2(1,2) // 会报错
console.log(p3.hasOwnProperty('x')) // true ，说明是实例自身的属性
console.log(p3.hasOwnProperty('getPosition')) // false ，说明不是实例自身的方法，是类原型上的
console.log(p3.__proto__.hasOwnProperty('getPosition')) // true ,说明这个方法是继承来的，在类的原型对象上

// 3.es6中加入了取值 get set函数
// es5中的写法
var info = {
  _age: 18,
  set age(newValue) {
    if (newValue > 18) {
      console.log('变老了')
    } else {
      console.log('还年轻')
    }
  },
  get age() {
    console.log('你问我年龄干嘛')
    return this._age
  }
}
console.log(info.age) // 此时会调用get
info.age = 17 // 此时会调用set
info.age = 19 // 此时会调用set
// es6中的写法
class Info {
  constructor(age) {
    this._age = age
  }
  set age(newAge) {
    console.log('new Age is' + newAge)
    this._age = newAge
  }
  get age() {
    return this._age
  }
}
const info2 = new Info(18) // 此时会调用set
info2.age = 17 // 此时会调用set
console.log(info2.age) // 此时会调用get

// 4.class表达式
// es5中定义函数的方式
const func = function () {}
function func () {}
// es6中定义class的方式
class Infoss {
  constructor(){}
}
const Infoss = class C {
  constructor() {}
}
// const testInfo = new C() // 这是会报错的，说明类的名字不是C，而是Infoss
// 注意：此时这个实例的类名时Infoss,并不是C
// 所以这种形式定义class 后面的C是可以省略的：
const Infoss = class {
  constructor() {}
}
const testInfo = new Infoss()

// 5.静态方法
// 只让类本省自己调用的方法成为静态方法，不让实例去调用
// es5：
function testFunc() {}
console.log(testFunc.name) // 打印出的是函数名，函数本身就有name属性
// es6:
class Point3 {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  getPosition() {
    return `${this.x},${this.y}`
  }
  // 定义静态方法
  static getClassName() {
    return Point.name
  }
}
const p = new Point3(1, 2)
console.log(p.getPosition())
// console.log(p.getClassName()) // 这就报错了，因为静态方法只能类自己去调用，实例是调用不了的
console.log(Point3.getClassName()) // 类自身才可以调用

// 6.实例属性的其它写法
class Point31 {
  // z = 0 // 可以在这里定义属性
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }
  getPosition() {
    return `${this.x},${this.y}`
  }
  // 定义静态方法
  static getClassName() {
    return Point.name
  }
}
// const p = new Point31(1, 2, 3)
console.log(p)

// 7.静态属性
// es6中明确规定，只能给类添加静态方法，不能添加静态属性，如果要添加静态属性的话，要这样写：
class Point4 {
  constructor() {
    this.x = 0
    // 新的提案是可以使用static来定义静态属性,目前还没有通过，所以只能通过下面的方式来定义：
    // static y = 3
  }
}
Point4.y = 2 // 这种方式直接添加属性，可以实现类的静态属性，但不是很好
const p4 = new Point4()
console.log(p4.x)
console.log(p4.y)

// 8.私有方法：有一些方法或封装的插件希望我们在内部使用的，不暴露给使用者，就需要把方法变为私有的
// 目前es6并不提供私有方法，私有属性，需要使用一些技巧
class Point5 {
  func1() {} // 这种是可以继承的
  _func2() {} // 8.1.名义上的私有方法，只是从名字上来区分的，外部还是可以去使用的
}
// 8.2.比较好的方式：
const _func3 = () => {}
class Point6 {
  func1() {
    _func3.call(this) // 这样就成为了私有方法
  }
}
const p5 = new Point6()
// p5._func3() // 会报错的，因为已经处理为了私有方法
// _func3()// 这样调用？ 如果封装成了模块的话，没有暴露出去，在别的文件是无法使用的，所以这样定义的私有方法是可行的

// 8.3.利用symbol的唯一性
// 在a.js文件创建
// 在别的文件中如果想使用这个symbol定义的函数，就必须要拿到下面的这个定义的func4
// 这里只导出class,并没有到处func4，所以别的地方是无法调用的，这样就很安全了
// const func4 = Symbol('func4')
// export default class Point6 {
//   static [func4] () {

//   }
// }
// 在b.js中使用
import Point from 'a.js'
const p6 = new Point()
console.log(p6) // 这是没有func4那个方法的

// 9.私有属性（新的提案中可以添加#来定义私有属性,但是还没有发布），在ts中是可以有方式来定义私有属性的
class Point7 {
  // #ownProp = 12
}

// 10.在es6中新增了一个new.target属性，一般用于构造函数中，它返回new操作符后面的这个构造函数
// 在es6构造函数中使用
function Point8() {
  console.log(new.target) // new.target 就是Point8构造函数本身
}
const p7 = new Point8()
const p8 = Point8() //如果是这样，不使用new，new.target就是undefined
// 在class中使用
class Point9 {
  constructor() {
    console.log(new.target) // new.target代表这个类本身
  }
}
const p9 = new Point9()
// 如果在继承中，new.target代表子类，不代表父类
class Parent {
  constructor() {
    console.log(new.target) // new.target代表的子类本身，不是父类
  }
}
class Child extends Parent {
  constructor() {
    super()
  }
}
const c = new Child()
// 应用：可以实现不能通过父类来创建实例，只能通过字类来创建实例：
class Parent2 {
  constructor() {
    if (new.target === Parent) {
      throw new Error('不能实例化')
    }
  }
}
class Child2 extends Parent2 {
  constructor() {
    super()
  }
}
// const c = new Parent() // 这样就报错了
const c2 = new Child2() // 只能通过子类来创建实例
