(function (modules) {

  // 15 定义webpackJsonpCallback实现：合并模块定义，改变promise 的状态，执行后续行为
  function webpackJsonpCallback (data) {
    // 01 获取需要被动态加载的模块id
    let chunkIds = data[0]
    // 02 获取需要被动态加载的模块依赖关系对象
    let moreModules = data[1]
    let chunkId, resolves = []
    // 03 循环判断chunkIds里对应的模块内容是否已经完成了加载
    for (let i = 0; i < chunkIds.length; i++) {
      chunkId = chunkIds[i]
      if (Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
        resolves.push(installedChunks[chunkId][0])
      }
      // 更新当前的chunk状态
      installedChunks[chunkId] = 0
    }

    for (moduleId in moreModules) {
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId]
      }
    }
    while (resolves.length) {
      resolves.shift()()
    }
  }


  // 01定义对象用于将来缓存被加载过的模块
  let installedModules = {}

  // 16 定义 installedChunks 对象 用于标识某个chunkId 对应的chunk是否完成了加载
  let installedChunks = {
    main: 0
  }

  // 02定义一个__webpack_require__方法来替换 import require 加载操作
  function __webpack_require__ (moduleId) {
    // 2-1 判断当前缓存中是否存在要被加载的模块内容 如果存在则直接返回
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports
    }
    // 2-2 如果当前缓存中不存在需要我们自定义{} 执行被导入的模块内容加载
    let module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    }
    // 2-3 调用当前moduleId 对应的函数 然后完成对内容的加载
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)

    // 2-4 当上述的方法调用完成后 修改l的值用于表示当前模块内容已经加载完成
    module.l = true
    // 2-5 加载工作完成后，将拿回来的内容返回至调用位置
    return module.exports
  }
  // 03定义m属性用于保存modules
  __webpack_require__.m = modules

  // 04 定义c属性用于保存 cache
  __webpack_require__.c = installedModules

  // 05 定义o方法用于判断对象的身上是否存在指定的属性
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty(object, property)
  }
  // 06 定义 d 方法 用于在对象的身上添加指定的属性，同时给该属性提供一个getter
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      object.defineProperty(exports, name, { enumerable: true, get: getter })
    }
  }
  // 07 定义r方法，用于标识当前模块是es6类型
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== undefined && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" })
    }
    Object.defineProperty(exports, '__esModule', { value: true })
  }
  // 08 定义n方法 用于设置具体的getter
  __webpack_require__.n = function (module) {
    let getter = module && module.__esModule ?
      function getDefault () { return module['default'] } :
      function getModuleExports () { return module }
    __webpack_require__.d(getter, 'a', getter)
    return getter
  }
  // 18 定义jsonpScriptSrc 实现src的处理
  function jsonpScriptSrc (chunkId) {
    return __webpack_require__.p + "" + chunkId + ".built.js"
  }

  // 17 定义 e 方法 用于实现jsonp来加载内容，利用 promise 实现异步加载操作
  __webpack_require__.e = function (chunkId) {
    // 01 定义一个数组存放promise
    let promises = []
    // 02 获取chunkId对应的chunk 是否已经完成了加载
    let installedChunkData = installedChunks[chunkId]

    // 03 依据当前是否已完成加载的状态来执行后续的逻辑
    if (installedChunkData !== 0) {
      if (installedChunkData) {
        promises.push(installedChunkData[2])
      } else {
        let promise = new Promise((resolve, reject) => {
          installedChunkData = installedChunks[chunkId] = [resolve, reject]
        })
        promises.push(installedChunkData[2] = promise)
      }

      // 创建标签
      let script = document.createElement('script')
      // 设置 src
      script.src = jsonpScriptSrc(script)
      // 写入script标签
      document.head.appendChild(script)
    }

    // 执行promise
    return Promise.all(promises)

  }

  // 11 定义 t 方法，用于加载指定的value的模块内容，之后对内容进行处理再返回
  __webpack_require__.t = function (value, mode) {
    // 01 加载value对应的模块内容 （value 一般就是模块id）
    // 加载之后的内容重新赋值给value
    if (mode & 1) {
      value = __webpack_require__(value)
    }
    if (mode & 8) { //加载了直接可以使用的内容 cms
      return value
    }
    if ((mode & 4) typeof value === 'object' && value && value.__esModule) { //esm
      return value
    }

    // 如果 8 和 4 都没有成立则自定义ns 来通过default属性返回内容
    let ns = Object.create(null)

    __webpack_require__.r(ns)

    Object.defineProperty(ns, 'default', { enumerable: true, value: value })

    if ((mode & 2) && typeof value !== 'string') {
      for (const key in value) {
        __webpack_require__.d(ns, key, function (key) {
          return value[key]
        }.bind(null, key))
      }
    }

    return ns

  }

  // 09 定义p属性 用于保存资源访问路径
  __webpack_require__.p = ""

  // 12 定义变量存放数组
  let jsonpArray = window['webpackJsonp'] = window['webpackJsonp'] = window['webpackJsonp'] || []

  // 13 保存原生的push方法
  let oldJsonpFunction = jsonpArray.push.bind(jsonpArray)

  // 14 重写原生的push方法
  jsonpArray.push = webpackJsonpCallback

  // 10 调用__webpack_require__方法执行模块导入与加载操作
  return __webpack_require__(__webpack_require__.s = './src/index.js')
})
  ({
    "./src/index.js":
      (function (module, exports, __webpack_require__) {
        let name = __webpack_require__(/*! ./login */ "./src/login.js")
        console.log('index.js 执行了')
        console.log(name, '<------')
      }),
    "./src/login.js":
      (function (module, exports) {
        module.exports = 'hello world'
      })
  })