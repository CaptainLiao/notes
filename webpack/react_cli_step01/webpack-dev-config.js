const path = require('path');
const webpack = require('webpack');

module.exports = {
  // devtool 指明了sourcemap的生成方式，它有七个选项，具体请参考 https://segmentfault.com/a/1190000004280859
  // sourcemap 的作用就是为调试代码提供便利
  // cheap-module-eval-source-map 绝大多数情况下都会是最好的选择，这也是下版本 webpack 的默认选项。
  devtool: 'cheap-module-eval-source-map',

  // 入口文件配置
  entry: [
    // 启用 react-hot-server，写在入口文件之前
    "react-hot-loader/patch",
    "webpack-hot-middleware/client?reload=true",

    // 项目入口文件
    path.resolve(__dirname, 'src/index.js')
  ],

  // 文件输出配置
  // 告诉webpack怎样存储输出以及存储在哪里
  output: {
    filename: 'bundle.js',

    // path 告诉webpack将结果存储到哪里
    // 输出目录的配置，模板、样式、脚本、图片等资源路径位置都相对于path
    path: path.join(__dirname, 'dist'),

    // publicPath 指在css、html等页面中，引用静态资源的根路径
    // 在生产环境中，它的值为服务器地址
    pubulicPath: 'http://localhost:3000/'
  },

  // resolve 自动添加后缀，默认使用.js
  // 空字符串是为了resolve一些在import文件时不带文件扩展名的表达式
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  },

  plugins: [
    // 启用热替换，仅开发模式使用
    new webpack.HotModuleReplacementPlugin(),

    // 允许错误不打断程序，仅开发模式时用
    new webpack.NoErrorsPlugin()
  ]
}