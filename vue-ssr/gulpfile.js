 var browserSync = require('browser-sync').create();
 var reload = browserSync.reload;
 var nodemon = require('gulp-nodemon');
 let gulp = require('gulp')
 //这个可以让express启动
 gulp.task("node", function() {
     nodemon({
         script: 'app/bin/www',
         igonre: ['node_modules'],
         ext: 'js html',
         env: {
             'NODE_ENV': 'development'
         }
     })
 });
 
 
 gulp.task('serve', ['node'], function() {
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