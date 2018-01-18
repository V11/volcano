/**
 * Created by kurpav on 4/15/15.
 */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    karma = require('gulp-karma'),
    ngmin = require('gulp-ngmin'),
    concat = require('gulp-concat'),
    runSequence = require('gulp-run-sequence'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    ngHtml2Js = require("gulp-ng-html2js"),
    minifyHtml = require("gulp-minify-html"),
    processhtml = require('gulp-processhtml'),
    clean = require('gulp-clean');

var consts = {
    app: './src',
    dist: './dist'
};

/**
 * Private tasks
 */

gulp.task('sass', function () {
    return gulp.src(consts.app + '/stylesheets/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(consts.app + '/stylesheets'))
        .pipe(reload({stream: true}));
});

gulp.task('jsApp', function () {
    return gulp.src(['src/js/index.js', 'src/js/controllers/*.js'])
        .pipe(concat('app.min.js'))
        .pipe(ngmin())
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('jsLib', function () {
    return gulp.src(['src/js/libs/jquery.min.js', 'src/js/libs/bootstrap.min.js',
        'src/js/libs/angular.min.js', 'src/js/libs/angular-route.min.js',
        'src/js/libs/ui-bootstrap-custom-0.13.0.min.js', 'src/js/libs/ui-bootstrap-custom-tpls-0.13.0.min.js',
        'src/js/libs/nya-bs-select.min.js'])
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function () {
    gulp.src(consts.app + '/stylesheets/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(consts.app + '/stylesheets'));
    return gulp.src('src/stylesheets/*.css')
        .pipe(concat('app.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('htmlMain', function () {
    return gulp.src(consts.app + '/index.html')
        .pipe(processhtml())
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(gulp.dest(consts.dist));
});

/*gulp.task('htmlTpl', function () {
    return gulp.src(consts.app + '/partials/!*.html')
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2Js({
            moduleName: 'app.templates',
            prefix: '/partials'
        }))
        .pipe(concat('partials.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(consts.dist + '/partials'));
});*/

gulp.task('clean', function() {
    return gulp.src(consts.dist)
        .pipe(clean({force: true}));
});

gulp.task('copy', function() {
    gulp.src(consts.app + '/config/**/*')
        .pipe(gulp.dest(consts.dist + '/config'));
    gulp.src(consts.app + '/partials/**/*')
        .pipe(gulp.dest(consts.dist + '/partials'));
    return gulp.src(consts.app + '/images/**/*')
        .pipe(gulp.dest(consts.dist + '/images'));
});

gulp.task('test', function () {
    // Be sure to return the stream
    // NOTE: Using the fake './foobar' so as to run the files
    // listed in karma.conf.js INSTEAD of what was passed to
    // gulp.src !
    return gulp.src('./foobar')
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function (err) {
            // Make sure failed tests cause gulp to exit non-zero
            console.log(err);
            this.emit('end'); //instead of erroring the stream, end it
        });
});

/**
 * Public tasks
 */

gulp.task('serve', function () {
    browserSync.init({
        server: consts.app
    });

    gulp.watch(consts.app + '/stylesheets/*.scss', ['sass']);
    gulp.watch(consts.app + "/**/*.html").on('change', reload);
    gulp.watch(consts.app + "/**/*.js").on('change', reload);
    //gulp.watch([consts.app + "/**/*.html", consts.app + "/**/*.js"], ['test']);
});

gulp.task('default', function () {
    runSequence('clean', ['copy', 'htmlMain', 'jsApp', 'jsLib', 'css']);
});

