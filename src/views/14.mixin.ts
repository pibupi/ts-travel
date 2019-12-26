// 混入就是把两个对象或者类的内容混合到一起，从而实现一些功能的复用
// 对象的混入
interface ObjectA {
  a: string
}
interface ObjectB {
  b: string
}
let Aa: ObjectA = {
  a: 'a',
}
let Bb: ObjectB = {
  b: 'b',
}
// 使用交叉类型是实现混入
let AB: ObjectA & ObjectB = Object.assign(Aa, Bb)
console.log(AB)
// // js中类的混入
// class A {
//   public funcA() {
//     console.log('here')
//   }
// }
// class B {
//   public funcB() {}
// }
// const mixin = (target, from) => {
//   Object.getOwnPropertyNames(from).forEach((key) => {
//     console.log(key)
//     target[key] = from[key]
//   })
// }
// const b = new B()
// console.log(b)
// b.funcA()

// ts中类的混入
class ClassAa {
  public isA: boolean
  public funcA() {}
}
class ClassBb {
  public isB: boolean
  public funcB() {}
}
class ClassAB implements ClassAa, ClassBb {
  public isA: boolean = false
  public isB: boolean = false
  public funcA: () => void
  public funcB: () => void
  constructor() {}
}
function mixins(base: any, from: any[]) {
  from.forEach((formItem) => {
    Object.getOwnPropertyNames(formItem.prototype).forEach((key) => {
      console.log(key)
      base.prototype[key] = formItem.prototype[key]
    })
  })
}
mixins(ClassAB, [ClassAa, ClassBb])
const ab = new ClassAB()
console.log(ab)
