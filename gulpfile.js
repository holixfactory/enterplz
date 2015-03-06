var gulp = require("gulp");
var babel = require("gulp-babel");
var babelify = require('babelify');

gulp.task("default", function () {
  return gulp.src([require.resolve('babel/browser-polyfill'), "enterplz.js"])
    .pipe(babel({
      modules: "umd",
      sourceMap: true
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task("watch", function(){
  gulp.watch('*.js', ['default'])
});
