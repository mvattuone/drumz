'use strict';

var browserify = require('browserify'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    compass = require('gulp-compass'),
    babelify = require('babelify'),
    ghPages = require('gulp-gh-pages'),
    sourcemaps = require('gulp-sourcemaps');

function errorAlert(err) {
  gutil.log(err);
  this.emit("end");
}

gulp.task('html', function() {
    gulp.src('./index.html')
        .on('error', errorAlert)
        .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function() {
    gulp.src('./src/components/style.scss')
        .pipe(compass({
          sass: 'src/components',
        }))
        .on('error', errorAlert)
        .pipe(gulp.dest('dist'))
});

gulp.task('javascript', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: 'src/app.js',
    debug: true,
  }).transform(babelify, {presets: ["react"]});

  return b.bundle()
    .on('error', errorAlert)
    .pipe(source('dist/bundle.js'))
    .on('error', errorAlert)
    .pipe(buffer())
    .on('error', errorAlert)
    .pipe(sourcemaps.init({loadMaps: true}))
    .on('error', errorAlert)
    .pipe(sourcemaps.write('./'))
    .on('error', errorAlert)
    .pipe(gulp.dest('.'));
});

gulp.task('build', ['html', 'sass', 'javascript']);

gulp.task('watch', function() {
  gulp.watch(['src/*/**', 'src/*/*/**', 'src/app.js'], ['html', 'javascript', 'sass']);
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});
