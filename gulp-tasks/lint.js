'use strict';

const gulp = require('gulp');
const tslint = require('gulp-tslint');
const paths = gulp.paths;
const tslintConf = require('../tslint.json');

gulp.task('tslint', () =>
  gulp
    .src(paths.tssrc)
    .pipe(tslint(tslintConf))
    .pipe(tslint.report('prose', {
      emitError: true,
      summarizeFailureOutput: true,
      reportLimit: 50
    }))
);

gulp.task('lint', ['tslint']);
