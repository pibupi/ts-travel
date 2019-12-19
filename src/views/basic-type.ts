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