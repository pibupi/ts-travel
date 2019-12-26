// a.js
function func() {
  console.log('zh')
}
export default func
// 一个模块只能有一个export default;

// b.js
import func from 'a.js' // 名字可以随便起
// 直接引入就可以直接使用

// export default 其实就是到处了一个default变量,
export { func as default}
// import { default as func}
// 可以这样理解

// export default function func() {}  这是可以的,但是export是不行的,相当取把func函数赋值给defaul属性t 并导出去
// export default 'zh' 也可以直接导出一个字符串,这和export是不同的

// c.js
// export const name = 'lsion'
// export const aget = 18
// export const address = 'bejng'
// const sex = 'man'
// export default sex
// 该文件既有export 又有export default ,在引入的时候可以一起引入
// d.js
// import sex,{name,age} from 'c.js' // 这样引入

// e.js 合并写法,
// export { name, age } from './a'
// 相当于
// import { name, age } from './a'
// export { name, age }
// 这两种写法是引入并导出去了.在此文件中就不能使用了

// 起别名导出
// export { name as nameProp } from './a'
// export * from './a'
// export { name as default } from './a'

// export { default as Info } from './a'

// import () 方法,可以实现动态加载,比如按需加载路由
// webpack等工具已经实现了
// const status = 1
// if (status) {
//   import('./a')
// } else {
//   import('./b')
// }
