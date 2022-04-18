// promise实例
const promise = new Promise(function (resolve, reject) {
  // resolve(100)

  reject(new Error("promise rejected"))
})

promise.then(function (value) {
  console.log('resolved', value);
}, function (err) {
  console.log('rejected', err);
})

console.log('end');