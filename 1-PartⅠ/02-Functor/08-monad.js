// 单子
// Monad 函子是可以变扁的 Pointed 函子，IO(IO(x))
// 一个函子如果具有 join 和 of 两个方法并遵守一些定律就是一个 Monad

const fp = require('lodash/fp')
const fs = require('fs')

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

  join() {
    return this._value()
  }

  flatMap(fn) {
    return this.map(fn).join()
  }
}

let readFile = function (filename) {
  return new IO(function () {
    return fs.readFileSync(filename, 'utf-8')
  })
}

let print = function (x) {
  return new IO(function () {
    console.log(x);
    return x
  })
}

let r = readFile('package-lock.json')
  // .map(x => x.toUpperCase())
  .map(fp.toUpper)
  .flatMap(print)
  .join()

console.log(r);

