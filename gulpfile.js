var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    livereload = require('gulp-livereload'),
    prefix = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    jade = require('gulp-jade'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    sassdoc = require('sassdoc'),
    notify = require('gulp-notify');

var config = {
    projectPath: 'build/',
    assetsPath: 'build/assets/',
    componentPath: 'components/'
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
    .on("error", notify.onError("Error:" + errorLog))
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest(config.assetsPath + '/js'))
    .pipe(notify('JS Uglified!'))
    .pipe(livereload());
});

// Convert all the SASS to CSS
var sassInput = 'sass/style.scss';
var sassOptions = { 
    outputStyle: 'compressed' 
};
var autoprefixerOptions = { browsers: ['last 2 versions', '> 5%', 'Firefox ESR'] };
var sassdocOptions = { dest: 'public/sassdocs' };

gulp.task('sass', function () {
  return gulp
    .src(sassInput)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .on("error", notify.onError("Error:" + errorLog))
    .pipe(sourcemaps.write())
    .pipe(prefix(autoprefixerOptions))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest(config.assetsPath + '/css'))
    .pipe(notify('Sass Processed!'))
    .pipe(livereload());
});

// Start building the Sass Docs! Must be run separately!
gulp.task('sassdoc', function () {
  return gulp
    .src('sass/**/*.scss')
    .on("error", notify.onError("Error:" + errorLog))
    .pipe(sassdoc(sassdocOptions))
    .pipe(notify('Sass Documented!'))
    .resume();
});

// Compress all the image things!
gulp.task('images', function () {
    return gulp.src('lib/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .on("error", notify.onError("Error:" + errorLog))
        .pipe(gulp.dest(config.assetsPath + 'assets/img'))
        .pipe(notify('Images optimized!'))
        .pipe(livereload());
});

// Get all the Jade things!
gulp.task('jade', function() {
    var my_locals = {};

    gulp.src('lib/**/**/*.jade')
        .pipe(jade({
            locals: my_locals
        }))
        .on("error", notify.onError("Error:" + errorLog))
        .pipe(gulp.dest(config.projectPath))
        .pipe(notify('HTML Jaded!'));
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

// For watching multiple files
// gulp.watch(['sass/**/*.scss','other/path/to/file/*.scss'], ['sass']);

gulp.task('default', ['scripts', 'sass', 'jade', 'watch']);
