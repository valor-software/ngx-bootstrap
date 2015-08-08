var gulp = require('gulp');
var esLint = require('gulp-eslint');

var paths = gulp.paths;

gulp.task('lint', function () {
  return gulp.src(paths.src)
    .pipe(esLint({useEslintrc: true}))
    .pipe(esLint.format())
    .pipe(esLint.failOnError());
});
