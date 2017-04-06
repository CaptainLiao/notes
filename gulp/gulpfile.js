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


const
    fs   = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    plugins = gulpLoadPlugins(),
    sequence = require('gulp-sequence'),
    gulpCopy = require('gulp-file-copy'),
    proxy = require('http-proxy-middleware'),
    fileinclude = require('gulp-file-include'),
    pngquant = require('imagemin-pngquant'),
    mozjpeg = require('imagemin-mozjpeg'),
    merge = require('merge-stream');

const DIST = 'dist',
    SRC = 'dist';

const getFolders = (dir)=> {
    return fs.readdirSync(dir)
        .filter((file)=> {
            return fs.statSync(path.join(dir, file)).isDirectory();
        })
};
const getError = function(err) {
    console.log(err.toString());
    this.emit('end');
};


gulp.task('clean', function () {
   return del(['dist/**/*'])
});

gulp.task('clean-css', function () {
    return del(['dist/css/**/*.*'])
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


gulp.task('css', ()=> {
    let commonStyle = gulp.src('src/less/*.less',{base: 'src/less'})
        .pipe(plugins.changed(DIST, {extension: '.css'}))
        //.pipe(plugins.watch('src/less/*.less'))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.less())
        .on('error', getError)
        .pipe(plugins.autoprefixer({
            browsers: ['last 4 version','Android >= 4.0'],
            cascade: true,
            remove: true
        }))
        .pipe(plugins.concat('common.css'))
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename({suffix: '.min'}))
        //.pipe(plugins.rev())    // 添加md5
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(plugins.debug({title: '编译css:'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream({match: '**/*.css'}));
    // .pipe(gulp.rev.manifest())
    // .pipe(gulp.dest('dist/rev'))
    let lessPath = 'src/less';
    let folders = getFolders(lessPath);

    let folderStyle = folders.map((folder)=> {
        let newPath = path.join(lessPath, folder, '/*.less');
        return gulp.src(newPath)
            .pipe(plugins.changed(DIST, {extension: '.css'}))
            //.pipe(plugins.watch(newPath))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.less())
            .pipe(plugins.autoprefixer({
                browsers: ['last 4 version','Android >= 4.0'],
                cascade: true,
                remove: true
            }))
            .pipe(plugins.concat(folder+'.css'))
            .pipe(plugins.minifyCss())
            .pipe(plugins.rename({suffix: '.min'}))
            //.pipe(plugins.rev())    // 添加md5
            .pipe(plugins.sourcemaps.write('.'))
            .pipe(plugins.debug({title: '编译foldercss:'}))
            .pipe(gulp.dest('dist/css/'+folder))
            .pipe(browserSync.stream({match: '**/*.css'}));
    });
    return merge(commonStyle, folderStyle);
});

gulp.task('es6ToEs5', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(plugins.changed(DIST, {extension: '.js'}))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
        .on('error', getError)
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
            replaceReved: true		//根据rev-manifest.json的规则替换html里的路径，由于替换是根据rev-manifest.json规则来的，所以一定要先生成这个文件再进行替换
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream({match: '**/*.css'}));
        //.pipe(plugins.notify('md5 success!!!!'))
});


gulp.task('copy', function () {
    let start = 'src/lib/*.*',
        start2 = 'src/images/**/*.*';
    let copyLib = gulp.src(start)
        .pipe(plugins.changed(DIST))
        .pipe(gulpCopy('dist/lib', {
            start: 'src/lib'
        }));

    let copyImages = gulp.src(start2)
        .pipe(plugins.changed(DIST))
        .pipe(plugins.imagemin(
            [pngquant(), mozjpeg()],
            {verbose: true}
        ))
        .pipe(gulp.dest('dist/images'));
    return merge(copyLib, copyImages)
});

gulp.task('injectFile', function () {
   let target = ['src/*.html','!src/_head.html'],
       target2 = ['dist/lib/*.js', 'dist/js/*.js', 'dist/css/*.css'],
       sources = gulp.src(target2, {'read': false});
   return gulp.src(target)
       .pipe(plugins.changed(DIST))
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
    gulp.watch(['src/**/**'])
        .on('change', function (event) {
            if(event.type == 'deleted') {
                let _path = event.path,
                    cssPath = _path.replace(/src\\less/, 'dist\\css');
                console.log(cssPath);
                if(path.extname(_path) === '.less') {
                    del(path.dirname(cssPath)+'/*.*');
                    sequence('rev', 'injectFile');
                }else {
                    del(_path.replace(/src/, 'dist'))
                }

            }
        })
        .on('error', function (err) {
            console.log(err)
        });
    //browserSync.watch('./src/**/*.*').on('change',reload);
    //browserSync.watch('./dist/**/*').on('change',reload);
});

gulp.task('dev', sequence('clean', ['rev', 'es6ToEs5','copy'], 'injectFile', 'server'));


gulp.task('build-pro', sequence('clean',['rev', 'es6ToEs5', 'copy'],'injectFile', 'del-maps'));
