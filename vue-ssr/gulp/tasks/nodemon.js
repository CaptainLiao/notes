module.exports = function (gulp ,$) {

  gulp.task("nodemon", function() {
      $.nodemon({
          script: 'app/bin/www',
          watch: ['app'],
          igonre: ['node_modules'],
          ext: 'js html',
          env: {
              'NODE_ENV': 'development'
          }
      })
  });
}