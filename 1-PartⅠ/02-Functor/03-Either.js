// Either 两者中的任何一个，类似于 if...else...的处理
// 异常会让函数变的不纯，Either 函子可以用来做异常处理

class Left {

  static of(value) {
    return new Left(value)
  }
  constructor(value) {
    this._value = value
  }

  map(fn) {
    return this
  }
}

class Right {
  static of(value) {
    return new Right(value)
  }
  constructor(value) {
    this._value = value
  }

  map(fn) {
    return Right.of(fn(this._value))
  }
}

function parseJSON(str) {
  try {
    return Right.of(JSON.parse(str))
  } catch (error) {
    return Left.of({ error: error.message })
  }
}

// let r1 = Right.of(12)
//   .map(x => x + 2)
// let r2 = Left.of(12)
//   .map(x => x + 2)
// console.log(r1, r2);


let r1 = parseJSON("{name: zs}")
let r2 = parseJSON('{"name": "zs"}')
  .map(x => x.name.toUpperCase())
console.log(r1, r2);