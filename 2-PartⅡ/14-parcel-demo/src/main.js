// import $ from 'jquery'
import foo from './foo'
import './style.css'
import logo from './zce.png'

// 自动导入 自动配置
foo.bar()

// 支持动态导入
import('jquery').then($ => {
  $(document.body).append('<h1>Hello Parcel</h1>')

  $(document.body).append(`<img src="${logo}" />`)
})

if (module.hot) {
  module.hot.accept(() => {
    console.log('hmr')
  })
}
