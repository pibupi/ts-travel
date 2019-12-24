// 1.第一种导出方式
// export const name = 'lsion'
// export const aget = 18
// export const address = 'bejng'

// 2.第二种导出方式
// const name = 'lson'
// const age = 18
// const address = 'beijing '
// export {name,age,address}

// 3.可以导出函数和类
// export function func () {}
// export class A {}

// 4.可以为导出的变量函数类起别名
// function func1() {}
// class B {}
// const b = ''
// export {
//   func as Function1,
//   B as ClassB,
//   b as stringB,
//   b as String
// }
// 5.以下导出方式是错误的
//  5.1.export 'lsion' 是错误的，不能直接导出值，export到出的是一个接口!外部要通过这个接口获取值
//  5.2.const name = 'lsion'
//      export name// 错误的

// 6.导出的值在另一个文件引用并发生了变化，那么这个文件中的值也会发生相应的变化
// import { time } from './b'
// console.log(time)
// setInterval(()=>{
//   console.log(time)
// },1000)

// 7.export 语句不能出现在块级作用域中（比如放在if语句中是会报错的）
// es6中的模块设计属于静态编译，import语句在编译代码的时候已经引入进来了，而不是代码执行的时候才引入的

// 8.多个语句导出的内容，可以写成这样的方式
//  同时在引入的时候可以起别名
// 可以把export到处的看成是一个对象,引入的都是export上的每个属性
import {name as nameProp,age,info} from './c'
console.log(nameProp,age,info)
// 引入的这些变量是只读的，不能修改
// nameProp = 456 // 会报错
// 引入对象可以修改里面的属性
info.name = 'haha'
console.log(info)
// 为了方便排查问题，不建议修改引入模块里面的内容

// 9.引入整个文件,就可以执行模块里面的代码
import './d' // 模块中的内容为document.title = 'lison'

// 10.import 会提升到头部，先执行
getName() // 在之前也可以使用,但了规范,把Import写在最上面.
import {getName} from './e'

// import是编译时就要确定引入的东西的,不能动态的引入,
// 比如 import {  这是放一个变量之类的是不行的或者  'get' + "Name" 也是不行的}  from './e'

// 11.当import多个内容的时候,重复的导入,最后在编译的时候会合并成一个,只执行一次