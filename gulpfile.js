// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	compass =  require('gulp-compass'),
	browserify = require('gulp-browserify'),
	gutil = require('gulp-util'),
	browserSync = require('browser-sync').create(),
	fileinclude = require('gulp-file-include'),
	del = require('del');

gulp.task('html', function() {
 	gulp.src('Development/html/*.html')
    .pipe(fileinclude('@@'))
    .pipe(gulp.dest('Production/'))
});

// Compile Our Sass with Compass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(compass({
	        'sass': 'Development/scss',
	        'css': 'Production/css',
	        'images': 'Production/images',
	        'style': 'compressed'
        }).on('error', gutil.log))
        .pipe(gulp.dest('Production/css'));
});

gulp.task('css', ['sass'], function () {
    del(['Production/css/**/*', '!Production/css/main.css']);
});

// JS PLUGINS - concat and min
gulp.task('js', function() {
    return gulp.src('Development/scripts/*.js')
        .pipe(concat('app.min.js'))
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('Production/js'));
});

gulp.task('plugins', function(){
	return gulp.src('Development/requirements/*.js')
        .pipe(concat('plugins.min.js'))
        
        //.pipe(uglify())
        .pipe(gulp.dest('Production/js'))
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('Development/scripts/**/*', ['js']);
    gulp.watch('Development/scss/**/*', ['css']);
    gulp.watch('Development/html/**/*', ['html']);
    gulp.watch(['Production/**/*']).on('change', browserSync.reload);
});

// BROWSER SYNC
gulp.task('sync', function() {
    browserSync.init({
        server: {
            baseDir: "Production/"
        }
    });
});

// Default Task
gulp.task('default', ['html', 'css', 'js', 'watch', 'sync']);