var path = require('path');
let root = process.cwd()
let webpack = require('webpack')

module.exports = {
  output: {
    filename: '[name].js'
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
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
    new webpack.DefinePlugin({
      'process.env': 'development'
    })
  ]
};