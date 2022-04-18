// 1.将异步代码使用Promise的方法改进
setTimeout(function () {
  var a = 'hello'
  setTimeout(function () {
    var b = 'world'
    setTimeout(function () {
      var c = 'I ❤️ U'
      console.log(a + b + c)
    }, 10);
  }, 10);
}, 10);

// function promise(str) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => { resolve(str) }, 10)
//   })
// }

// async function showStr() {
//   let a = await promise('hello')
//   let b = await promise('world')
//   let c = await promise('I ❤️ U')
//   console.log(a + b + c);
// }
// showStr()

new Promise(resolve => {
  var a = 'hello'
  resolve(a)
}).then(resA => {
  var b = 'world'
  return resA + b;
}).then(resB => {
  var c = 'I ❤ U'
  console.log(resB + c)
})
//
// async function showStr() {
//   let a = await Promise.resolve('helloP')
//   let b = await Promise.resolve('world')
//   let c = await Promise.resolve('IU')
//   console.log(a + b + c)
// }
// showStr()


Promise.resolve('hello')
  .then((value) => {
    return value + 'world';
  })
  .then((value) => {
    return value + 'I ♥ U';
  })
  .then((value) => console.log(value));