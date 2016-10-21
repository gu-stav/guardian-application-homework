const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const gulp = require('gulp');
const path = require('path');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');

gulp.task('scripts', () => {
  return gulp.src('scripts/app.js')
    .pipe(webpack({
      entry: './scripts/app.js',
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            loader: 'babel',
            query: {
              presets: [
                'es2015',
              ],
              plugins: [
                'transform-runtime',
              ],
            },
          },
        ],
      },
      output: {
        filename: 'app.bundle.js',
      },
      resolveLoader: {
        root: path.resolve('./node_modules'),
      },
      resolve: {
        root: [
          path.resolve('./scripts/'),
        ]
      }
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('styles', () => {
  return gulp.src('./styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('watch', () => {
  gulp.watch('./scripts/**/*', ['scripts']);
  gulp.watch('./styles/**/*', ['styles']);
});
