'use strict';

import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
const minify = require("gulp-babel-minify");
import {output as pagespeed} from 'psi';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

//const SRC_IMAGES = "craft/web/src/images/**/*";

const DIST_SCRIPTS = "craft/web/dist/scripts";
const DIST_STYLES = "craft/web/dist/styles";
//const DIST_IMAGES = "craft/web/dist/images";

const LOCALSERVER = "local.zack-bernbaum";

const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

const SRC_STYLES = "craft/web/src/styles/main.scss";

const SRC_SCRIPTS = [
    'craft/web/src/scripts/vendor/jquery.min.js',
    'craft/web/src/scripts/vendor/jquery.fancybox.min.js',
    // 'craft/web/src/scripts/vendor/jquery.fancybox-thumbs.js',
    'craft/web/src/scripts/site-scripts.js'
];



const SRC_SCRIPTS_ES6 = [
];



// Compile and automatically prefix stylesheets
gulp.task('styles', () => {
    return gulp.src(SRC_STYLES)
        .pipe($.newer('.tmp/styles'))
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            precision: 10
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('.tmp/styles'))
        // Concatenate and minify styles
        .pipe($.if('*.css', $.cssnano({zindex: false})))
        .pipe($.size({title: 'styles'}))
        .pipe($.concat('main.css'))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(DIST_STYLES))
        .pipe(browserSync.stream())
        .pipe(gulp.dest('.tmp/styles'));
});


gulp.task('scripts', () =>
gulp.src(SRC_SCRIPTS)
    .pipe($.changed(DIST_SCRIPTS))
   // .pipe($.newer('.tmp/scripts'))
    .pipe($.sourcemaps.init())
    //.pipe($.babel())
    .pipe($.sourcemaps.write())
    //.pipe(gulp.dest('.tmp/scripts'))
    .pipe($.concat('main.min.js'))
    .pipe($.uglify({preserveComments: 'some'}))
    // Output files
    .pipe($.size({title: 'scripts'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(DIST_SCRIPTS))
    //.pipe(gulp.dest('.tmp/scripts'))
);


gulp.task('es6scripts', () =>
    gulp.src(SRC_SCRIPTS_ES6)
        .pipe($.changed(DIST_SCRIPTS))
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        // Output files
        .pipe($.size({title: 'es6 scripts'}))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(DIST_SCRIPTS))
);





gulp.task('default', [
    'scripts',
    'es6scripts',
    'styles',
    'watch']);

// Watch
gulp.task('watch', function() {
    browserSync.init({
        proxy: {
            target: LOCALSERVER
        },
        host: 'localhost'
    });
    //gulp.watch(SRC_IMAGES, ['images']);

    gulp.watch(SRC_SCRIPTS, ['scripts']);
    gulp.watch(SRC_SCRIPTS_ES6, ['es6scripts']);

   // gulp.watch(SRC_STYLES, ['styles']);
    gulp.watch("craft/web/src/styles/**/*", ['styles']);
});

