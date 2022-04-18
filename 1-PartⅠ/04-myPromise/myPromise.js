const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    try {
      // 执行器立即执行
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }

  }

  // promise 状态
  status = PENDING;

  // 成功后的值
  value = undefined;
  // 失败后原因
  reason = undefined;
  // 成功回调
  successCallback = []
  // 失败回调
  failCallback = []


  // 箭头函数 目的this执行实例对象
  resolve = value => {
    if (this.status !== PENDING) return
    // 将状态更改为成功
    this.status = FULFILLED
    this.value = value
    // this.successCallback && this.successCallback(this.value)
    while (this.successCallback.length) this.successCallback.shift()()

  }

  reject = reason => {
    if (this.status !== PENDING) return
    // 将状态更改为失败
    this.status = REJECTED
    this.reason = reason
    while (this.failCallback.length) this.failCallback.shift()()
  }

  then(successCallback, failCallback) {
    successCallback = successCallback ? successCallback : value => value;
    failCallback = failCallback ? failCallback : reason => { throw reason };
    let promise2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = successCallback(this.value);
            // 判断 x 的值是普通值还是promise对象
            // 如果是普通值 直接调用resolve 
            // 如果是promise对象 查看promsie对象返回的结果 
            // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e);
          }
        }, 0)
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason);
            // 判断 x 的值是普通值还是promise对象
            // 如果是普通值 直接调用resolve 
            // 如果是promise对象 查看promsie对象返回的结果 
            // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e);
          }
        }, 0)

      } else {
        // 等待
        // 将成功回调和失败回调存储起来
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value);
              // 判断 x 的值是普通值还是promise对象
              // 如果是普通值 直接调用resolve 
              // 如果是promise对象 查看promsie对象返回的结果 
              // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.reason);
              // 判断 x 的值是普通值还是promise对象
              // 如果是普通值 直接调用resolve 
              // 如果是promise对象 查看promsie对象返回的结果 
              // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e);
            }
          }, 0)
        });
      }
    });
    return promise2;
  }

  finally(callback) {
    return this.then(value => {
      return MyPromise.resolve(callback()).then(() => value)
      // callback();
      // return value;
    }, reason => {
      return MyPromise.resolve(callback()).then(() => { throw reason })
      // callback();
    })
  }

  catch(failCallback) {
    return this.then(undefined, failCallback)
  }

  static all(array) {
    let result = []
    let index = 0
    return new MyPromise((resolve, reject) => {
      function addData(key, value) {
        result[key] = value;
        index++;
        if (index === array.length) {
          resolve(result)
        }
      }
      for (let i = 0; i < array.length; i++) {
        let current = array[i]
        if (current instanceof MyPromise) {
          // promise对象
          current.then((value) => addData(i, value), reason => reject(reason))
        } else {
          // 普通值
          addData(i, current)
        }
      }
    })
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }

}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise #<Promise>"))
  }
  if (x instanceof MyPromise) {
    // x.then((value) => {
    //   resolve(value)
    // },
    //   (reason) => {
    //     reject(reason)
    //   })
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}

module.exports = MyPromise