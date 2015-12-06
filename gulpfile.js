var gulp = require('gulp');  
var p = require('gulp-load-plugins')();

var express = require('express'),
    del = require('del');

// Important variables used throughout the gulp file //



// Configurations for different file paths
var config = {
    projectPath: 'app/',
    pAssetsPath: 'app/assets/',
    distPath: 'dist/',
    dAssetsPath: 'dist/assets/'
    componentPath: 'components/'
}

var prod === true;

// Sass and styling variables
var sassInput = 'sass/main.scss';
var sassOptions = { 
    outputStyle: 'expanded' 
};

// Sass variables for the dist folder
var sassDistOptions = { 
    outputStyle: 'compressed' 
};

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};


var app = express()
app.use('/', express.static(__dirname + '/build'))
app.listen(3000)
console.log('Express site on 3000!')

// Find errors!
function errorLog(error) {
  console.error.bind(error);
  this.emit('end');
}



function customPlumber(errTitle) {
    return p.plumber({
        errorHandler: p.notify.onError({
            // Custom error titles go here
            title: errTitle || 'Error running Gulp',
            message: "<%= error.message %>",
        })
    });
}




// Watch the homepage!
gulp.task('homepage', function(){
    gulp.src('index.html')
    .pipe(p.livereload());
});

// Uglify, to compress JS files
gulp.task('scripts', function(){
    gulp.src('js/main.js')
    .pipe(customPlumber('Error running Scripts'))
    .pipe(p.include())
    .pipe(p.rename('main.min.js'))
    .pipe(gulp.dest(config.pAssetsPath + 'js'))
    .pipe(p.notify({
        message: 'JS Uglified!',
        onLast: true
    }))
    .pipe(p.livereload());
});

gulp.task('sass', function () {
  return gulp
    .src(sassInput)
    .pipe(customPlumber('Error running Sass'))
    .pipe(p.sourcemaps.init())
    .pipe(p.sass(sassOptions).on('error', p.sass.logError))
    .pipe(p.sourcemaps.write())
    .pipe(p.rename("style.min.css"))
    .pipe(gulp.dest(config.pAssetsPath + 'css'))
    .pipe(p.notify({
        message: 'Sass Processed!',
        onLast: true
    }))
    .pipe(p.livereload());
});

gulp.task('uncss', function () {
  return gulp
    .src(config.pAssetsPath + 'css/style.min.css')
    .pipe(customPlumber('Error running UnCSS'))
    .pipe(p.uncss({
        html: ['build/**/**/*.html']
    }))
    .pipe(p.minifyCSS())
    .pipe(gulp.dest(config.pAssetsPath + 'css'))
    .pipe(p.notify({
        message: 'CSS Trimmed!',
        onLast: true
    }))
});

// Compress all the image things!
gulp.task('images', function () {
    return gulp.src('jade/img/*')
        .pipe(customPlumber('Error running Images'))
        .pipe(p.imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(config.pAssetsPath + '/img'))
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
        .pipe(customPlumber('Error running Jade'))
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
    .pipe(p.sass(sassDistOptions).on('error', p.sass.logError))
    .on("error", p.notify.onError("Error:" + errorLog))
    .pipe(p.autoprefixer(autoprefixerOptions))
    .pipe(p.rename("style.min.css"))
    .pipe(gulp.dest(config.pAssetsPath + 'css'));
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