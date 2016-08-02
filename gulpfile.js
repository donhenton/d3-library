var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');

var babelify = require('babelify');
var browserify = require('browserify');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var server = require('gulp-server-livereload');
var livereload = require('gulp-livereload');

var pageURL = 'http://localhost:8080';
var SASS_FILES = './src/sass/**/*.scss';
var WATCH_JS = ['./src/js/**/*.js'];
var MAIN_HTML_FILE = ['./public_html/index.html'];
var targetLocation = './public_html/';


function notify(error) {
    var message = 'In: ';
    var title = 'Error: ';
    if (error.description) {
        title += error.description;
    } else if (error.message) {
        title += error.message;
    }

    if (error.filename) {
        var file = error.filename.split('/');
        message += file[file.length - 1];
    }

    if (error.lineNumber) {
        message += '\nOn Line: ' + error.lineNumber;
    }
    console.log(error);
}


function Bundle() {

     
    var debugType = true;
 

    var Bundler = browserify({
        entries: './src/js/main.js',
        transform: [["babelify", {"presets": ["es2015"]}]],
        extensions: ['.js'],
        debug: debugType,
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    return Bundler
            .bundle()
            .on('error', notify);
}

gulp.task('build', function () {
    Bundle()
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(targetLocation+'js'))
            .on('finish', function ( ) {
                gutil.log("build bundle end");
                livereload.reload(pageURL);
            });
    ;
});
var sassProcess =
        function () {

            return gulp.src(SASS_FILES)
                    .pipe(sass().on('error', sass.logError))
                    .pipe(concat('css/style.css'))
                    .pipe(gulp.dest(targetLocation));
        };

gulp.task('sass', function () {
    sassProcess();

});

gulp.task('serve', function (done) {
    livereload.listen();
    gulp.src('public_html')
            .pipe(server({
                livereload: {
                    enable: true
                },
                host: '127.0.0.1',
                port: 8080,
                defaultFile: 'index.html',
                directoryListing: false,
                open: true
            }));
});

gulp.task('watch', function () {

    watch(SASS_FILES, function (events, done) {

        sassProcess()
                .on('finish', function ( ) {
                    gutil.log("processing change in css");
                    livereload.reload(pageURL);
                });

    });

    watch(WATCH_JS, function (events, done) {

        gulp.start('build');
    });

    watch(MAIN_HTML_FILE, function (events, done) {
        gutil.log("starting html change");
         livereload.reload(pageURL);
    });

});


gulp.task('default', [ 'build', 'sass', 'watch', 'serve']);
