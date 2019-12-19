// 一、布尔类型: boolean
// 1.直接定义并赋值
let bool: boolean = false
// 2.先定义类型，再进行赋值
let bool2: boolean
// good
bool2 = true
// bad 上面已定位bool2为布尔类型，此处会报错
// bool2 = 123;

// 二、数值类型: number
// 和js一样，所有数都是浮点数,没有其他复杂的比如二进制之类的,统一用number来声明
// good
let num: number = 123
num = 0b1111011 // 二进制
num = 0o173 // 八进制
num = 0x7b // 十六进制
// bad 上面已定位num为数值类型，此处会报错
// num = 'zh'

// 三、字符串类型:string
let str: string
str = 'bbb'
str = `数值是${num}` // 支持es6语法
console.log(str)
// 赋值其他类型都会报错

// 四、数组类型:Array
// 1.定义这样一个数组： [1,2,3]
let arr: number[] // 定义每一项为数值的数组
// good
arr = [1, 2, 3]
// bad
// arr = ['5', 3, 56]
// 2.第二种方式
let arr1: Array<number> // 含义同上
// 小伙伴儿们会想，一般数组中会有各种各样的元素，单单这一种类型是不够用的，那联合类型会解决这一问题
// 先来体验一下联合类型的两种写法吧：
let arr3: (string | number)[] // 注意要加上括号
let arr4: Array<string | number>
arr3 = [123, 'zh'] // 看！这样就可以了吧！

// 五、元组类型:tuple
// 可以这样理解：元组类型是已知长度(注意：在定义元组时length就已经确定了)并且已知类型的数组,而且顺序也要一致
let tuple: [string, number, boolean]
// good
tuple = ['a', 1, false]
// bad
// tuple = ['a'] // 只写了一个元素，不行
// tuple = ['a', false, 1] // 顺序不对，不行
// tuple = ['a', 1, false, 1, true] // 元素length(长度)不一致，不行

// 六、枚举类型
// 举个栗子：比如定义项目中的角色
enum Roles {
  SUPER_ADMIN,
  ADMIN,
  USER
}
console.log(Roles.SUPER_ADMIN) // 0
console.log(Roles.ADMIN) // 1
console.log(Roles.USER) // 2
// 也就是说这三个名字分别对应序列号：0，1，2 这个序号是自动的
// 在项目中判断角色的时候，服务端会返回来一组数字，所以在编写时：
// if(roles === 0) {} // 如果时超级管理员时做什么事情
// 如果角色多了的话还需要写个文档写明哪个数字代表什么角色
// 那有了枚举之后，就可以这样
// if(roles === Roles.SUPER_ADMIN){} // 这样比较直观很多
// 而且这个索引是可以自定义的，非常灵活
enum Roles1 {
  SUPER_ADMIN,
  ADMIN = 2,
  USER
}
console.log(Roles1.SUPER_ADMIN) // 0
console.log(Roles1.ADMIN) // 1
console.log(Roles1.USER) // 2
// 而且也可以反过来取值
console.log(Roles1[0]) // SUPER_ADMIN
console.log(Roles1[2]) // ADMIN
console.log(Roles1[3]) // USER

// 七、any类型
// js非常灵活，我们写的程序有些时候类型是未知的，在运行的时候才能确定这个值是什么类型，就可以用any
let value: any // 定义为any类型，就可以随便给它赋值了
value = 'aaa'
value = 1
value = true
const arr2: any[] = [1, 'a']
// 如果到处都是any类型，那么就失去了ts本身的意义，所以尽量不要用

// 八、void类型
// 它与any是相反的
// 如果定义一个函数，这个函数没有返回值，就可以用它来指定返回值类型
// 可以把undefined和null赋值给void，前提是在strictNullChecks选项开启的时候
let v: void = undefined
v = null
const func = (text: string): void => {
  console.log(text)
}
// good
func('abc')
// 切记：上面已指定了text为string,这里传入数值类型，就会直接报错！
// bad
// func(123)
// ts的好处，比如你在项目中写了一些公共的组件函数，那么别人在使用你的这个组件的时候，就会在编写阶段查找出错误，提高开发效率
// js中函数如果没有return ，那么默认返回值为undefined

// 九、null和undefined
// 在js中它俩是基础类型，在ts中它俩既是值又是类型
// 指定了改变量为undefined类型，那么就只能赋值为undefined
let u: undefined
// good
u = undefined
// bad
// u = 123
let n: null // null同上
// good
n = null
// bad
// n = 'aaa'
// null和undefined是其他类型的子类型（前提是strictNullChecks选项为false的情况下）
// 如果strictNullChecks为true,那么就能这样做了！
// 比如：
let num1: number = 123
num1 = undefined
num1 = null

// 十、never类型
// 不会有返回值的类型为never类型，以下是常见两种情况
// const errorFunc = (message: string): never => {
//   throw new Error(message)
// }
// errorFunc('aaa')
// const infiniteFunc = (): never => {
//   while (true) {}
// }
// never是其他任何类型的子类型，但是其它任何类型都不是never类型的子类型
// let neverVarible = (() => {
//   while (true) {}
// })() // 立即执行函数，返回值类型为never
// // neverVarible = 123 // 此时给never类型赋值就会报错
// num1 = neverVarible // 把never类型的值赋值给其他类型四可以的

// 十一、object
let obj = {
  name: 'zh'
}
let obj2 = obj
obj2.name = 'qt'
console.log(obj)
// 引用类型复制的值的地址，这个就不多价绍了,obj1也会跟着改变
function getObject(obj: object): void {
  console.log(obj)
}
// good
getObject(obj2)
// bad
// getObject(132) // 上面一定义了obj为object类型，赋值其他类型会报错

// 十二、类型断言
// 有些时候我们不希望ts来帮我们进行类型检查，交给我们自己来做（我们知道这个变量是什么类型）
// 有点像类型转换，把某个值强行转换为某个类型
// 定义一个函数，这个函数接受一个变量，如果这个变量是字符串(字符串是有length属性的)，那么就返回字符串的长度
// 如果是数字的话，就先通过toString()方法转换为字符串，再输出length
// const getLength = (target: string | number): number => {
//   if (target.length || target.length === 0) {
//     return target.length
//   } else {
//     return target.toString().length
//   }
// }
// 以上函数逻辑是没有问题的，但是ts会检测到错误，这种情况就可以通过类型断言来解决这个问题
// 断言有两种写法，都在下面，其中as语法会常用（jsx中只能用这种）
const getLength = (target: string | number): number => {
  if ((<string>target).length || (target as string).length === 0) {
    return (<string>target).length
  } else {
    return target.toString().length
  }
}
getLength(123)
getLength('abc')
// 这样就解决了如上问题
// 但是这样每一个都要断言，有些麻烦，还有别的解决办法么？
// 是有的，可以通过自定义类型保护来解决这个问题

