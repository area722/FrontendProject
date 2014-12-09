/**
 * Created by Wouter on 09/12/14.
 */

var gulp = require("gulp"),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    uglify = require("gulp-uglify"),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    del = require('del');

gulp.task('clean', function(cb) {
    del(['public/build'], cb)
});

gulp.task('js', function () {
    return gulp.src(['public/scripts/**/*.js','!public/scripts/lib/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('app.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('public/build/js'))
        .pipe(notify({ message: 'js task complete' }));;
});

gulp.task('lib',function(){
    return gulp.src('public/scripts/lib/**/*.js')
        .pipe(concat("lib.js"))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('public/build/js'))
        .pipe(notify({ message: 'lib task complete' }));
});

gulp.task('css', function () {
   return gulp.src(['public/stylesheets/**/*.css','!public/stylesheets/scroll.css'])
       .pipe(concat('style.css'))
       .pipe(rename({suffix: '.min'}))
       .pipe(minifycss())
       .pipe(gulp.dest('public/build/css'))
       .pipe(notify({ message: 'css task complete' }));
});

gulp.task('images', function() {
    return gulp.src('public/img/**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('public/build/img'))
        .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('default', ['clean'], function() {
    gulp.start('images','js','lib','css');
});