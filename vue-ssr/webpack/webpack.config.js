var path = require('path');
let root = process.cwd()
let webpack = require('webpack')
console.log(path.join(root, 'client/src/main.js'))
module.exports = {
  entry: {
    app: path.join(root, 'client/src/main.js')
  },

  output: {
    filename: '[name]-2.js',
    path: path.join(root + '/app/build'),
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js'
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
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
};