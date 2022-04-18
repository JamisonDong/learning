// Grunt的入口文件
// 用于定义一些需要Grunt自动执行的任务
// 需要导出一个函数
// 此函数接受一个grunt的形参，内部提供一些创建任务时可以用到的API
const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')


module.exports = grunt => {

  // 任务失败会导致后面无法执行
  grunt.registerTask('bad', () => {
    console.log("bad grunt~");
    return false
  })

  grunt.registerTask('foo', () => {
    console.log("hello grunt~");
  })

  grunt.registerTask('bar', '任务描述', () => {
    console.log("other grunt~");
  })

  // default不需要加任务名
  grunt.registerTask('default', () => {
    console.log("default grunt~");
  })

  // 执行列表中的任务
  grunt.registerTask('default', ['foo', 'bad', 'bar'])

  // 异步
  grunt.registerTask('async-task', function () {
    const done = this.async()
    setTimeout(() => {
      console.log('async task working');
      done()
    }, 1000)
  })

  grunt.registerTask('bad-async', function () {
    const done = this.async()
    setTimeout(() => {
      console.log('async task working');
      // 异步失败标记
      done(false)
    }, 1000)
  })


  // !----------------------initConfig----------------------------------
  grunt.initConfig({
    // foo: {
    //   bar: 123
    // },
    build: {
      options: {
        foo: 'bar'
      },
      css: {
        options: {
          foo: 'css'
        },
      },
      js: '2'
    }
  })
  // grunt.registerTask('foo', () => {
  //   console.log(grunt.config('foo.bar'));
  // })

  // !------------------------多目标模式任务----------------------------------
  grunt.registerMultiTask('build', function () {
    console.log(this.options());
    console.log(`target ${this.target},data: ${this.data}`);
  })

  // !----------------------------插件使用------------------------------------
  grunt.initConfig({
    clean: {
      temp: "temp/*.js"
    }
  })
  grunt.loadNpmTasks('grunt-contrib-clean')


  // !-----------------------grunt-sass---------------------------------------

  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      main: {
        files: {
          'dist/css/main.css': 'src/scss/main.scss'
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      main: {
        files: {
          'dist/js/app.js': 'src/js/app.js'
        }
      }
    },
    watch: {
      js: {
        files: ['src/js/*.js'],
        tasks: ['babel']
      },
      css: {
        files: ['src/scss/*.scss'],
        tasks: ['sass']
      }
    }
  })
  grunt.loadNpmTasks('grunt-sass')



  // 自动加载所有grunt插件中的任务
  loadGruntTasks(grunt)
  grunt.registerTask('default', ['sass', 'babel', 'watch'])
}