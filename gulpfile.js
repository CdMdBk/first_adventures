const {task, watch, src, dest, parallel} = require('gulp');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const cleanCss = require('gulp-clean-css');

task('compileTS', () => {
  return src('./app/script_ts/**/*.ts')
    .pipe(ts({
      "module": 'es2015'
    }))
    .pipe(dest('./app/script_js'));
});

task('compressJS', () => {
  return src('./app/script_js/**/*.js')
    .pipe(uglify())
    .pipe(dest('./dist'));
});

task('compileSASS', () => {
  return src('./app/sass/**/*.scss')
    .pipe(sass())
    .pipe(dest('./app/css'));
});

task('compressCSS', () => {
  return src('./app/css/**/*.css')
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(dest('./dist/styles'));
});

task('watch', () => {
  watch('./app/script_ts/**/*.ts', parallel('compileTS'));
  watch('./app/script_js/**/*.js', parallel('compressJS'));
  watch('./app/sass/**/*.scss', parallel('compileSASS'));
  watch('./app/css/**/*.css', parallel('compressCSS'));
});

task('default', parallel('compileTS', 'compressJS', 'compileSASS', 'compressCSS', 'watch'));