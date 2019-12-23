//高级类型
// 1.交叉类型
// 1.交叉类型 & 符号
// 定义一个函数，传入两个对象，返回合并之后的一个新对象
const mergeFunc = <T, U>(arg1: T, arg2: U): T & U => {
  let res = {} as T & U
  res = Object.assign(arg1, arg2)
  return res
}
console.log(mergeFunc({ a: 'a' }, { b: 'b' }))
console.log(mergeFunc({ a: 'a' }, { b: 'b' }).a)

// 2.联合类型 type1 | type2 | type3 其中一种就可以
const getLengthFunc = (content: string | number): number => {
  if (typeof content === 'string') {
    return content.length
  } else {
    return content.toString().length
  }
}
console.log(getLengthFunc('abc'))
console.log(getLengthFunc(1234))
// console.log(getLengthFunc(false)) // 报错

// 3.类型保护
// 来看这么一个场景，我们都知道ts在编译阶段检查出来一些问题，但是有一些数据只有在代码运行起来之后才能知道它的结果
const valueList = [123, 'abc']
const getRandomValue = () => {
  // 这个函数会随机从上面数组中取一个值
  const number = Math.random() * 10 // 随机返回一个1-10之间的数字
  if (number < 6) {
    return valueList[0]
  } else {
    return valueList[1]
  }
}
const item = getRandomValue() // 因为这个值是随机返回的，返回123或'abc'，所以需要判断它的length属性，number没有length属性，string是有的
console.log(item)
// if (item.length) { // 如果是字符串就打印Length属性
//   console.log(item.length)
// } else {
//   console.log(item.toFixed()) // 如果没有Length说明返回的是数字
// }
// 如上写法会报错，因为这个函数返回的不一定是什么类型，鼠标放在item上可以看到，item的返回值是联合类型，只有运行时才知道，ts无法判断出来的，
// 这段代码在js中是没问题的，但是在ts中不行
// 解决办法：1.使用断言（缺点每个地方都要使用断言，代码冗余）
if ((item as string).length) {
  console.log((item as string).length)
} else {
  console.log((item as number).toFixed())
}
// 解决办法：2.使用类型保护
// 这种函数的写法适用于逻辑复杂一些的可以写成函数
// isString函数用来做判断value是否为string,返回值类型注意，类型保护通过is来写
// 比类型断言方便多了，
function isString(value: number | string): value is string {
  return typeof value === 'string'
}
if (isString(item)) {
  console.log(item.length)
} else {
  console.log(item.toFixed())
}
// 如果不复杂的可以使用typeof类型保护
// 要求：1.if((typeof item).includes('string')) //这种写法是不行的，只能写等号的形式
// 比如：在js中写如下代码：
// let str = 'abc'
// (typeof str).includes('string) // true  这在js中是可以的，但是在ts中是不行的，ts会把typeof作为类型保护
//      2.判断的匹配的类型必须为这4种：string、number、 boolean、symbol中的一种
// 其它的类型是可以使用的，但是不会被当成类型保护来使用，只是正常的判断类型
// 比如：typeof === 'object'是不行的
if (typeof item === 'string') {
  console.log(item.length)
} else {
  console.log(item.toFixed())
}
// 使用Instanceof实现类型保护
// 它用来判断一个实例是否是哪个构造函数创建的实例，或者在es6中判断是否是哪个类创建的
// 在ts中使用instanceof同样具有类型保护的效果
class CreateByClass1 {
  public age = 18
  constructor() {}
}
class CreateByClass2 {
  public name = 'zh'
  constructor() {}
}
function getRandomItem() {
  // 这个函数返回一个实例，随机的
  return Math.random() < 0.5 ? new CreateByClass1() : new CreateByClass2()
}
const item1 = getRandomItem()
if (item1 instanceof CreateByClass1) {
  console.log(item1.age)
} else {
  console.log(item1.name)
}

// 4.null 、 undefined(是任何类型的子类型)
let values = '123' // 这个属性其实相当于 let values: string | undefined = '132'这样的
// values = undefined // 所以赋值为undefined是可以的，可以开启配置选项strictNullChecks不让它能赋值为undefined
// string | undefined、string | null、string | undefined | null 这三种类型是完全不同的类型
// 开启严格模式之后，或者设置strictNullChecks为true,可选参数y就会被处理为number | nudefined联合类型,可以把鼠标放在y看看
// ts对可选属性和可选参数的处理是一样的，可选属性也会被加上这个undefined构成联合来行
const sumFunc = (x: number, y?: number) => {
  return x + (y || 0)
}

// 5.类型保护、类型断言
// 当我们的属性或参数是联合类型或any类型，不唯一的类型时，我们就可能使用类型保护来做一些类型的判断，
// 开启strictNullChecks的情况下，如果想让一个值是string这种类型，又可以是null,需要我们手动指定联合类型，
// 在处理逻辑的时候就需要判断你是string类型还是null类型了
const getLengthFunction = (value: string | null): number => {
  // if(value === null) { return 0}
  // else { return value.length}
  // 可以精简写成下面这样：
  return (value || '').length
}
// 在某些情况下，编译器是无法在声明变量前知道是否是Null的，所以需要使用类型断言手动指明这个值不是Null
function getSplicedStr(num: number | null): string {
  // 返回拼接后的字符串
  // 这个嵌套函数，编译器是无法知道嵌套函数内部的变量是否为null的，我们就需要使用类型断言
  function getRes(prefix: string) {
    // 把传进来的这个num取正转换成字符串，拼接上前缀，返回出去
    return prefix + num!.toFixed().toString() //使用!来做类型断言，表示不为null，如果不做这个类型断言，会直接报错
  }
  num = num || 0.1
  return getRes('zh-')
}
console.log(getSplicedStr(3.03))

