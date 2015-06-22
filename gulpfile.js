var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    minifyCSS = require('gulp-minify-css'),
    livereload = require('gulp-livereload'),
    prefix = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    jade = require('gulp-jade'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps');

var config = {
    projectPath: 'build/'
}

// Find errors!
function errorLog(error) {
  console.error.bind(error);
  this.emit('end');
}

// Watch the homepage!
gulp.task('homepage', function(){
    gulp.src('index.html')
    .pipe(livereload());
});

// Uglify, to compress JS files
gulp.task('scripts', function(){
    gulp.src('js/*.js')
    .pipe(plumber())
         .pipe(concat('all.js'))
         .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest(config.projectPath + '/assets/js'))
    .pipe(livereload());
});


// Convert all the SASS to CSS
gulp.task('sass', function() {
    
    return sass('sass/style.scss',{
        sourcemap: true,
        style: 'expanded',
        require: ['susy'],
        require: ['breakpoint']
    }) 
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(prefix('> 1%', 'last 2 versions', 'Firefox > 20', 'Opera 12.1'))
    .pipe(sourcemaps.write())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(config.projectPath + '/assets/css'))
    .pipe(livereload());
});


// Compress all the image things!
gulp.task('images', function () {
    return gulp.src('img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .on('error', errorLog)
        .pipe(gulp.dest('assets/img'))
        .pipe(livereload());
});

// Get all the Jade things!
gulp.task('jade', function() {
    var my_locals = {};

    gulp.src('lib/**/**/*.jade')
        .pipe(jade({
            locals: my_locals
        }))
        .pipe(gulp.dest(config.projectPath))
});


// Task to watch the things!
gulp.task('watch', function(){
  livereload.listen();
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('lib/**/**/*.jade', ['jade']);
  gulp.watch('img/*', ['images']);
  gulp.watch('index.html', ['homepage']);
});


gulp.task('default', ['scripts', 'sass', 'jade', 'watch']);
