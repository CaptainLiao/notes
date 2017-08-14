const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  // 入口文件配置
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
    vendor: ['react-dom']
  },

  // 文件输出配置
  // 告诉webpack怎样存储输出以及存储在哪里
  output: {
    filename: '[name]-bundle.js',

    // chunkFilename参数指定的是除入口文件外的chunk的命名
    // 这些chunk通常是由于webpack对代码的优化所形成的，比如因应实际运行的情况来异步加载
    chunkFilename: '[id]-bundle.js',

    // path 告诉webpack将结果存储到哪里
    // 输出目录的配置，模板、样式、脚本、图片等资源路径位置都相对于path
    path: path.join(__dirname, 'dist'),

    // publicPath 指在css、html等页面中，引用静态资源的根路径
    // 在生产环境中，它的值为服务器地址
    pubulicPath: '',
    
    libraryTarget: 'umd'
  },

  // resolve 自动添加后缀，默认使用.js
  // 空字符串是为了resolve一些在import文件时不带文件扩展名的表达式
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  externals: {
    // 通过cdn引入 react.min.js ,暴露出 'React' 全局对象
    // 在组件中 import React from 'react',这里的 'react' 就指向CDN引入的 'React'对象
    react: 'React'
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
    new webpack.optimize.OccurrenceOrderPlugin(),
    // webapck 会给编译好的代码片段一个id用来区分
    // 而这个插件会让webpack在id分配上优化并保持一致性。
    // 具体是的优化是：webpack就能够比对id的使用频率和分布来得出最短的id分配给使用频率高的模块

    new webpack.optimize.UglifyJsPlugin({
      // 压缩代码
      compressor: {
        warnings: false
      }
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // 很多库的内部，有process.NODE_ENV的判断语句，
    // 改为production。最直观的就是没有所有的debug相关的东西，体积会减少很多


    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-chunk.js' ),
    // 'vendor' 就是把依赖库(比如react react-router, redux)全部打包到 vendor.js中
    // 'vendor.js' 就是把自己写的相关js打包到bundle.js中
    // 一般依赖库放到前面，所以vendor放第一个

    new HtmlWebpackPlugin({
      title: '产品模式',
      filename:'index.html',
      // 文件名以及文件将要存放的位置

      //favicon:'./src/favicon.ico',
      // favicon路径

      template:'./src/template.html',
      // html模板的路径

      inject:'body',
      // js插入的位置，true/'head'  false/'body'

      chunks: ['vendor', 'index' ],
      // 指定引入的chunk，根据entry的key配置，不配置就会引入所有页面的资源

      hash:true,
      // 这样每次客户端页面就会根据这个hash来判断页面是否有必要刷新
      // 在项目后续过程中，经常需要做些改动更新什么的，一但有改动，客户端页面就会自动更新！

      minify:{
        // 压缩HTML文件
        removeComments:true,
        // 移除HTML中的注释

        collapseWhitespace:false
        // 删除空白符与换行符
      }
    })
  ],

}