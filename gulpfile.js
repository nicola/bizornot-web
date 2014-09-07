var gulp = require('gulp');
var stylus = require('gulp-stylus');
var mainBowerFiles = require('main-bower-files');
var react = require('gulp-react');
var connect = require('gulp-connect');
var nib = require('nib');
var del = require('del');

var paths = {
  html: 'src/**/*.html',
  react: 'src/js/**/*.jsx',
  scripts: ['src/js/**/*'],
  stylus: 'src/styles/**/*',
  dist: 'dist/**/*'
};

// Get and render all .styl files recursively
gulp.task('stylus', function () {
  gulp.src('./src/styles/**/*.styl')
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('scripts', ['clean_scripts'], function () {
  gulp.src('./src/js/**/*.js')
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('html', ['clean_html'], function () {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist/'));
});
gulp.task('cordova', function () {
  gulp.src('./dist/**/*')
    .pipe(gulp.dest('./app/www/dist'));
});

gulp.task('react', ['clean_react'], function () {
    return gulp.src('./src/js/**/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('dist/jsx'));
});

gulp.task('vendor', ['clean_vendor'], function() {
  gulp.src(mainBowerFiles())
    .pipe(gulp.dest('./dist/vendor'));
});

gulp.task('watch', function() {
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.react, ['react']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.stylus, ['stylus']);
  gulp.watch(paths.dist, ['cordova']);
});

gulp.task('connect', function() {
  require('./bin/www');
});

gulp.task('clean_html', function(cb) {
  del(['dist/index.html'], cb);
});

gulp.task('clean_scripts', function(cb) {
  del(['dist/js'], cb);
});

gulp.task('clean_vendor', function(cb) {
  del(['dist/vendor'], cb);
});

gulp.task('clean_react', function(cb) {
  del(['dist/jsx'], cb);
});

gulp.task('clean', ['clean_react', 'clean_html', 'clean_scripts', 'clean_vendor']);

gulp.task('default', ['watch', 'html', 'react', 'stylus', 'vendor', 'scripts', 'connect']);
gulp.task('app', ['watch']);