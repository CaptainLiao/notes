/**
 * gulp mask list
 *
 * gulp-load-plugins
 *
 * babel, less, uglify, browser-sync, del, autoprefixer, concat, minifyCss, rename
 * sourcemaps, inject, notify
 *
 */

const APIURL = 'http://192.168.1.30:6760';
const ISPROXY = false;

const DEV_PRO = false;


const gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    plugins = gulpLoadPlugins(),
    sequence = require('gulp-sequence'),
    gulpCopy = require('gulp-file-copy'),
    proxy = require('http-proxy-middleware'),
    fileinclude = require('gulp-file-include');

const DIST = 'dist',
    SRC = 'dist';

gulp.task('clean', function () {
   return del(['dist/**/*'])
});

gulp.task('clean-css', function () {
    return del(['dist/css/*.*'])
});

gulp.task('clean-js', function () {
    return del(['dist/js/*.*'])
});

gulp.task('include', function () {
   return gulp.src('src/*.html')
       .pipe(plugins.changed(DIST))
       .pipe(fileinclude({
           prefix: '@@',
           basepath: '@file'
       }))
       .pipe(plugins.debug({title: '文件引入:'}))
       .pipe(gulp.dest('dist'))
});

gulp.task('css', function () {
    return gulp.src('src/less/**/*.less',{base: 'src/less'})
        .pipe(plugins.changed(DIST, {extension: '.css'}))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer({
            browsers: ['last 4 version','Android >= 4.0'],
            cascade: true,
            remove: true
        }))
        .pipe(plugins.concat('main.css'))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename({suffix: '.min'}))
        //.pipe(plugins.rev())    // 添加md5
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(plugins.debug({title: '编译css:'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream({match: '**/*.css'}));
        // .pipe(gulp.rev.manifest())
        // .pipe(gulp.dest('dist/rev'))
});

gulp.task('es6ToEs5', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(plugins.changed(DIST, {extension: '.js'}))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
        //.pipe(plugins.concat('main.js'))
        .pipe(plugins.uglify())
        .pipe(plugins.rename({suffix: '.min'}))
        //.pipe(plugins.rev())
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(plugins.debug({title: '编译js:'}))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream({match: '**/*.js'}));
});

gulp.task('rev',['css'],function() {
    return gulp.src(['dist/rev/rev-manifest.json','dist/*.html'])  //获取rev-manifest.json和要替换的html文件
        .pipe(plugins.revCollector({
            replaceReved: true      //根据rev-manifest.json的规则替换html里的路径，由于替换是根据rev-manifest.json规则来的，所以一定要先生成这个文件再进行替换
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream({match: '**/*.css'}));
        //.pipe(plugins.notify('md5 success!!!!'))
});


gulp.task('copy', function () {
    let start = 'src/lib/*.*',
        start2 = 'src/images/**/*.*';
    gulp.src(start)
       .pipe(plugins.changed(DIST))
       .pipe(gulpCopy('dist/lib', {
           start: 'src/lib'
       }));

    gulp.src(start2)
        .pipe(plugins.changed(DIST))
        .pipe(gulpCopy('dist/images/', {
            start: 'src/images/'
        }));


});

gulp.task('injectFile', function () {
   let target = ['src/*.html','!src/_head.html'],
       sources = gulp.src(['dist/lib/*.js', 'dist/js/*.js', 'dist/**/*.css'], {'read': false});
   return gulp.src(target)
       .pipe(plugins.changed(DIST, {extension: '.html'}))
       .pipe(fileinclude({
           prefix: '@@',
           basepath: '@file'
       }))
       .pipe(plugins.inject(sources, {relative: true}))
       .pipe(plugins.debug({title: '注入:'}))
       .pipe(gulp.dest('dist'))
       .pipe(browserSync.stream({match: '**/*.html'}));
       //.pipe(plugins.notify('inject success'))
});

gulp.task('watch-css', function (callback) {
    sequence('rev', 'injectFile', callback)
});

gulp.task('watch-js', function (callback) {
    sequence('es6ToEs5', 'injectFile', callback)
});

gulp.task('del-maps', function () {
    return del(['dist/**/*.map']);
});

gulp.task('html-watch', ['injectFile'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('server', function() {
    const aipProxy = proxy('/api', {
        target: APIURL,
        changeOrigin: true,
        ws: true
    });

    if (!ISPROXY) {
        browserSync.init({
            // files:'**',
            server: {
                baseDir: './'
            }
        });
    }else {
        browserSync.init({
            server: {
                baseDir: './',
                middleware: [aipProxy]
            }
        });
    }

    gulp.watch(['src/*.html'], ['injectFile']);
    gulp.watch(['src/images/**/*.*'], ['copy']);
    gulp.watch(['src/less/**/*'], ['watch-css']);
    gulp.watch(['src/js/**/*.js', 'src/lib/*.*'], ['watch-js']);
    gulp.watch(['dist/*.html']).on('change', browserSync.reload);
    //browserSync.watch('./src/**/*.*').on('change',reload);
    //browserSync.watch('./dist/**/*').on('change',reload);
});

gulp.task('dev', sequence('clean','copy', 'rev', 'es6ToEs5', 'injectFile', 'server'));


gulp.task('build-pro', function () {
    sequence('clean','copy','rev', 'es6ToEs5', 'injectFile', 'del-maps')
});
