const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // devtool 指明了sourcemap的生成方式，它有七个选项，具体请参考 https://segmentfault.com/a/1190000004280859
  // sourcemap 的作用就是为调试代码提供便利
  // cheap-module-eval-source-map 绝大多数情况下都会是最好的选择，这也是下版本 webpack 的默认选项。
  devtool: 'cheap-module-eval-source-map',

  // 入口文件配置
  entry: [
    // 启用 react-hot-server，写在入口文件之前
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',

    // 项目入口文件
    path.resolve(__dirname, 'src/index.js')
  ],

  // 文件输出配置
  // 告诉webpack怎样存储输出以及存储在哪里
  output: {
    filename: 'bundle.js',

    // path 告诉webpack将结果存储到哪里
    // 输出目录的配置，模板、样式、脚本、图片等资源路径位置都相对于path
    path: path.join(__dirname, 'src'),

    // publicPath 指在css、html等页面中，引用静态资源的根路径
    // 在生产环境中，它的值为服务器地址
    publicPath: '/'
  },

  // resolve 自动添加后缀，默认使用.js
  // 空字符串是为了resolve一些在import文件时不带文件扩展名的表达式
  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: ['eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loaders: ['react-hot-loader/webpack', 'babel-loader'],
        exclude: /node_modules/,
      },

      // css modules 组件样式私有化
      // 详见：http://www.ruanyifeng.com/blog/2016/06/css_modules.html
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'src/style')
      },

      // CSS 全局样式
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?sourceMap!postcss-loader',
        include: path.resolve(__dirname, 'src/style')
      },

      {
        test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
        loader: 'file-loader'
      },
      {
        test: /\.(gif|jpe?g|png|ico)$/,
        loader: 'file-loader'
      }
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

