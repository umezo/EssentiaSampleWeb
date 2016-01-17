var gulp = require('gulp');
var webpack = require('webpack-stream');
var webpackConfig = require('./webpack.config.js');

gulp.task('build', [], function (cb) {
  return gulp.src('')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(''));
});


gulp.task('watch',['build'],function(){
  gulp.watch('./public/js/src/**/*.jsx', ['build']);
});
