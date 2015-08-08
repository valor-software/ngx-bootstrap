var gulp = require('gulp');

gulp.paths = {
  src: ['**/*.{js,ts}', '!node_modules/**/*', '!**/*.{ts,coffee}.js']
};

require('require-dir')('./gulp-tasks');

gulp.task('default', function () {
  gulp.start('lint');
});
