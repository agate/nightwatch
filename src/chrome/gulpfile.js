var gulp = require('gulp');
var addsrc = require('gulp-add-src');
var coffee = require('gulp-coffee');
var sass = require('gulp-ruby-sass');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var del = require('del');

var PATHS = {
  images: {
    src: 'src/assets/images/**/*',
    dest: 'dest/images'
  },

  scripts: {
    lib: [
      'bower_components/jquery/dist/jquery.js',
    ],

    src: 'src/assets/javascripts/main.coffee',
    background: 'src/assets/javascripts/background.coffee',

    dest: 'dest/javascripts'
  },

  copy: {
    src: [ 'src/manifest.json' ],
    dest: 'dest'
  }
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build'], cb);
});

gulp.task('images', function() {
  return gulp
  .src(PATHS.images.src)
  .pipe(gulp.dest(PATHS.images.dest));
});

gulp.task('copy', function() {
  return gulp
  .src(PATHS.copy.src)
  .pipe(gulp.dest(PATHS.copy.dest));
});

gulp.task('script.main', function() {
  return gulp
  .src(PATHS.scripts.src)
  .pipe(coffee())
  .pipe(addsrc.prepend(PATHS.scripts.lib))
  .pipe(concat('script.js'))
  .pipe(gulp.dest(PATHS.scripts.dest));
});
gulp.task('script.background', function() {
  return gulp
  .src(PATHS.scripts.background)
  .pipe(coffee())
  .pipe(addsrc.prepend(PATHS.scripts.lib))
  .pipe(concat('background.js'))
  .pipe(gulp.dest(PATHS.scripts.dest));
});

gulp.task('scripts', [
  'script.main',
  'script.background'
]);

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(PATHS.images.src, ['images']);
  gulp.watch(PATHS.copy.src, ['copy']);
  gulp.watch([
    PATHS.scripts.src,
    PATHS.scripts.background,
  ], ['scripts']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', [
  'watch',
  'images',
  'copy',
  'scripts',
]);
