// import {name} from './b'
// import * as info from './b'
// import * as AData from './a'
// import { name as nameProp} from './b'
// import './a'
// console.log(AData)
// console.log(name)
// console.log(info)
// console.log(nameProp)
// import name from './c'
// console.log(name)
import name = require('./c')
console.log(name)
// 3中引入形式
// import moment from 'moment'
// import * as moment from 'moment'
import moment = require('moment')
console.log(moment)

// 名命空间：不推荐使用了，(使用模块多)
// 如果使用tsc编译的话，需要像下面这样引入
/// <reference path="./space.ts"/>
const isLetter = Validation.checkLetter('abc')
console.log(isLetter)
// 使用的时候:tsc --outFile src/index.js src/ts-modules/index.ts

// ts使用es5模块标准