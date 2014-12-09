/**
 * Created by Wouter on 09/12/14.
 */

var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('js', function () {
    return gulp.src(['public/scripts/**/*.js','!public/scripts/lib/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/build'));
});

gulp.task('lib',function(){
    return gulp.src('public/scripts/lib/**/*.js')
        .pipe(uglify())
        .pipe(concat("lib.js"))
        .pipe(gulp.dest('public/build/lib'));
});