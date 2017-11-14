var spawn = require('child_process').spawn;
var pUtil = require('path');

module.exports = function serveLoader(gulp, $, opts) {
  var browserSync = opts.browserSync;
  var reload = browserSync.reload;
  // Watch Files For Changes & Reload
  gulp.task('serve', function() {

    $.nodemon({
      watch: [
        'app/**/*.*',
        'client/src/**/*.*'
      ],
      script: 'app/bin/www',
      ext: 'js html tpl',
      ignore: ['settings.js', 'node_modules', 'client'],
      stdout: false,
      env: {
        ENV: 'dev',
        DEBUG: 'express-app-boot:executor'
      }
    }).on('restart', function() {
      console.log('nodemon restarted');
    })
    browserSync({
      port: 4000,
      proxy: "localhost:3000",
      reloadDelay: 200, // Wait for the express server ready.
      notify: false,
      startPath: '/'
    });
    gulp.watch(['app/**/*.*'], reload);
    gulp.watch(['client/src/**/*.*'], ['vue:watch', reload]);
  });

};
