// 柯里化案例
// 提取空白字符数组
// console.log('sd  das  sada '.match(/\s+/g));
// ''.match(/\s+/g)
// 提取数字数组
// console.log('safs12sfsa2134'.match(/\d+/g));
// [ '12', '2134' ]

const _ = require('lodash')

const match = _.curry(function (reg, str) {
  return str.match(reg)
})

const haveSpace = match(/\s+/g)
const haveNumber = match(/\d+/g)

// const filter = _.curry(function (func, array) {
//   return array.filter(func)
// })

const filter = _.curry((func, array) => array.filter(func))

const findSpace = filter(haveSpace)

// console.log(haveSpace('helloworld'))
// console.log(haveNumber('abc'))



console.log(filter(haveSpace, ['John Connor', 'John_Donne']))


console.log(findSpace(['John Connor', 'John_Donne']))