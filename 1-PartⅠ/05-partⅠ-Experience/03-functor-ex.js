const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')
let maybe = Maybe.of([5, 6, 1])

// 练习1：使用 fp.add(x, y) 和 fp.map(f,x) 创建一个能让 functor 里的值增加的函数 ex1
//函子对象的 map 方法可以运行一个函数对值进行处理，
// 函数的参数为传入 of 方法的参数；接着对传入的整个数组进行遍历，
// 并对每一项执行 fp.add 方法

let ex1 = maybe.map(item => fp.map(fp.add(1), item))
// console.log(ex1);

// 练习2：实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素
let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])
let ex2 = xs.map((item) => fp.first(item))
// console.log(ex2);

// 练习3：实现一个函数 ex3，使用 safeProp 和 fp.first 找到 user 的名字的首字母

// 调用 ex3 函数传入 user 对象，safeProp 是经过柯里化处理的，
// 可以先传“属性”参数，后传“对象”参数。
// safeProp 函数处理后返回 user 的值，再调用fp.first 获取首字母
let safeProp = fp.curry(function (x, o) {
  return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert' }
let ex3 = fp.flowRight(fp.map(item => fp.first(item)), safeProp('name'))
// console.log(ex3(user));

// 练习4：使用 Maybe 重写 ex4，不要有 if 语句

// MayBe 函子用来处理外部的空值情况，防止空值的异常，拿到函子的值之后进行 parseInt 转化
let ex4 = n => Maybe.of(n).map(parseInt)
console.log(ex4('1'));