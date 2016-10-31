var gulp = require('gulp'),
    uglifyJs = require('gulp-uglify'),
    rename = require('gulp-rename'),
    gls = require('gulp-live-server'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    csswring = require('csswring');

var sassFiles = ['css/**/*.scss'];

// GITHUB GH-PAGES DEPLOY
gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

// INJECT STATIC FILE LINKS INTO HTML (DEV)
gulp.task('inject', function () {
  var target = gulp.src('./dev.html');
  var sources = gulp.src(['js/**/*.js', '!js/**/*.min.js', 
                          'css/**/*.css', '!css/**/*.min.css'], {read: false});
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./'));
});

// prefixes / uglifies css
gulp.task('css', function(){
  var processors = [
    autoprefixer({browsers: ['last 2 versions']}),
    mqpacker,
    // csswring
  ];
  gulp.src(sassFiles)
    // convert sass to css
    .pipe(sass().on('error', sass.logError))
    // minify / prefix
    .pipe(postcss(processors))
    // save
    .pipe(gulp.dest('css/'));
});


// SERVER / WATCH TASK
// startes server, watches javascript, css
gulp.task('serve', function(){
  var server = gls.static('.', 8080);
  server.start();
  // watch css for changes
  gulp.watch(sassFiles, ['css']);
  // reloads the server
  gulp.watch(['js/*.js', 'css/main.css', './*.html'], function (file) {
    server.notify.apply(server, [file]);
  });
});

gulp.task('default', ['serve']);


//////// PRODUCTION STUFF ////////

// CONCAT / MINIFY / COPY CSS
gulp.task('build_production_css', function() {
  var processors = [
    autoprefixer({browsers: ['last 2 versions']}),
    mqpacker,
    csswring
  ];
  return gulp.src(['css/**/*.css', '!css/**/*.min.css'])
    .pipe(concat('styles.min.css'))
    // minify / prefix
    .pipe(postcss(processors))
    .pipe(gulp.dest('css/'));
});
// CONCAT / MINIFY / COPY JAVASCRIPT
gulp.task('build_production_js', ['build_production_css'], function() {
  return gulp.src(['js/**/*.js', '!js/**/*.min.js'])
    .pipe(concat('scripts.min.js'))
    .pipe(uglifyJs())
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('js/'));
});
// INJECT MINIFIED FILES
gulp.task('inject_production', ['build_production_js'], function () {
  var target = gulp.src('./dev.html');
  var sources = gulp.src(['js/**/*.min.js', 'css/**/*.min.css'], {read: false});
  return target.pipe(inject(sources))
    .pipe(rename("index.html"))
    .pipe(gulp.dest('.'));
});

// run production tasks and production server
gulp.task('serve_production', ['build_production_js'], function(){
  var server = gls.static('.', 8080);
  server.start();
});

gulp.task('build_production', 
  [
    'build_production_css', 
    'build_production_js',
    'inject_production',
    'serve_production',

  ]
);