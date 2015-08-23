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
    '!angular2-bootstrap.js',
    'gulp-tasks/*.js',
    '!node_modules',
    '!**/*.{ts,coffee}.js']
};

require('require-dir')('./gulp-tasks');

// todo: rework ts compile
var typescript = require('gulp-tsc');
var options = require('./tsconfig.json').compilerOptions;
options.emitError = false;

var o = {
  target: 'es5',
  module: 'commonjs',
  outDir: 'dist',
  sourceRoot: 'dist',
  mapRoot: 'dist',
  keepTree: true,
  declaration: true,
  noEmitOnError: true,
  emitError: false,
  sourceMap: true,
  removeComments: true,
  noResolve: false,
  suppressImplicitAnyIndexErrors: true,
  safe: false,
  emitDecoratorMetadata: true,
  experimentalDecorators: true
};

var clean = require('gulp-clean');
gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('compile', ['clean'], function () {
  gulp.src(['components/**/*.ts'])
    .pipe(typescript(o))
    .pipe(gulp.dest(options.outDir));
});

gulp.task('default', function () {
  gulp.start('lint');
});
