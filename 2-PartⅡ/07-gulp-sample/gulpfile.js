exports.foo = done => {
  console.log('foo task working');

  // 标识任务完成
  done();
}

exports.default = done => {
  console.log('default task working');

  // 标识任务完成
  done();
}

const gulp = require('gulp')
gulp.task('bar', done => {
  console.log('bar working~');
  done()
})

// !任务串行 并行-------------------------------------------------------

const { series, parallel } = require('gulp')

const task1 = done => {
  setTimeout(() => {
    console.log('task1 working~')
    done()
  }, 1000)
}

const task2 = done => {
  setTimeout(() => {
    console.log('task2 working~')
    done()
  }, 1000)
}

const task3 = done => {
  setTimeout(() => {
    console.log('task3 working~')
    done()
  }, 1000)
}

// !让多个任务按照顺序依次执行
exports.foo = series(task1, task2, task3)

// !让多个任务同时执行
exports.bar = parallel(task1, task2, task3)

// !异步---------------------------------------------------------------
exports.callback = done => {
  console.log('callback task~');
  done()
}
exports.callback_error = done => {
  console.log('callback task~');
  done(new Error('callback failed!'))
}

exports.promise = () => {
  console.log('promise task~');
  return Promise.resolve()
}

exports.promise_error = () => {
  console.log('promise task~');
  return Promise.reject(new Error('task failed!'))
}

// ! async await-----------------------------------------------------
const timeout = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
exports.async = async () => {
  await timeout(1000)
  console.log('async task~');
}

//!stream ------------------------------------
const fs = require('fs')

exports.stream = () => {
  const readStream = fs.createReadStream('package.json');
  const writeStream = fs.createWriteStream('temp.txt');
  readStream.pipe(writeStream);
  return readStream
}

// 模拟
exports.stream = done => {
  const readStream = fs.createReadStream('package.json');
  const writeStream = fs.createWriteStream('temp.txt');
  readStream.pipe(writeStream);
  readStream.on('end', () => {
    done()
  })
}

// ! 读取流 转换流 写入流------------------------------------

const { Transform } = require('stream')
exports.default = () => {
  // 文件读取流
  const read = fs.createReadStream('normalize.css');
  // 文件写入流
  const write = fs.createWriteStream('normalize.min.css');
  // 文件转换流
  const transform = new Transform({
    transform: (chunk, encoding, callback) => {
      const input = chunk.toString();
      const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '');
      callback(null, output);
    }
  })

  read.pipe(transform).pipe(write);
  return read;
}

// !插件API-------gulp-clean-css ---gulp-rename--------------
const { src, dest } = require('gulp')
const cleanCss = require('gulp-clean-css')
const rename = require('gulp-rename')

exports.default = () => {
  return src('src/*.css')
    .pipe(cleanCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('dist'))
}
