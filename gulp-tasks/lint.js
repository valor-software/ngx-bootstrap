var gulp = require('gulp');
var esLint = require('gulp-eslint');
var tslint = require('gulp-tslint');
var size = require('gulp-size');

var paths = gulp.paths;

gulp.task('eslint', function() {
  return gulp.src(paths.jssrc)
    .pipe(esLint({useEslintrc: true}))
    .pipe(esLint.format())
    .pipe(esLint.failOnError());
});

gulp.task('tslint', function() {
  return gulp.src(paths.tssrc)
    .pipe(size({showFiles: true}))
    .pipe(tslint())
    .pipe(tslint.report('verbose', {
      emitError: true,
      reportLimit: 0
    }));
});

gulp.task('lint', ['tslint', 'eslint']);
