// IO 函子中的 _value 是一个函数，这里是把函数作为值来处理
// IO 函子可以把不纯的动作存储到 _value 中，延迟执行这个不纯的操作(惰性执行)，包装当前的操
// 作纯
// 把不纯的操作交给调用者来处理

const fp = require('lodash/fp')

class IO {

  static of(value) {
    return new IO(function () {
      return value
    })
  }

  constructor(fn) {
    this._value = fn
  }

  map(fn) {
    return new IO(fp.flowRight(fn, this._value))
  }
}

let r1 = IO.of(process)
  .map(p => p.execPath)

console.log(r1._value());