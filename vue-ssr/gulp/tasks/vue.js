

module.exports = function vueify(gulp, $) {
  const del = require('del');
  const runSequence = require('run-sequence');
  const $vueify = require('gulp-vueify2');
  
  gulp.task('vueify', function() {
    return gulp.src(['client/src/**/*.vue'])
      //.pipe($.changed('client/dist', { extension: '.js' }))
      .pipe($.vueify({
        babel: {
          "plugins": [
            ["transform-es2015-modules-commonjs", {
              "allowTopLevelThis": true
            }],
            ["transform-remove-strict-mode"]
          ]
        }
      }))
      .pipe(gulp.dest('client/dist'))
      .pipe($.size({
        title: 'vueify'
      }));
  });

  gulp.task('vue:clean', function() {
    del(['client/dist']);
  });

  gulp.task('vue:dist', function() {
    return gulp.src(['client/src/**/*.js'])
      .pipe($.changed('client/dist', { extension: '.js' }))
      .pipe(gulp.dest('client/dist'));
  });

  gulp.task('vue:copy', function() {
    return gulp.src(['client/dist/**/*.*'])
      .pipe($.changed('app/public/scripts/vue', { extension: '.js' }))
      .pipe(gulp.dest('app/public/scripts/vue'))
      .pipe($.size({
        title: 'vue:copy'
      }));
  });

  gulp.task('vue', ['vue:clean'], function() {
    runSequence('vueify', 'vue:dist', 'vue:copy');
  });
  gulp.task('vue:watch', function() {
    runSequence(['vueify'], ['vue:dist'], ['vue:copy']);
  });
};
