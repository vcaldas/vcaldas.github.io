var gulp = require('gulp');
var requireDir = require('require-dir');

var run = require('gulp-run');
var concat = require('gulp-concat');
var less = require('gulp-less');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var cp = require('child_process');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var uncss = require('gulp-uncss');

// include paths file
var paths = require('../paths');

var pkg = require('../../package.json');

var banner = ['/*!\n',
    ' * Victor Caldas - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');


var landingScripts = [paths.vendorJQuery,
        paths.vendorTether,
        paths.vendorBootstrapJS,
        paths.vendorJQueryEasing,
        paths.vendorParticleJS,
        paths.vendorSweetScroll,        
        paths.srcJS + 'apps.js',
        paths.srcJS + 'grayscale.js',
        //paths.srcJS + 'vendor/ie10-viewport-bug-workaround.js',
    ];
var landingScripts = [paths.vendorJQuery,
        paths.vendorTether,
        paths.vendorBootstrapJS,
        paths.vendorJQueryEasing,
        paths.vendorParticleJS,
        paths.vendorSweetScroll,        
        paths.srcJS + 'apps.js',
        paths.srcJS + 'grayscale.js',
        paths.srcJS + 'pubs.js'
        //paths.srcJS + 'vendor/ie10-viewport-bug-workaround.js',
    ];

gulp.task('scripts:landing', () =>
    // NOTE: The order here is important since it's concatenated in order from
    // top to bottom, so you want vendor scripts etc on top
    gulp.src(landingScripts)
    .pipe(concat('landing.js'))
    .pipe(gulp.dest(paths.assetsJSFolder))
    .pipe(browserSync.reload({
        stream: true
    }))

    
);

gulp.task('scripts:publications', () =>
    // NOTE: The order here is important since it's concatenated in order from
    // top to bottom, so you want vendor scripts etc on top
    gulp.src(landingScripts)
    .pipe(concat('pubs.js'))
    .pipe(gulp.dest(paths.assetsJSFolder))
    .pipe(browserSync.reload({
        stream: true
    }))

);


gulp.task('scripts', gulp.parallel('scripts:landing', 'scripts:publications'));


// Minify compiled CSS
function minifycss() {
    return gulp.src(paths.assetsCSSFolder + '/main.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(sourcemaps.write())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.assetsCSSFolder))
        .pipe(browserSync.reload({
            stream: true
        }))
};



gulp.task('minify-css', function() {
    return gulp.src(paths.assetsCSSFolder + '/main.css')
        // .pipe(sourcemaps.init())
                // .pipe(sourcemaps.write())
        .pipe(uncss({
            html: ['_site/**/**.html', '_site/*.html']
        }))
        // .pipe(cleanCSS({
        //     compatibility: 'ie8'
        // }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.assetsCSSFolder))
        .pipe(browserSync.reload({
            stream: true
        }))
});



// Minify JS
gulp.task('minify-js', function() {
    return gulp.src(paths.assetsJSFolder + '/index.js')
        .pipe(uglify())
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});
// 'gulp styles' -- creates a CSS file from SCSS, adds prefixes and creates a Sourcemap
// 'gulp styles --prod' -- creates a CSS file from your SCSS, adds prefixes, minifies,
// gzips and cache busts it. Does not create a Sourcemap
gulp.task('sass', () =>
    gulp.src(paths.srcMainstyle)
    .pipe(sass({
        precision: 10
    }).on('error', sass.logError))
    .pipe(header(banner, {
        pkg: pkg
    }))
    .pipe(gulp.dest(paths.assetsCSSFolder))
    .pipe(browserSync.reload({
        stream: true
    }))
);

// /**
//  * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
//  */
// gulp.task('sass', function () {
//     return gulp.src('_scss/main.scss')
//         .pipe(sass({
//             includePaths: ['scss'],
//             onError: browserSync.notify
//         }))
//         .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
//         .pipe(gulp.dest('_site/css'))
//         .pipe(browserSync.reload({stream:true}))
//         .pipe(gulp.dest('css'));
// });



gulp.task('styles', gulp.series('sass', 'minify-css'));
gulp.task('javascript', gulp.series('scripts', 'minify-js'));

gulp.task('assets', gulp.series('sass', minifycss, 'scripts', 'minify-js'));
