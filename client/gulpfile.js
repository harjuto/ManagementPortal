var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var del = require('del');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var ngHtml2Js = require('gulp-ng-html2js');
var minifyHtml = require('gulp-minify-html');

// CONFIG
var appPath = 'src/**/*.js';
var baseDir = 'src/**';

var config = {
	src: [appPath],
	vendor: ['vendor/fastclick/lib/fastclick.js', 'vendor/angular/angular.js', 'vendor/angular-route/angular-route.js', 'vendor/angular-resource/angular-resource.js', 'vendor/lodash/lodash.js', 'vendor/jquery/dist/jquery.js', 'vendor/bootstrap/dist/js/bootstrap.js', 'vendor/ngstorage/ngStorage.js', 'vendor/angular-lodash/angular-lodash.js', 'vendor/angular-messages/angular-messages.js','vendor/angular-google-maps/dist/angular-google-maps.js'],
	css: ['vendor/bootstrap/dist/css/bootstrap.css', 'vendor/bootstrap/dist/css/bootstrap.css.map', 'src/**/*.css'],
	html: ['src/**/*.tpl.html'],
	index: ['src/index.html'],
	fonts: ['vendor/bootstrap/dist/fonts/**']
};


gulp.task('templates', ['scripts'], function(){
	gulp.src("./src/**/*.tpl.html")
    .pipe(ngHtml2Js({
        moduleName: "app",
        prefix: "/"
    }))
    .pipe(concat("partials.min.js"))
    .pipe(uglify())
    .pipe(rename({dirname: 'app/'}))
    .pipe(gulp.dest("./dist/"));
});

// JS hint task
gulp.task('jshint', function() {
	// gulp.src(appPath)
	// .pipe(jshint())
	// .pipe(jshint.reporter('default'));
});

// JS concat, strip debugging and minify
gulp.task('scripts', ['clean'], function() {
	gulp.src(config.src)
	.pipe(concat('app.min.js'))
	//.pipe(stripDebug())
	//.pipe(uglify())
	.pipe(gulp.dest('./dist/app/'));
});

// JS concat, strip debugging and minify
gulp.task('vendor', ['copy'], function() {
	del.sync(['./dist/app/vendor.min.js'])

	gulp.src(config.vendor)
	.pipe(concat('vendor.min.js'))
	.pipe(stripDebug())
	.pipe(uglify())
	.pipe(gulp.dest('./dist/app/'));
});

// Synchronously delete the output file(s)
gulp.task('clean', ['jshint'], function(){
	del.sync(['dist/**/*.js', 'dist/**/*.html', 'dist/**/*.css','!dist/app/vendor.min.js'])
});

gulp.task('copy', ['templates'], function(){

	gulp.src(config.fonts)
	.pipe(gulp.dest('dist/fonts'))

	gulp.src(config.index)
	.pipe(gulp.dest('./dist/'));

	gulp.src(config.css)
	.pipe(gulp.dest('./dist/css/'));
});

//Set a default tasks
gulp.task('default', ['vendor'], function(){});

gulp.task('watch', function(){
	gulp.watch(baseDir, ['copy']);
});
