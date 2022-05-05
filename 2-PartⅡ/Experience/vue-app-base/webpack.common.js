const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const util = require('./util')

module.exports = {
  entry: util.resolve('./src/main.js'),
  output: {
    path: util.resolve('./dist'),
    filename: '[name].[hash:6].js'
  },
  resolve: {
    extensions: ['js', '.vue', '.json'],
    alias: {
      'assets': util.resolve('assets'),
      'pages': util.resolve('pages'),
      'public': util.resolve('public'),
      'components': util.resolve('components'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        use: 'eslint-loader',
        enforce: 'pre'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'my vue',
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      url: 'public/'
    }),
    new VueLoaderPlugin()
  ]
};

