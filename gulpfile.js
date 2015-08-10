var gulp = require('gulp');

gulp.paths = {
  tssrc: [
    'src/**/*.ts',
    '!node_modules',
    '!**/*.{ts,coffee}.js'],
  jssrc: [
    '*.js',
    'gulp-tasks/*.js',
    '!node_modules',
    '!**/*.{ts,coffee}.js']
};

require('require-dir')('./gulp-tasks');

gulp.task('default', function () {
  gulp.start('lint');
});
