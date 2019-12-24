exports.name = 'zh'
exports.age = 18
// 导出的其实是exports这个对象,name,age为exports下的属性

module.exports = function() {
  // 相当于export default
  console.log('zh')
}
