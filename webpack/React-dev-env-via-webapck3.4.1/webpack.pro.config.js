const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 提取组件内和外部的公共样式
const extractCommonCSS = new ExtractTextPlugin('assets/style/common.[contenthash:6].min.css');
const extractCSS = new ExtractTextPlugin('assets/style/[name].[contenthash:6].min.css');

module.exports = {

  // 入口文件配置
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),

    // 公共js
    vendor: ['react','react-dom']
  },

  // 文件输出配置
  // 告诉webpack怎样存储输出以及存储在哪里
  output: {
    filename: 'assets/js/[name].[chunkhash:6].min.js',

    // chunkFilename参数指定的是除入口文件外的chunk的命名
    // 这些chunk通常是由于webpack对代码的优化所形成的，比如因应实际运行的情况来异步加载
    chunkFilename: 'assets/js/[name].[chunkhash:6].chunk.js',

    // path 告诉webpack将结果存储到哪里
    // 输出目录的配置，模板、样式、脚本、图片等资源路径位置都相对于path
    path: path.join(__dirname, 'dist'),

    // publicPath 指在css、html等页面中，引用静态资源的根路径
    // 在生产环境中，它的值为服务器地址
    publicPath: '/',

    libraryTarget: 'umd'
  },

  // resolve 自动添加后缀，默认使用.js
  // 空字符串是为了resolve一些在import文件时不带文件扩展名的表达式
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],

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
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
        include: __dirname
      },
      
      // css modules 组件样式私有化
      // 详见：http://www.ruanyifeng.com/blog/2016/06/css_modules.html
      {
        test: /\.scss$/,
        //loader: 'style-loader!css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss-loader',
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: '[name]_[local]_[hash:base64:3]',
                minimize: true
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        }),
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'src/style')
      },

      // scss 全局样式
      {
        test: /\.scss$/,
        use: extractCommonCSS.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }),
        include: path.resolve(__dirname, 'src/style')
      },

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },

      {
        test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
        loader: 'file-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.(gif|jpe?g|png|ico)$/,
        loader: 'file-loader',
        exclude: /node_modules/,
      }
    ]
  },

  plugins: [

    extractCSS,
    extractCommonCSS,
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // webapck 会给编译好的代码片段一个id用来区分
    // 而这个插件会让webpack在id分配上优化并保持一致性。
    // 具体是的优化是：webpack就能够比对id的使用频率和分布来得出最短的id分配给使用频率高的模块

    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      sourceMap: false,
      minimize: true,
      compress: {
        drop_debugger: true,
        warnings: false,
        drop_console: true
      }
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // 很多库的内部，有process.NODE_ENV的判断语句，
    // 改为production。最直观的就是没有所有的debug相关的东西，体积会减少很多

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'index'],
      filename: 'assets/js/[name].[chunkhash:6].min.js'
    }),
    // 打包公共代码，对应入口文件的 vendor 字段
    // 'vendor' 就是把依赖库(比如react react-router, redux)全部打包到 vendor.js中
    // 一般依赖库放到前面，所以vendor放参数对象的第一个

    new webpack.optimize.CommonsChunkPlugin({
      name: 'webpack-runtime',
      filename: 'assets/js/webpack-runtime.[hash:6].js',
    }),
    // webpack 的 runtime 是一段帮助打包文件在浏览器运行的辅助代码，每次修改文件它都会变化。
    // 在使用 CommonsChunkPlugin 的情况下，webpack 会将 runtime 打包在最后一个 CommonsChunkPlugin 生成的 chunk 中。
    // 所以这里抽取出webpack的runtime代码，避免稍微修改一下入口文件就会改动vendor.js(公共代码)，导致原本有效的浏览器缓存失效。

    new HtmlWebpackPlugin({
      title: '产品模式',
      filename: 'index.html',
      // 文件名以及文件将要存放的位置

      //favicon:'./src/favicon.ico',
      // favicon路径

      template: './src/template.html',
      // html模板的路径

      inject: 'body',
      // js插入的位置，true/'head'  false/'body'

      //chunks: ['vendor', 'index'],
      // 指定引入的chunk，根据entry的key配置，不配置就会引入所有页面的资源

      //hash: true,
      // 自动给引入的 JS/CSS 文件尾部加上hash，如index.min.js?5e2dff44
      // 这样每次客户端页面就会根据这个hash来判断页面是否有必要刷新
      // 在项目后续过程中，经常需要做些改动更新什么的，一但有改动，客户端页面就会自动更新！

      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    })
  ],

}