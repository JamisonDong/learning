/**
 * 1.promise 就是一个类 在执行这个类的时候 需要传递一个执行器进去 执行器会立即执行
 * 2.promise 有三种状态 分别为 成功 fulfilled 等待 pending 失败 rejected
 *    pending -> fulfilled
 *    pending -> rejected
 * 3.resolve 和 reject 函数是用来改变状态的
 *    resolve -> fulfilled
 *    reject -> rejected
 * 4. then方法内部就是判断状态，根据状态调用回调   其定义在原型对象中
 * 5. then有参数 为成功的值 或失败的message
 */

const MyPromise = require('./myPromise')


let promise = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
  //   resolve('success')
  // }, 2000)
  // throw new Error('executor error')
  resolve('success')
  // reject('fail')
})


function other() {
  return new MyPromise((resolve, reject) => {
    resolve("other")
  })
}

function p1() {
  return new MyPromise(function (resolve, reject) {
    setTimeout(function () {
      resolve('p1')
    }, 2000)
  })
}

function p2() {
  return new MyPromise(function (resolve, reject) {
    // resolve('p2 resolve')
    reject('p2 reject')
  })
}


p2().then(value => console.log(value)).catch(reason => console.log(reason))

// MyPromise.all(['a', 'b', p1(), p2(), 'c']).then((value) => console.log(value), (reason) => console.log(reason.message))
// MyPromise.resolve(10).then(value => console.log(value), reason => console.log(reason))
// MyPromise.resolve(p1()).then(value => console.log(value), reason => console.log(reason))

// p2().finally(() => {
//   console.log('finally');
//   return p1();
// }).then(value => {
//   console.log(value);
// }, reason => {
//   console.log(reason);
// })

// let p1 = promise.then(value => {
//   console.log(value);
//   return p1
// });

// p1.then(value => {
//   console.log(value);
// }, reason => {
//   console.log(reason);
// })
// promise.then(value => {
//   console.log(value);
//   throw new Error('then error')
//   // return 'aaa'
// }, reason => {
//   console.log(reason);
// }).then(value => {
//   console.log(value);
// }, reason => {
//   console.log(reason.message);
// })
// promise.then(value => {
//   console.log(3);
//   console.log(value);
// }, reason => {
//   console.log(reason);
// })

// promise.then().then().then(value => console.log(value),reason=>console.log(reason))