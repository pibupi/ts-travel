// 0.普通定义函数方式
function add2(arg1: number, arg2: number): number {
  return arg1 + arg2
}
// 使用箭头函数
//  

// 1.不使用接口定义函数
let add3: (x: number, y: number) => number // 指定返回值为number
add3 = (arg1: number, arg2: number): number => arg1 + arg2
// add3 = (arg1: string, arg2: number) => arg1 + arg2 // 报错了
let arg3 = 3 // 如果在外部定义一个变量，就不需要把这个变量定义在函数类型里了，可以直接使用
add3 = (arg1: number, arg2: number) => arg1 + arg2 + arg3

// 2.接口定义函数类型
type Add = (x: number, y: number) => number
let addFunc: Add
addFunc = (arg1: number, arg2: number) => arg1 + arg2

// 3.下面这种情况个数是固定的了
// addFunc = (arg1, arg2, arg4) => arg1 + arg2 + (arg4 ? arg4 : 0)

// 4.定义可选参数:可选参数必须在必选参数后面(在js中如果可选在前面不传参是需要传入undefined占位的)
type AddFunction = (arg1: number, arg2: number, arg3?: number) => number
let addFunction: AddFunction
addFunction = (x: number, y: number) => x + y
addFunction = (x: number, y: number, z: number) => x + y + z

// 5.默认参数
// 在js中默认参数：
// const fun = (a, b) => {
//   b = b || 0 // 需要做这么一个操作
//   return a + b
// }
// 可以省略类型：ts会自动检测类型
let addFunctions = (x: number, y = 3) => x + y
console.log(addFunctions(1))

// 6.剩余参数
const handleData = (arg1: number, ...args: number[]) => {
  //
}

// 7.重载
// 定义函数重载只能用function来定义，不能使用接口来定义
// ts中允许定义函数重载，来根据传入不同的参数类型或个数来判断该函数返回的结果
function handleData2(x: string): string[] // 函数重载
function handleData2(x: number): number[] // 函数重载
// 函数实体，不是重载的一部分
function handleData2(x: any): any {
  if (typeof x === 'string') {
    return x.split('')
  } else {
    return x
      .toString()
      .split('')
      .map(item => Number(item))
  }
}
// 利用重载可以根据传入的不同的参数检测到使用的函数时候返回的类型
// handleData2('abc').map((item) => {
//   return item.toFixed() // 可以看到已经报错了，因为每一项都是字符串
// })
// handleData2(123).map((item) => {
//   return item.length // 报错了，因为每一项是数字
// })
console.log(handleData2('abc'))
console.log(handleData2(123))
