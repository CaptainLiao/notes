const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  // devtool 指明了sourcemap的生成方式，它有七个选项，具体请参考 https://segmentfault.com/a/1190000004280859
  // sourcemap 的作用就是为调试代码提供便利
  // cheap-module-eval-source-map 绝大多数情况下都会是最好的选择，这也是下版本 webpack 的默认选项。

  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',

    path.resolve(__dirname, 'src/index.js')
  ],

  // 页面入口文件

  output: {
    filename: 'bundle.js',

    path: path.join(__dirname, 'dist'),
    // path 告诉webpack将结果存储到哪里
    // 输出目录的配置，模板、样式、脚本、图片等资源路径位置都相对于path

    publicPath: '/'
    // publicPath 指在css、html等页面中，引用静态资源的根路径
    // 在生产环境中，它的值为服务器地址
  },

  // resolve 自动添加后缀，默认使用.js
  // 空字符串是为了resolve一些在import文件时不带文件扩展名的表达式
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$$/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
        exclude: /node_modules/,

      },
    ]
  },
  plugins: [
    // 启用热替换，仅开发模式使用
    new webpack.HotModuleReplacementPlugin(),

    // 允许错误不打断程序，仅开发模式时用
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      __DEV__: true
    }),

    new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
      template: 'src/template.html',
      title: '开发模式',
      // favicon:'./src/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      hash: true,
      // 这样每次客户端页面就会根据这个hash来判断页面是否有必要刷新
      // 在项目后续过程中，经常需要做些改动更新什么的，一但有改动，客户端页面就会自动更新！
      inject: 'body'
    })

  ],
}