var gulp = require("gulp");
var babel = require("gulp-babel");
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');

gulp.task("default", function () {
  return gulp.src([require.resolve('babel/browser-polyfill'), "enterplz.js"])
    .pipe(babel({
      modules: "amd",
      sourceMap: true
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task("watch", function(){
  gulp.watch('*.js', ['default'])
});


gulp.task('modules', function() {
  browserify({
    entries: './main.js',
    debug: true
  })
  .add(require.resolve('babel/polyfill'))
  .transform(babelify)
  .bundle()
  .pipe(source('main.js'))
  .pipe(gulp.dest('./dist'));
});
