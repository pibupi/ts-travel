// 在语法的实现上，ts和es6的规范上还是有些区别的
// 之前我们学习过es6中的类，在ts中你会发现在同样的功能的上写法的不同
// 先说明一下，我们平时用es6语法编写代码又希望运行在不支持es6语法的浏览器上时，就需要用babel等工具把es6代码编译成es5的代码
// 所以运行的实际上都是编译后的js代码，ts本身是可以将编写的ts的代码直接编译成不同版本的代码，不需要babel等工具，当然也可以使用babel等工具进一步的进行编译
// 编译后的代码依然是es5的代码
// 1.ts中创建类，// public修饰符
class Point {
  public x: number
  public y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
  public getPosition() {
    return `(${this.x},${this.y})`
  }
}
const point = new Point(1, 2)
console.log(point)

// 2.ts中的继承
class Parent {
  public name: string
  constructor(name: string) {
    this.name = name
  }
}
class Child extends Parent {
  constructor(name: string) {
    super(name)
  }
}

// 3.private修饰符，在定义的这个类的外面是没法访问的，只能在这个类中进行访问
class Parent2 {
  private age: number
  constructor(age: number) {
    this.age = age
  }
  public getname() {
    return this.age
  }
}
const p2 = new Parent2(18)
console.log(p2.getname()) // 可以通过这种方式去访问私有属性
// console.log(p2.age) // 会报错，private定义的是私有的，实例不能访问
// console.log(Parent2.age) // 这个age属性实际上是定义在实例上的，但是在实例上又访问不到
class Child2 extends Parent2 {
  constructor(age: number) {
    // 通过super只能访问基类的公共方法和受保护方法
    super(age)
    // console.log(super.age) // 通过super也是访问不到的
  }
}

// 4.protected 受保护：和private的区别,super可以使用父类定义的protected方法
// 它可以在该类的子类中进行访问
class Parent3 {
  protected age: number
  constructor(age: number) {
    this.age = age
  }
  protected getAge() {
    return this.age
  }
}
const p3 = new Parent3(20)
// console.log(p.age) // 会报错，private定义的是私有的，实例不能访问
// console.log(Parent2.age) // 这个age属性实际上是定义在实例上的，但是在实例上又访问不到
class Child3 extends Parent3 {
  constructor(age: number) {
    super(age)
    // console.log(super.age) // 通过super只能访问基类的公共方法和受保护方法，受保护属性也是不行的
    console.log(super.getAge()) // 但是可以调用受保护的方法
  }
}
// protected 可以用来修饰constructor函数，修饰之后代表改类不能创建实例，只能被子类继承
// 在es6中是用new.target来判断的，在ts中只需添加protected修饰符即可
class Parent4 {
  protected age: number
  protected constructor(age: number) {
    this.age = age
  }
  protected getAge() {
    return this.age
  }
}
// const p4 = new Parent4(20) // 这里就报错了，只能通过子类去创建实例
class Child4 extends Parent4 {
  constructor(age: number) {
    super(age)
    console.log(super.getAge())
  }
}
const c2 = new Child4(20) // 只能通过子类创建实例

// 5.readonly修饰符
class UserInfo {
  // 设置只读的同时还要用其它3个修饰符其中一个配合
  public readonly name: string
  constructor(name: string) {
    this.name = name
  }
}
const userInfo = new UserInfo('lison')
console.log(userInfo)
// userInfo.name = 'haha' // 设置了只读，不能修改了

// 6.参数属性
// 之前都是在constructor前面定义属性，使用参数属性可以简化这个过程
class A {
  // 可以在这里使用修饰符，啥都行，比如：使用了public的话在实例上就会有name属性了，
  // 既可以限制属性类型，又可以直接把属性放在实例上，不需要this.name = name
  constructor(public readonly name: string) {}
}
const a1 = new A('lison')
console.log(a1)

// 7.公共static静态属性，实例不会添加和继承这个静态属性和方法
class Parent5 {
  public static age: number = 18
  public static getAge() {
    return Parent5.age
  }
  constructor() {}
}
const p = new Parent5()
// console.log(p.age) // 静态属性，实例不可以访问
console.log(Parent5.age) // 只有类本身能使用

