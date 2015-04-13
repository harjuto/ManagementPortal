var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var gulpcache = require('gulp-cache');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var using = require('gulp-using');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var del = require('del');
var react = require('gulp-react');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var ngHtml2Js = require('gulp-ng-html2js');
var minifyHtml = require('gulp-minify-html');

// CONFIG
var appPath = 'src/**/*.js';
var baseDir = 'src/**';

var config = {
  src: [appPath],
  vendor: ['vendor/angular/angular.js',
    'vendor/angular-route/angular-route.js',
    'vendor/angular-resource/angular-resource.js',
    'vendor/lodash/lodash.js',
    'vendor/jquery/dist/jquery.js',
    'vendor/bootstrap/dist/js/bootstrap.js',
    'vendor/ngstorage/ngStorage.js',
    'vendor/angular-lodash/angular-lodash.js',
    'vendor/angular-messages/angular-messages.js',
    'vendor/react/react.min.js'
  ],
  css: ['src/**/*.css', 'vendor/font-awesome/css/font-awesome.min.css'],
  less: ['src/less/**/*.less'],
  html: ['src/**/*.tpl.html'],
  index: ['src/index.html'],
  errors: ['src/errors/*.html'],
  fonts: ['vendor/bootstrap/dist/fonts/**', 'vendor/font-awesome/fonts/**']
};

//Angular templates
gulp.task('templates', function() {
  gulp.src("./src/**/*.tpl.html")
    .pipe(ngHtml2Js({
      moduleName: "app",
      prefix: "/"
    }))
    .pipe(concat("partials.min.js"))
    .pipe(uglify())
    .pipe(rename({
      dirname: 'app/'
    }))
    .pipe(gulp.dest("./dist/"));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  gulp.src(config.src)
    .pipe(react())
    .pipe(concat('app.min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('./dist/app'));

});

// Compile and concatenate less
gulp.task('less', function() {
  gulp.src(config.less)
    .pipe(less())
    .pipe(minifyCSS())

  .pipe(gulp.dest('./dist/css'));
});

// Process images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('./dist/images'));
});

// Synchronously delete the output file(s)
gulp.task('clean', function() {
  del.sync(['dist/**/*.js', 'dist/**/*.html', 'dist/**/*.css', '!dist/app/vendor.min.js']);
});

// Copy index and vendor fonts/styles to dist package
gulp.task('copy', function() {

  gulp.src(config.fonts)
    .pipe(gulp.dest('./dist/fonts'));

  gulp.src(config.index)
    .pipe(gulp.dest('./dist/'));

  gulp.src(config.errors)
    .pipe(gulp.dest('./dist/errors'));

  gulp.src(config.css)
    .pipe(gulp.dest('./dist/css/'));
});

// Create vendor.min from vendor packages
gulp.task('vendor', function() {
  del.sync(['./dist/app/vendor.min.js']);

  gulp.src(config.vendor)
    .pipe(concat('vendor.min.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/app/'));
});

//Set a default tasks
gulp.task('default', ['clean', 'copy', 'vendor', 'less', 'images', 'scripts', 'templates'], function() {});

gulp.task('watch', function() {
  gulp.watch(baseDir, ['clean', 'copy', 'less', 'scripts', 'templates']);
});