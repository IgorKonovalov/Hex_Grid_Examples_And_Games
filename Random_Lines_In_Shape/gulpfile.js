// npm install --save-dev gulp gulp-babel babel-preset-es2015 gulp-concat gulp-uglify gulp-rename
'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const htmlhint = require('gulp-htmlhint');

const DEST = 'build/';

gulp.task('js', function() {
  return gulp.src('./clean_ver/src/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest(DEST))
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest(DEST))
    .pipe(uglify().on('error', function(e){
            console.log(e);
      }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(DEST));
});

gulp.task('css', function() {
  return gulp.src('./src/*.css')
    .pipe(concat('main.css'))
    .pipe(gulp.dest(DEST))
    .pipe(autoprefixer({
              browsers: ['last 2 versions'],
              cascade: true
      }).on('error', function (e) {
              console.log(e);
      }))
    .pipe(gulp.dest(DEST))
})

gulp.task('html', function () {
  return gulp.src('index.html')
    .pipe(gulp.dest(DEST))
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(gulp.dest(DEST))
})