// 6.类型别名：给别的类型起一个别的名字，并不是创建了一个新的类型！
// interface-over-type-literal 建议设置为true,设置为false则不会自动转为type
type TypeString = string
let str2: TypeString //TypeString就代表了string
// 类型别名也可以使用泛型
type PositionType<T> = { x: T; y: T }
// interface PositionType<T> {
//   x: T
//   y: T
// }
const position1: PositionType<number> = {
  x: 1,
  y: -1
}
const position2: PositionType<string> = {
  x: 'left',
  y: 'top'
}
// 嵌套的方式,使用类型别名也可以在里面使用自己
// 只能在对象属性中自己使用自己
type Childs<T> = {
  current: T
  child?: Childs<T>
}
// interface Childs<T> {
//   current: T
//   child?: Childs<T>
// }
let ccc: Childs<string> = {
  current: 'first',
  child: {
    current: 'second',
    child: {
      current: 'third'
    }
  }
}
// type Childs = Childs[] // 报错
// 为接口起别名时不能使用extends 和 implements
// 接口和别名有时是可以起到一样的作用的
type Alias = {
  num: number
}
interface Interface {
  num: number
}
let _alias: Alias = {
  num: 132
}
let _interface: Interface = {
  num: 321
}
_alias = _interface
// 以上是可以兼容的
// 什么时候使用别名？什么时候使用接口？
// 当你要定义一个类型要用于拓展(要使用implements修饰的时候)使用接口
// 当无法使用接口并且需要使用联合类型或元组类型的时候用类型别名

// 7.字面量类型（字符串字面量，数字字面量）
type Name = 'zh' // 以字面量的形式定义类型，
const name9: Name = 'zh' // 这里就只能赋值为zh了
// const name9: Name = 's' // 赋值别的，这就报错了
// 使用联合类型使用多个字符串
type Direction = 'north' | 'east' | 'south' | 'west'
function getDirectionFirstLetter(direction: Direction) {
  // 传进一个方向，截取字母
  return direction.substr(0, 1)
}
console.log(getDirectionFirstLetter('north'))
// console.log(getDirectionFirstLetter('haha')) // 报错了，只能取上面4个值其中一个
// 数字字面量
type Age = 18
interface InfoInterfaces {
  name: string
  age: Age
}
const _info: InfoInterfaces = {
  name: 'zh',
  age: 18 // 不写18就会报错
}
// 8.枚举成员类型
// 能够作为类型使用的枚举要符合三个条件
// （1.不带初始值的枚举成员 2.值为里面成员的值为字符串字面量 3.值是数值字面量，或带有一个负号的数值字面量）
// 满足以上一个：枚举值和它的枚举成员都可以作为类型来使用

// 9.可辨识联合 以及 完整性检查 （单例类型指枚举成员类型，和字面量类型，symbol都可以）可以把单例类型，联合类型，类型保护和类型别名这几种
// 进行合并，来创建一个叫做可辨识联合的高级类，也可叫做标签联合或代数数据类型
// 可辨识联合要求两个要素：1.要具有普通的单例类型属性（特征）2.一个类型别名包含了哪些类型的联合（就是把几个类型封装为联合类型，并起个别名）
// 定义三个接口
interface Square {
  kind: 'square' // 单例类型作为特征  要素1
  size: number
}
interface Rectangle {
  kind: 'rectangle' // 单例类型
  height: number
  width: number
}
interface Circle {
  kind: 'circle' // 单例类型
  radius: number
}
function assertNever(value: never): never {
  throw new Error('Unexpected object:' + value)
}
type Shape = Square | Rectangle | Circle // 联合类型 要素2
//可辨识联合
function getArea(s: Shape): number {
  // 完整性检查:如果开启strictNullChecks，
  // 如果只写两个条件，
  // 比如传入一个'Circle'，
  // 如果没有开启strictNullChecks，可以让该函数返回一个undefined，是可以的，相当于是返回一个联合类型 number | undefined
  // 如果开启了strictNullChecks，那么下面少些一个类型，就会报错，提示缺少语句。下面并没有写Circle ,那么会默认返回一个Undefined,和返回值类型number，不一致,导致报错，少了一条分支
  // 以前没有strictNullChecks这个选项的时候，可以使用never类型，可以给switch添加一个default流程
  // 当前面都不符合的时候，执行default逻辑
  switch (s.kind) {
    case 'square':
      return s.size * s.size
      break
    case 'rectangle':
      return s.height * s.width
      break
    case 'circle':
      return Math.PI * s.radius ** 2 // 幂运算符：** ES7的特性  ***-> 立方
      break
    default:
      return assertNever(s) // 如果不开启strictNullChecks，会返回一个undefined，和返回值类型number，不一致，导致报错，可以定义一个default来开启提示
  }
}
// 使用never这种方式不仅能够在编译阶段提示我们遗漏了条件，而且在运行的时候也会报错，所以这种方式是比较好的，以后用到联合类型用到switch的时候，就可以用这种方式
