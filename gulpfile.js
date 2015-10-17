var gulp = require('gulp');

gulp.paths = {
  tssrc: [
    '**/*.ts',
    '!node_modules/**/*',
    '!dist/**/*',
    '!typings/**/*',
    '!**/*.{ts,coffee}.js'],
  jssrc: [
    '*.js',
    'gulp-tasks/*.js',
    '!ng2-bootstrap.js',
    '!node_modules',
    '!**/*.{ts,coffee}.js']
};

require('require-dir')('./gulp-tasks');

var clean = require('gulp-clean');
gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('default', function () {
  gulp.start('lint');
});
