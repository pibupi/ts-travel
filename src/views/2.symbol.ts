// 接下来讲讲symbol，这个类型在ts中也是可以正常使用的，平时用的少，我自己也当复习吧
// 在index.ts入口文件中引入该文件，把basic-type.ts文件注释
// 一、基础
// symbol和其他number,string等基本类型是一样的，都属于基本类型
// 用来表示独一无二的值,和任何数据都不相同,包括它自己
// 要想使用symbol，需要在tsconfigd的target中引入es5/es6,如果使用到dom,还需引入dom这个库
const s = Symbol() // 此时s就是独一无二的symbol值
console.log(s)
const s2 = Symbol()
console.log(s2)
// 上面两次log都是打印Symbol()
// console.log(s === s2) // 把此代码放到控制台中去运行会返回false,说明它俩不相等

const s3 = Symbol('zh') // 创建Symbol值的时候可以传入一个字符串作为标识用
console.log(s3)
const s4 = Symbol('zh')
console.log(s3)
// console.log(s === s2)  此时还是false,字符串仅作为标识，但他们彼此之间是不相等的
// 就像两个有相同名字的人，名字虽相同，但是各自不同的两个人

const s5 = Symbol(123) // 传入数字会在内部调用toString()方法转成字符串'123'
console.log(s5)
// const s6 = Symbol({ a: 'b' })
// console.log(s6)
// 这样做在ts中是不行的，在ts中Symbol只能传入数字或字符串！！，可以把这句拿到浏览器中试一下，也会转成字符串
// 会返回Symbol([object Object])

// symbol值是不能和其他类型做运算的
// s4 + 12 // 会直接报错

// symbol值可以转换为字符串和布尔类型的值
console.log(s3.toString())
console.log(Boolean(s3))
console.log(!s4) // 还可以隐式取反

// symbol可以作为属性名
let prop = 'name'
// es6中定义属性名是非常灵活的
const info = {
  // name: 'zh'
  // [prop]: 'zh'
  [`my${prop}is`]: 'zh'
}
console.log(info)
// 通过symbol做为属性名，可以保证该对象中的属性都是独一无二的，不会被别的属性名覆盖，只能通过[s7]对值进行修改
const s7 = Symbol('zh')
const info2 = {
  [s7]: 'zh',
  age: 18,
  sex: 'man'
}
console.log(info2) // 打印出Symbol(zh): "zh"
// good
info2[s7] = 'haha'
console.log(info2) // 此时值已被膝盖
// bad
// info2.s7 = 'hehe' // 这样直接修改是不行的
// 获取属性值有两种方式：
console.log(info.name)
console.log(info[name])
// 在symbol作为属性时，只能通过[]的方式来获取

// 属性名的遍历（4种方式）
for (const key in info2) {
  console.log(key) // 可以看到symbol的属性名没有打印出来
}
console.log(Object.keys(info2)) // 此方式也没有打印出symbol的属性名
console.log(Object.getOwnPropertyNames(info2)) // 此方式也没有打印出symbol的属性名
console.log(JSON.stringify(info2)) // 此方式也没有打印出symbol的属性名
// 但是symbol并不是私有属性，还是有方法可以获取到的
console.log(Object.getOwnPropertySymbols(info2)) // 只打印出symbol属性名
console.log(Reflect.ownKeys(info2)) // 该方法会打印出所有属性名(包括symbol类型的属性名)
// 利用symbol作为属性名，可以实现es6种类的私有属性和方法的效果

// symbol的两个静态方法(Symbol.for,symbol.keyFor())
// 首先复习下之前定义Symbol的方式
const s8 = Symbol('zh')
const s9 = Symbol('zh')
// 上面这两种是不等的，前面已验证过了
const s10 = Symbol.for('ls')
const s11 = Symbol.for('ls')
// console.log(s8 === s9) // 在浏览器中执行，会返回true，说明是相等的
// 用symbol.for创建symbol值得时候，会先在全局中根据其中得字符串去找有没有使用该字符串创建过值，如果有的话会直接返回原来创建的那个值
// 如果没有找到，会创建一个symbol的值
const s12 = Symbol.for('haha')
// console.log(s11 === s12) // 在浏览器中执行，会返回false,因为没有用haha创建过symbol值
// 以上是symbol.for与symbol创建值的最大的一个区别，
// 那symbol.for会在全局中搜索有没有创建过以该字符串创建的值，这个全局包括当前页面，iframe,servesWorker

// Symbol.keyFor() 
// 接受的参数为Symbol.for()全局注册的symbol值，以symbol创建的是不行的
console.log(Symbol.keyFor(s10)) // 会返回创建该值的标识
