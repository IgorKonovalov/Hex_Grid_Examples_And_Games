// npm install --save-dev gulp gulp-babel babel-preset-es2015 gulp-concat gulp-uglify gulp-rename 
'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');

var DEST = 'build/';

gulp.task('default', function() {
  return gulp.src('./src/*.js')
    .pipe(concat('main.js'))
    // This will output the non-minified version
    .pipe(gulp.dest(DEST))
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest(DEST))
    // This will minify and rename to foo.min.js
    .pipe(uglify().on('error', function(e){
            console.log(e);
      }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(DEST));
});
