// 类型推断及类型兼容性
// 我们在一些时候可以省略类型的的指定，ts会自动推断出类型，学习ts类型推论来看下推论规则
// 类型兼容性就是为了适应js灵活特点，从而在一些情况下只要兼容的类型即可通过检测
// 先来看一个简单的栗子：
// 1. 类型推论
let name2 = 'zh' // 并没有给变量指定类型，ts会自动推论,这里可能需要一个字符串
// name = 123// 这里就会报错了
// 2.多类型联合
let arr7 = [1, 'a'] // 会把这个推论为联合类型 let arr7:Array<number | string> = [1,'a']
// arr7 = [2, 'b',false] // 放布尔值就会报错了
// 以上都是从右边的值类推论左边的变量是什么类型

// 3.上下文类型：（根据左边推论右边）
window.onmousedown = mouseEvent => {
  // console.log(mouseEvent.a) // 根据前面的方法，推论出你的参数为鼠标事件对象，上面没有a属性，所以会报错
}

// 4.类型兼容性
interface InfoInterface {
  name: string
  info: { age: number }
}
let infos: InfoInterface
const infos1 = { name: 'zh', info: { age: 18 } }
const infos2 = { age: 18 }
const infos3 = { name: 'zh', sex: 'man', info: { age: 20 } }
infos = infos1
// infos = infos2 // 报错，没有name字段
infos = infos3 // 多一些属性是可以的，但如果有对象就要按照约束来
// 检测方式是深层次递归检测的

// 5.函数兼容性
//  5.1参数个数
let x = (a: number) => 0
let y = (b: number, c: string) => 0
y = x
// x = y // 报错，后面的要小于等于前面的参数个数，为什么呢？
// 以下例子说明参数个数的重要性
const arr8 = [1, 2, 3]
arr8.forEach((item, index, array) => {
  console.log(item)
})
arr8.forEach(item => {
  console.log(item)
})
// 通过上面两个对arr8的forEach,可以看出来，forEach本身是需要3个参数的，那我们正常使用的时候可能只用到一个或两个参数，
// 所以可以得出结论，后面使用者的参数个数需要小于前面的参数个数
//  5.2参数类型
let b = (a: number) => 0
let q = (e: string) => 0
// b = q // 报错，参数类型是不对应的

//  5.3可选参数和剩余参数：注意类型要对应
const getSum = (
  arr: number[],
  callback: (...args: number[]) => number
): number => {
  return callback(...arr)
}
// 这个就比较灵活
// 传入任意个参数都可以
const res = getSum([1, 2, 3], (...args: number[]): number =>
  args.reduce((a, l) => a + l, 0)
)
console.log(res)
// 下面这个函数我不用任意个参数了，这样也可以
const res2 = getSum(
  [1, 2, 3],
  (arg1: number, arg2: number, arg3: number): number => arg1 + arg2 + arg3
)
console.log(res2)
// 两个方法进行对比，可以看出来，上面使用剩余参数的方式，函数更加灵活，下面这个实参变，形参就需要变

// 6.函数参数双向协变
let funcA = (arg: number | string): void => {}
let funcB = (arg: number): void => {}
funcA = funcB
funcB = funcA
// 这两个函数可以接受一个number类型，都是可以的
// 上面相互赋值都是可以的，可以通过tsconfig配置禁止使用双向协变

// 7.返回值类型
let k = (): string | number => 0
let z = (): string => 'a'
let j = (): boolean => false
k = z // 可以的
// z = k // 报错 ，因为z只能返回字符串,返回值类型不一致
// z = j // 报错

// 8.函数重载
function merge(arg1: number, arg2: number): number
function merge(arg1: string, arg2: string): string
function merge(arg1: any, arg2: any) {
  return arg1 + arg2
}
// merge(1,2).length 会报错
merge('1', '2').length
function sum(arg1: number, arg2: number): number
function sum(arg1: any, arg2: any): any {
  return arg1 + arg2
}
let funcs = merge // 此时,func是一个接口，并且它有两个重载
// func = sum // 不兼容的，报错，因为sum只有一个重载！

// 9.枚举
enum StatusInterface {
  On,
  Off
}
let h = StatusInterface.On
h = 1 // 可以的，在同一个枚举之间，只要是数值类型就可以
// 在不同枚举之间是不兼容的
enum StatusEnum {
  On,
  Off
}
enum AnimalEnum {
  Dog,
  Cat
}
let ss = StatusEnum.On
// s = AnimalEnum.Dog // 报错，不同枚举之间是不兼容的

// 10.类的兼容性（其实是比较实例的成员，类的静态成员和构造函数不进行比较）
class AnimalClass {
  public static age: number
  constructor(public name: string) {}
}
class PeopleClass {
  public static age: string
  constructor(public name: string) {}
}
class FoodClass2 {
  constructor(public name: number) {}
}
let animal: AnimalClass
let people: PeopleClass
let food: FoodClass2
animal = people // static静态属性是不检查的，这两个类都通过构造函数中的public给实例上添加了类型为字符串的name属性
// animal = food // 这个是不可以的，food中给实例添加的是number类型的name属性，而animal是string类型的name属性，所以不行

// private、protected 定义的成员会对兼容性造成影响
// （当检查类的实例的兼容性时，如果目标类型（被赋值的那个值）包含私有成员，
// 原来的值（用来赋值的值）必须包含来自同一个类的私有成员）
class ParentClass {
  private age: number
  // protected age: number
  constructor() {}
}
class ChildrenClass extends ParentClass {
  constructor() {
    super()
  }
}
class OtherClass {
  private age: number
  // protected age: number
  constructor() {}
}
const children: ParentClass = new ChildrenClass() // 子类可以兼容父类
// const other: ParentClass = new OtherClass() // 不行，报错

// 11.泛型的兼容性
// （泛型包含类型参数，参数可以是任何类型，使用时类型参数可以被指定为一个特定类型，这个类型是影响使用类型参数的部分）
// 下面这种是可以的，因为interface中啥都没有
interface Data<T> {}
let data1: Data<number>
let data2: Data<string>
data1 = data2 // Data里面是都是空对象，是可以的
// 下面这种是不行的
interface Data2<T> {
  data: T
}
let data3: Data2<number>
let data4: Data2<string>
// data3 = data4 报错 // 因为接口中要求有data属性，data3要求data属性类型为number类型，data4要求data属性为string类型，是不兼容的