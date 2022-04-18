// MayBe 函子
// MayBe 函子的作用就是可以对外部的空值情况做处理（控制副作用在允许的范围）
class MayBe {
  static of(value) {
    return new MayBe(value)
  }

  constructor(value) {
    this._value = value
  }

  map(fn) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
  }

  isNothing() {
    return this._value === null || this._value === undefined
  }
}

// let res = MayBe.of(5)
//   .map(x => x * 2)
// console.log(res);
let res = MayBe.of('hello world')
  .map(x => x.toUpperCase())
  .map(x => null)
  .map(x => x.split(' '))
console.log(res);
