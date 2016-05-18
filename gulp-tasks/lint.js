'use strict';

const gulp = require('gulp');
const tslint = require('gulp-tslint');
const gitignore = require('gitignore-to-glob')();

gitignore.push('**/*.ts');

gulp.task('tslint', () =>
  gulp
    .src(gitignore)
    .pipe(tslint())
    .pipe(tslint.report('prose', {
      emitError: true,
      summarizeFailureOutput: true,
      reportLimit: 50
    }))
);

gulp.task('lint', ['tslint']);
