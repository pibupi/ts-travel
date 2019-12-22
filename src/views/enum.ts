// 枚举在编译完之后就是一个真实的对象
// 枚举可以个一组难以理解的常量赋予一组含义直观的名字
// ts支持数字和字符串两种枚举

// 1.数组枚举
enum Status {
  Uploading = 3,
  Success = 2,
  Failed = 5,
}
console.log(Status.Uploading)
// console.log(Status['Success'])// 这种形式也可以，但是会自动转换成上面那种形式
// 也可以定义计算的值，但这样的话后面的都需要加上初始值，不然会报错
const test = 1
const getIndex = () => {
  return 2
}
enum Status2 {
  Uploading = test,
  Success = getIndex(),
  Failed = 5, // 上面定义计算值，所以这里要加上初始值，不能使用自动递增了
}
console.log(Status2.Success)

// 2.反向映射：可以通过属性名拿到索引，也可以通过索引拿到属性名
enum Status3 {
  Uploading = 3,
  Success = 2,
  Failed = 5,
}
console.log(Status3) // 有6个属性

// 3.字符串枚举：在这里面不能使用计算值来定义，或者使用其它枚举中的值
enum Message {
  Error = 'Sorry,error',
  Success = 'hello',
  Failed = Error, // 可以使用上面定义的常量
}
console.log(Message.Failed)

// 4.异构枚举（既包含字符串又包含数字）使用的少
enum Result {
  Failed = 0,
  Success = 'success',
}

// 5.枚举成员类型和联合枚举类型(当一个枚举值满足一定的条件的时候，那这个枚举的每个成员，和枚举值本身都可以作为类型来使用)
//  5.1 不带初始值的枚举成员 enum E {A}
//  5.2 值为字符串字面量 enum E {A = 'a'}
//  5.3 值为数值字面量或者带有负号的数值字面量 enum E {A = -1}
enum Animals {
  Dog = 1,
  Cat = 2,
}
interface Dog {
  type: Animals.Dog
}
const dog: Dog = {
  type: Animals.Dog,
  // type: Animals.Cat, // 这种就不匹配了，报错
}

// 联合类型
enum Status {
  Off,
  On,
}
interface Light {
  status: Status
}
const light: Light = {
  status: Status.On, // 可以是On  Off都可以
}

// 6.运行时的枚举
// 比如：在一个定时器中延迟多少秒之后再使用枚举值，但是接口之类的定义类型的，在编译之后是没有实际的东西的，
// 所以就不能在运行时的代码中去使用他们了

// 7. const enum 编译之后就是实际值了，不是对象了
// 我们一般使用枚举是用来提高代码的可读性
// 比如获取数据成功之后状态码为200
// res.code === Status.Success 就可以这样写了，Status.Success就是200，并不是对象了
const enum Animals1 {
  Dog = 1,
}
