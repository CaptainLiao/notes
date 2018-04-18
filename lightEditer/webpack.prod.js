const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

// 提取组件内和外部的公共样式
const extractCommonCSS = new ExtractTextPlugin('assets/style/common.[chunkhash:6].min.css');
const extractCSS = new ExtractTextPlugin('assets/style/[name].[chunkhash:6].min.css');


module.exports = {
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    filename: 'assets/js/[name].[chunkhash:6].min.js',

    // chunkFilename参数指定的是除入口文件外的chunk的命名
    // 这些chunk通常是由于webpack对代码的优化所形成的，比如因应实际运行的情况来异步加载
    chunkFilename: 'assets/js/[name].[chunkhash:6].chunk.js',

    path: path.resolve(__dirname, 'dist'),

    publicPath: './',

    libraryTarget: 'umd'
  },

  resolve: {
    extensions: [
      '.ts', '.tsx',
      '.js',
      '.jsx'
    ],
  },

  module: {
    rules: [      
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true
            }
          }
        ],
        include: path.resolve(__dirname, 'src')
      },
      // css modules 组件样式私有化
      // 详见：http://www.ruanyifeng.com/blog/2016/06/css_modules.html
      {
        test: /\.less$/,
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
            'less-loader'
          ]
        }),
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'src/style')
      },

      // less 全局样式
      {
        test: /\.less$/,
        use: extractCommonCSS.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'less-loader'
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
        options: {
          name: '[path][name].[ext]?[hash]'
        }
      },
    ]
  },
  plugins: [
    extractCommonCSS,
    extractCSS,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'), // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      __DEV__: false
    }),

    new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
      filename: 'fuck.html',
      template: 'src/index.html',
      title: '生产模式',
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
  ]
}