// 8.私有static静态属性
class Parent6 {
  public static getAge() {
    return Parent5.age
  }
  private static age: number = 18
  constructor() {}
}
const p5 = new Parent6()
// console.log(p.age) // 私有属性，实例不可以访问
// console.log(Parent6.age) // 只有在类内部可以访问，外部也是访问不到的

// 9.可选类属性
class Info {
  public name: string
  public age?: number
  constructor(name: string, age?: number, public sex?: string) {
    this.age = age
    this.name = name
  }
}
const info1 = new Info('lison')
console.log(info1)
const info3 = new Info('lison', 10)
console.log(info3)
const info4 = new Info('lison', 18, 'man')
console.log(info4)

// 10.取值存值函数，和es6没有区别
class Info2 {
  public name: string
  public age?: number
  private _infoStr: string // 存和取都是操作这个私有属性
  constructor(name: string, age?: number, public sex?: string) {
    this.age = age
    this.name = name
  }
  get infoStr() {
    return this._infoStr
  }
  set infoStr(value) {
    console.log(`setter:${value}`)
    this._infoStr = value
  }
}
const info5 = new Info2('lison', 18, 'man')
info5.infoStr = 'lison:20' // 存值
console.log(info5.infoStr) // 取值

// 11.抽象类（用来被其他类继承，而不直接用它来创建实例）
// 抽象类和类内部定义的抽象方法都是用abstract关键字
abstract class People {
  constructor(public name: string) {}
  // 抽象方法只需要在基类里面定义方法名，参数，及返回值类型，具体实现需要在子类中实现
  public abstract printName(): void
}
// const people = new People() // 不能直接来创建实例，只能用来被其他类继承
class Man extends People {
  constructor(name: string) {
    super(name)
    this.name = name
  }
  public printName() {
    // 这个方法需要在子类中实现
    console.log(this.name)
  }
}
const m = new Man('lison')
m.printName()
// abstract不仅可以标记类和类中的方法，还可以标记类中定义的属性和存取器
abstract class People2 {
  public abstract _name: string
  // 在定义抽象方法或存取器的时候只需要定义方法名，参数类型，返回值类型，不需要写逻辑代码块
  abstract get insideName(): string
  abstract set insideName(value: string) // 存值器是不需要标返回类型的，不然会报错
}
class P extends People2 {
  public _name: string
  public insideName: string
}

// 12.实例属性(类既是一个值，也是一个类型)
class People3 {
  constructor(public name: string) {}
}
let p6 = new People3('lison')
// 这个可以不写，ts会根据new 的基类来自动推断出来
// let p6: People3 = new People3('lison')
class Animal {
  constructor(public name: string) {}
}
p6 = new Animal('haha') // 这样也是可以的
// 所以在实现对创建实例的类的判断的话还是需要用到instanceof关键字的

// 13.类类型接口(使用接口可以强制一个类必须包含某些内容)
interface FoodInterface {
  type: string
}
class FoodClass implements FoodInterface {
  public type: string
  // public static type: string // 这样是错误的，因为接口检测的是该接口定义的类创建的实例，这里设置了静态属性，那么在实例上是没有的，所以会报错！
  // static加上之后只是类本身有type属性，实例上是没有的，要保证创建的实例满足这个接口才可以
}

// 14.接口继承类（当接口继承了类之后，会继承这个类的成员，但不包括实现，也就是只继承它的成员及成员类型
// 接口还可以继承private,protected修饰的成员，当接口继承了这个类中包含这两个修饰符修饰的成员时，接口只
// 可被这个类或它的子类实现）
class A2 {
  protected name: string
}
interface I extends A {}
class B extends A implements I {
  public name: string
}

// 15.在泛型中使用类类型
// 这个函数表示，传入一个类作为泛型，然后返回一个实例
const create = <T>(c: new () => T): T => {
  return new c()
}
class Infos {
  public age: number
  constructor() {
    this.age = 18
  }
}
console.log(create<Infos>(Infos).age)
// console.log(create<Infos>(Infos).name) // 没有name 报错
