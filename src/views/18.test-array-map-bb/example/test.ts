import arrayMap = require('../dist/test-array-map-dd')
const res = arrayMap([1, 2], (item) => {
  return item + 2
})
res.forEach((item) => {
  console.log(item.toFixed)
  // console.log(item.length)
})
// console.log(res)
