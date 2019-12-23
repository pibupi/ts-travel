// 我们使用ts的最好的一个原因就是，使用它能够很好的约束api使用者规范的使用插件或者库，这就要求我们api的涉及既要全面，又要保证可重用性
// 我们可以在ts中使用泛型来让api支持多种类型的数据，同时又能够很好的支持类型结构的检查
// 定义一个函数，可以让它接受任何的参数并返回以第二个参数为长度，第二个参数为值的数组
const getArray = (value: any, times: number = 5): any[] => {
  return new Array(times).fill(value)
}
console.log(getArray(2, 3).map(item => item + 1)) // 这是可以的
console.log(getArray(3, 3).map(item => item.length)) // 这就不行了，因为数字没有length属性，打印出的都是undefined
// 虽然函数够灵活，传上什么值都可以，但是丢失了我们对类型的检测，这时候就可以泛型来进行约束：
// 下面函数的意思是，比如 传入一个number,那就是值也是Number,返回值有number组成的数组
const getArray1 = <T>(value: T, times: number = 5): T[] => {
  return new Array(times).fill(value)
}
// console.log(getArray1<number>(123, 4).map(item => item.length)) // 数值没有length,所以直接就报错了
console.log(getArray1<number>(123, 4).map(item => item.toFixed())) // 这样就会自动有提示啦

// 来看一个复杂一些的栗子,返回值为固定类型，固定长度的元组
const getArray2 = <T, U>(
  param1: T,
  param2: U,
  times: number
): Array<[T, U]> => {
  return new Array(times).fill([param1, param2])
}
// 如果不指定泛型变量，ts会自动推断出来
getArray2<number, string>(1, 'a', 3).forEach(item => {
  console.log(item[0])
  console.log(item[1])
  // console.log(item[0].length) // item[0]为数值类型，是不存在Length的，所以报错
  // console.log(item[1].toFixed()) // item[1]为字符串类型，是不存在toFixed的，所以报错
})

// 泛型定义函数类型
let getArray3: <T>(arg: T, times: number) => T[]
getArray3 = (arg: any, times: number) => {
  return new Array(times).fill(arg)
}
// getArray3(123, 3).map(item => item.length) // 每一项为数字，所以会报错
// 使用类型别名结合泛型
type getArray4 = <T>(arg: T, times: number) => T[]
let getArray4: getArray4 = (arg: any, times: number) => {
  return new Array(times).fill(arg)
}
// 使用接口结合泛型
interface getArray5<T> {
  (arg: T, times: number): T[]
  array: T[]
}

// 5.泛型约束（对泛型变量的条件限制）
// 泛型变量在定义结构得时候，在多个地方可以保证多个值是同一种类型，或者是由这个类型构成的其它元素
// 有时候对这个泛型变量也有一定的要求
interface ValueWithLength {
  length: number
}
// 泛型也是可以继承的
const getArray6 = <T extends ValueWithLength>(arg: T, times): T[] => {
  return new Array(times).fill(arg)
}
getArray6([1, 2], 3)
getArray6('abc', 3)
getArray6({
  length: 2,
}, 3) // 传入一个对象，添加length属性也是可以的
// getArray6(123, 3) // 我们想传入的泛型变量是可以有Length属性的，数字是不可以的

// 6.在泛型约束中使用泛型参数
// 定义一个对象，想要对只能访问对象上存在的属性做要求时就可以用到这种情况
const getProps = (object, propName) => {
  return object[propName]
}
const objs = {
  a: 'a',
  b: 'b',
}
getProps(objs, 'a')
getProps(objs, 'c') // 对象上没有c，但没有报错，需要用到泛型参数来约束
// 解决思路：让使用者在编译时就发现这种错误
// K相当于是一个联合类型，只能是a或者b ,是T当中的一员
const getProps2 = <T, K extends keyof T> (object: T, propName: K) => {
  return object[propName]
}
const objs2 = {
  a: 'a',
  b: 'b',
}
getProps2(objs2, 'a')
// getProps2(objs2, 'c') // 此时就已经报错了，参数2必须是参数1中的一员
