// interface
// 基础用法
// const getFullName = ({ firstName, lastName }) => {
//   return `${firstName} ${lastName}`
// }
// getFullName({
//   firstName: 'z',
//   lastName: 18
// })
// 上面我们希望传入的都是字符串，现在传入数值也是可以的，说明这不符合我们的要求，下面用接口来增强我们的类型校验
// 定义一个接口
interface NameInfo {
  firstName: string
  lastName: string
}
const getFullName = ({ firstName, lastName }: NameInfo): string => {
  return `${firstName} ${lastName}`
}
getFullName({
  firstName: 'z',
  lastName: 'h'
  // lastName: 18 // 这样就会报错了，我们已经定义了参数类型为string
})

// 可选参数
interface Vegetable {
  color?: string
  type: string
}
const getVegetables = ({ color, type }: Vegetable) => {
  return `A ${color ? color + '' : ''}${type}`
}
getVegetables({
  type: 'tomato',
  color: 'red' // color传不传都可以
  // size:2 // 如果多传入一个属性还是会报错，多余属性可以解决
})

// 绕过多余属性检查
// 1.可以是使用类型断言
interface Vegetable {
  color?: string
  type: string
}
getVegetables({
  type: 'tomato',
  color: 'red', // color传不传都可以
  size: 2 // 如果多传入一个属性还是会报错，多余属性可以解决
} as Vegetable) // 这样就不会报错了
// 2.使用索引签名
// 把Vegetable加上下面这句，也是可以解决的，可以传入任意多的属性，只要保证前面两个必传的有就行
interface Vegetable {
  color?: string
  type: string
  [prop: string]: any
}
getVegetables({
  type: 'tomato',
  color: 'red',
  size: 2
}) // 这样就不会报错了

// 3.类型兼容性
const vegetableInfo = {
  type: 'tomato',
  color: 'red',
  size: 2
}
getVegetables(vegetableInfo) // 这样也是可以解决的

// 只读属性
// 某个接口属性变为只读
interface Ronly {
  color?: string
  readonly type: string // 此时这个type就不能修改了
}
// 数组中的某一项变为只读
interface ArrInter {
  0: number
  readonly 1: string 
}
let arr5: ArrInter = [1, 'zh']
// arr[1] = 'b' // 不能修改！

// 定义函数接口
interface AddFunc {
  (num1: number, num2: number): number
}
// type AddFunc = (num1:number,num2:number) => number // 使用类型别名更为简洁
const add: AddFunc = (n1, n2) => n1 + n2 // 这样是可以的，返回的数字
// const add: AddFunc = (n1, n2) => `${n1}+${n2}` // 报错，不能返回字符串

// 定义索引类型
interface RoleDic {
  [id: number]: string
}
const role1: RoleDic = {
  0: 'super_admin'
  // '1': 'admin' // 这就不行了，上面已经定义属性类型为number
}

interface RoleDic2 {
  [id: string]: string // 定义字符串类型的属性，写数字也是可以的
}
const role2: RoleDic2 = {
  a: 'super_admin',
  1: 'admin' // 这样是可以的，以数字作为属性名的话，会先把数值转换为字符串作为属性名
}

// 接口的继承
// interface Vege {
//   color: string
// }
// interface Tomoto {
//   color: string
//   radius: number
// }
// interface Carrot {
//   color: string
//   length: number
// }
// 每个接口都有一个属性color,并且tomoto,carrot都属于蔬菜,这种场景就可以使用接口继承
interface Vege {
  color: string
}
interface Tomato extends Vege {
  radius: number
}
interface Carrot extends Vege {
  length: number
}
const tomato: Tomato = {
  radius: 1,
  color: 'red'
}
const carrot: Carrot = {
  length: 2,
  color: 'orange'
}

// 混合类型接口
// 在js中写一个计数器
// 在浏览器中放入如下代码
// let countUp = () => {
//   countUp.count++
// }
// countUp.count = 0
// countUp() // 执行一次该函数,count值就会加1
// console.log(countUp.count) // 1
// countUp()
// console.log(countUp.count) // 2
// 在ts中可以用混合接口来做这个事情
interface Counter {
  (): void
  count: number
}
const getCounter = (): Counter => {
  const c = () => {
    c.count++
  }
  c.count = 0
  return c
}
const counter: Counter = getCounter()
counter()
console.log(counter.count)
counter()
console.log(counter.count)
counter()
console.log(counter.count)
