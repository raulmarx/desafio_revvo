const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

function styles() {
  return gulp
    .src('./assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp
    .src('./assets/js/**/*.js') 
    .pipe(uglify())
    .pipe(gulp.dest('./public/js')) 
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    proxy: "localhost/desafio_revvo/public", 
  });

  gulp.watch('./assets/scss/**/*.scss', styles);
  gulp.watch('./assets/js/**/*.js', scripts); 
  gulp.watch('./**/*.php').on('change', browserSync.reload);
}

exports.default = gulp.series(styles, scripts, serve);
