const MyPromise = require('./04-myPromise');

function p2() {
  return new MyPromise(function (resolve, reject) {
    resolve('p2 resolve')
    // reject('p2 reject')
  })
}


p2().then(value => console.log(value)).catch(reason => console.log(reason))