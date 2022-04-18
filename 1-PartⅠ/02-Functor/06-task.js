// Task 异步执行 处理异步任务


const { task } = require('folktale/concurrency/task');
const fs = require('fs')
const { split, find } = require('lodash/fp');

function readFile(filename) {
  return task(resolver => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      if (err) resolver.reject(err)

      resolver.resolve(data)
    })
  })
}

readFile('package-lock.json')
  .map(split('\n'))
  .map(find(item => item.includes('version')))
  .run()
  .listen({
    onRejected: err => {
      console.log(err);
    },
    onResolved: value => {
      console.log(value);
    }
  })