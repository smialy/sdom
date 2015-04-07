/*jshint camelcase: false */
'use strict';

var fs = require('fs');
var path = require('path');

var pkg = require('./package.json');

var stylish = require('jshint-stylish');
var del = require('del');
var runSequence = require('run-sequence');
var vinylPaths = require('vinyl-paths');
var gulp = require('gulp');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var to5 = require('gulp-babel');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');

var paths = {
    gulpfile:   'gulpfile.js',
    output:'dist/',
    source:'src/**/*.js',
    tests:'test/**/*.js',
    conf:'./src/conf.js'
};

var compilerOptions = {
}


//@todo
var banner = '';

gulp.task('clean', function() {
    return gulp.src([paths.output])
        .pipe(vinylPaths(del));
});
gulp.task('build-commonjs', function () {
    return gulp.src(paths.source)
        .pipe(to5(extend({}, compilerOptions, {modules:'common'})))
        .pipe(gulp.dest(paths.output));
});
gulp.task('build-amd', function () {
    return gulp.src(paths.source)
        .pipe(to5(extend({}, compilerOptions, {modules:'amd'})))
        .pipe(gulp.dest(paths.output));
});
gulp.task('build-system', function () {
    return gulp.src(paths.source)
        .pipe(to5(extend({}, compilerOptions, {modules:'system'})))
        .pipe(gulp.dest(paths.output));
});

gulp.task('build', function(callback) {
    return runSequence('clean', 
        ['build-system'],
        callback);
});
gulp.task('jshint', function() {
  return gulp.src([paths.source, paths.tests])
    .pipe(jshint({esnext:true}))
    .pipe(jshint.reporter(stylish));
});

gulp.task('watch', function(){
  gulp.watch(paths.source, ['jshint', 'build']).on('change', function(e){
    console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');
  });
});

gulp.task('smart-watch', function () {
    return gulp.src(paths.source)
        .pipe(watch(paths.source))
        .pipe(to5(extend({}, compilerOptions, {modules:'system'})))
        .pipe(gulp.dest(paths.output));
});

function extend(obj){
    for(var i = 1;i<arguments.length;i+=1){
        var item = arguments[i];
        Object.keys(item).forEach(function(name){
            obj[name] = item[name];
        });
    }
    return obj;
}
