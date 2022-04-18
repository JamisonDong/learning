// class Container {
//   constructor(value) {
//     this._value = value
//   }

//   map(fn) {
//     return new Container(fn(this._value))
//   }
// }

// let res = new Container(5)
//   .map(x => x + 1)
//   .map(x => x * x)

// console.log(res);

// 函子
// 容器：包含值和值的变形关系(这个变形关系就是函数)
// 函子：是一个特殊的容器，通过一个普通的对象来实现，该对象具有 map 方法，map 方法可以运
// 行一个函数对值进行处理(变形关系)
class Container {

  static of(value) {
    return new Container(value)
  }

  constructor(value) {
    this._value = value
  }

  map(fn) {
    return Container.of(fn(this._value))
  }
}

let res = Container.of(5)
  .map(x => x + 2)
  .map(x => x * x)

console.log(res);