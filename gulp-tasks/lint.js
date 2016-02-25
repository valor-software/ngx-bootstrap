'use strict';

const gulp = require('gulp');
const tslint = require('gulp-tslint');
const paths = gulp.paths;

gulp.task('tslint', () =>
  gulp
    .src(paths.tssrc)
    .pipe(tslint())
    .pipe(tslint.report('verbose', {
      emitError: true,
      reportLimit: 0
    }))
);

gulp.task('lint', ['tslint']);
