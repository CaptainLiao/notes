var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	del = require('del'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload,
	plugins = gulpLoadPlugins();

gulp.task("clean", function() {
	return del(['dist/*']);
})
gulp.task('clean-css', function() {
	return del(['dist/*/*.*'])
})
gulp.task('css', ['clean-css'],function() {
	return gulp.src('./src/less/*.less')
		//.pipe(plugins.watch('./src/less/*.less')) // 只重新编译被更改过的文件
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.less())
		.pipe(plugins.autoprefixer({
			browsers: ['last 2 version','Android >= 4.0'],
			cascade: true,
			remove: true
		}))
		.pipe(plugins.concat("index.css"))
		.pipe(plugins.minifyCss())
		// .pipe(plugins.rename(function(path){
		// 	path.basename = 'index';
		// 	path.extname = '.min.css';
		// }))
		.pipe(plugins.rename({suffix: '.min'}))
		.pipe(plugins.rev())		// 添加md5
		.pipe(plugins.sourcemaps.write()
		.pipe(gulp.dest('dist/css'))
		.pipe(plugins.rev.manifest())
		.pipe(gulp.dest('dist/rev'))
});

gulp.task('rev',['css'],function() {
	return gulp.src(['dist/rev/rev-manifest.json','dist/*.html'])  //获取rev-manifest.json和要替换的html文件
		.pipe(plugins.revCollector({
			replaceReved: true		//根据rev-manifest.json的规则替换html里的路径，由于替换是根据rev-manifest.json规则来的，所以一定要先生成这个文件再进行替换
		}))
		.pipe(gulp.dest('dist'))
		.pipe(plugins.notify('md5 success!!!!'))
});

gulp.task('injectFile', ['rev'],function () {
	var target = gulp.src('./src/*.html');
	var sources = gulp.src(['./dist/**/*.js','./dist/**/*.css'],{read: false});		//{read: false}不读取文件,加快程序
	return target.pipe(plugins.inject(sources,{relative: true})) 		// 设置相对路径（相对于注入目标的路径）
		.pipe(gulp.dest('./dist'))  //将src下的html文件放入dist
		.pipe(plugins.notify("inject success"))
		
		
});

gulp.task('watch', ['injectFile'], function () {
	return gulp.watch(['./src/less/*.less','./src/*.html'], ['injectFile'])
		
})

// gulp.task('watch', ['injectFile'], function () {
// 	return gulp.watch(['./src/less/*.less'], ['injectFile'])
// })

gulp.task('server', function() {
	
	browserSync.init({
		files:'**',
		server: {
			baseDir: './'
		}
	});
	browserSync.watch('./src/**/*.*').on('change',browserSync.reload);
	browserSync.watch('./dist/**.*').on('change',browserSync.reload);


	//gulp.watch("dist/*.html").on('change', reload);
});

gulp.task('default', function() {
	gulp.run('clean','watch','server');
})