var gulp = require('gulp');

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

var clean = require('gulp-clean');
gulp.task('clean', function () {
  return gulp.src('bundles', {read: false})
    .pipe(clean());
});

gulp.task('default', function () {
  gulp.start('lint');
});

var tsSource = [
    '**/*.ts',
    '!**/*.d.ts',
    '!node_modules/**',
    '!demo/**'
];

gulp.task('prepublish', function() {
  return gulp.src(tsSource)
    .pipe(clean({force: true}))
    .pipe(gulp.dest('ts'));
})

gulp.task('postpublish', function() {
  return gulp.src('ts/**')
    .pipe(clean({force: true}))
    .pipe(gulp.dest('./'));
})