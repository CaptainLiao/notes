module.exports = function(gulp) {
  let webpack = require('webpack')
  let path = require('path')
  let webpackConfig = require(path.join(process.cwd(), 'webpack', 'webpack.config.js'))

  gulp.task('webpack', function(callback) {
    webpack(webpackConfig, function(err, stats) {
        if(err) console.log(err)
    });
  });
}
