var gulp = require('gulp');  
var p = require('gulp-load-plugins')();

var express = require('express'),
    del = require('del');

var app = express()
app.use('/', express.static(__dirname + '/build'))
app.listen(3000)
console.log('Express site on 3000!')

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
    .pipe(p.livereload());
});

// Uglify, to compress JS files
gulp.task('scripts', function(){
    gulp.src('js/main.js')
    .pipe(p.include())
      .on('error', console.log)
    .pipe(p.plumber())
         .pipe(p.uglify())
    .on("error", p.notify.onError("Error:" + errorLog))
    .pipe(p.rename('main.min.js'))
    .pipe(gulp.dest(config.assetsPath + 'js'))
    .pipe(p.notify({
        message: 'JS Uglified!',
        onLast: true
    }))
    .pipe(p.livereload());
});

// Convert all the SASS to CSS
var sassInput = 'sass/main.scss';
var sassOptions = { 
    outputStyle: 'expanded' 
};
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('sass', function () {
  return gulp
    .src(sassInput)
    .pipe(p.sourcemaps.init())
    .pipe(p.sass(sassOptions).on('error', p.sass.logError))
    .on("error", p.notify.onError("Error:" + errorLog))
    .pipe(p.sourcemaps.write())
    .pipe(p.rename("style.min.css"))
    .pipe(gulp.dest(config.assetsPath + 'css'))
    .pipe(p.notify({
        message: 'Sass Processed!',
        onLast: true
    }))
    .pipe(p.livereload());
});

gulp.task('uncss', function () {
  return gulp
    .src(config.assetsPath + 'css/style.min.css')
    .pipe(p.uncss({
        html: ['build/**/**/*.html']
    }))
    .pipe(p.minifyCSS())
    .pipe(gulp.dest(config.assetsPath + 'css'))
    .pipe(p.notify({
        message: 'CSS Trimmed!',
        onLast: true
    }))
});

// Compress all the image things!
gulp.task('images', function () {
    return gulp.src('jade/img/*')
        .pipe(p.imagemin({
            progressive: true
        }))
        .on("error", p.notify.onError("Error:" + errorLog))
        .pipe(gulp.dest(config.assetsPath + '/img'))
        .pipe(p.notify({
        message: 'Images Optimized!',
        onLast: true
    }))
        .pipe(p.livereload());
});

// Get all the Jade things!
gulp.task('jade', function() {
    var my_locals = {};

    gulp.src('jade/**/**/*.jade')
        .pipe(p.jade({
            locals: my_locals
        }))
        // .on("error", p.notify.onError("Error:" + errorLog))
        .pipe(gulp.dest(config.projectPath))
        .pipe(p.notify({
            message: 'HTML Jaded!',
            onLast: true
        }))
        .pipe(p.livereload());
});

gulp.task('prod-init', function () {
  return gulp
    .src(sassInput)
    .pipe(p.sass({ outputStyle: 'compressed' }).on('error', p.sass.logError))
    .on("error", p.notify.onError("Error:" + errorLog))
    .pipe(p.autoprefixer(autoprefixerOptions))
    .pipe(p.rename("style.min.css"))
    .pipe(gulp.dest(config.assetsPath + 'css'));
});

gulp.task('clean', function () {
    return del([
        'build/extends'
    ]);
});



// Task to watch the things!
gulp.task('watch', function(){
  p.livereload.listen();
    gulp.watch('js/**/**/*.js', ['scripts']);
    gulp.watch('sass/**/**/*.scss', ['sass']);
    gulp.watch('jade/**/**/*.jade', ['jade']);
    gulp.watch('jade/img/**/**/*', ['images']);
    gulp.watch('index.html', ['homepage']);
});

gulp.task('default', ['scripts', 'sass', 'jade', 'images', 'watch']);
gulp.task('prod', ['clean', 'prod-init', 'uncss']);