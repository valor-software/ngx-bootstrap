'use strict';

const gulp = require('gulp');

gulp.paths = {
  tssrc: [
    '**/*.ts',
    '!node_modules/**/*',
    '!bundles/**/*',
    '!typings/**/*',
    '!**/*.{ts,coffee}.js'],
  jssrc: [
    '*.js',
    'gulp-tasks/*.js',
    '!bundles/*.js',
    '!ng2-bootstrap.js',
    '!node_modules/**/*',
    '!**/*.{ts,coffee}.js']
};

require('require-dir')('./gulp-tasks');

gulp.task('default', () => {
  gulp.start('lint');
});
