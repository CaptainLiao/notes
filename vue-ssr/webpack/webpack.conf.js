var path = require('path');
let root = process.cwd()
let webpack = require('webpack')

module.exports = {
  output: {
    filename: '[name].js'
  },
  // devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json']
    //配置别名，在项目中可缩减引用路径
    // alias: {
    //   'vue$': 'vue/dist/vue.esm.js'
    // }
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: ['client/src']
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    // webapck 会给编译好的代码片段一个id用来区分
    // 而这个插件会让webpack在id分配上优化并保持一致性。
    // 具体是的优化是：webpack就能够比对id的使用频率和分布来得出最短的id分配给使用频率高的模块

    // new webpack.optimize.UglifyJsPlugin({
    //   beautify: false,
    //   comments: false,
    //   sourceMap: false,
    //   minimize: true,
    //   compress: {
    //     drop_debugger: true,
    //     warnings: false,
    //     drop_console: true
    //   }
    // }),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
    // 很多库的内部，有process.NODE_ENV的判断语句，
    // 改为production。最直观的就是没有所有的debug相关的东西，体积会减少很多
  ]
};