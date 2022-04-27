const {
  Tapable,
  AsyncSeriesHook
} = require('tapable')

class Compiler extends Tapable {
  constructor(context) {
    super()
    this.context = context
    this.hooks = {
      done: new AsyncSeriesHook(['stats'])
    }
  }
  run (callback) {
    callback(null, {
      toJson () {
        return {
          entries: [], //当前次打包的入口信息
          chunks: [],//当前次打包的chunk信息
          modules: [], //模块信息
          assets: [], //当前次打包的资源
        }
      }
    })
  }
}

module.exports = Compiler
