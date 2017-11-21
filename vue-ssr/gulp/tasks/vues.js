module.exports = function (gulp, $) {
  let webpack = require('webpack-stream')
  let webpack2 = require('webpack')
  let del = require('del')
  let path = require('path')
  let webpackConfig = require(path.join(process.cwd(), 'webpack', 'webpack.conf.js'))

  webpackConfig.externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex'
  }


  gulp.task('clean', function (cb) {
    return del('app/build/**')
  });

  gulp.task('vues', function () {
    return gulp.src('client/src/main.js')
      .pipe(webpack(webpackConfig))
      .pipe(gulp.dest('app/build'));
  });

  gulp.task('inject', ['clean', 'vues'], function (cb) {
    return gulp.src('client/index.html')
      .pipe($.inject(gulp.src('app/build/**/*.js', {
        read: false
      }), {transform: function (filePath) {return '<script src="' + filePath.substring(4) + '"></script>';}}))
      .pipe(gulp.dest('./app'));
  });

}