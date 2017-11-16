module.exports = function(gulp, $) {
  var browserSync = require('browser-sync').create();
  var reload = browserSync.reload;

  
  gulp.task('serve', ['inject', 'nodemon'], function () {
    var files = [
        'app/**/*.*',
        'client/**/*.*'
    ];
  
    //gulp.run(["node"]);
    browserSync.init({
        proxy: 'http://localhost:3009',
        browser: 'chrome',
        notify: false,
        port: 4000,
        reloadDelay: 200,
        baseDir: './'
    });
  
    //gulp.watch(files).on('change', reload);
    gulp.watch(['client/src/**/*.*'], ['inject', reload]);
  });
}