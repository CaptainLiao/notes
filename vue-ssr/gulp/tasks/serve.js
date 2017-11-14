module.exports = function(gulp, $, opts) {
  var browserSync = require('browser-sync').create();
  var reload = browserSync.reload;

  
  gulp.task('serve', ['nodemon'], function () {
    var files = [
        'app/**/*.*',
        'client/**/*.*'
    ];
  
    //gulp.run(["node"]);
    browserSync.init({
        proxy: 'http://localhost:3009',
        browser: 'chrome',
        notify: false,
        port: 4000
    });
  
    gulp.watch(files).on('change', reload);
  });
}