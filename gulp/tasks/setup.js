/**
* Victor Caldas - 2017
* Caldas.victor@gmail.com
* $ gulp setup
* Scripts for copying all third-party files to the folders */

// Copy all files from vendors to their proper places in the Jekyll folder structure

var gulp       		= require('gulp');
var requireDir 		= require('require-dir');
var gutil 			= require('gulp-util');
var del             = require('del');
var argv            = require('yargs').argv;
var gulpif          = require('gulp-if');
// include paths file
var paths = require('../paths');

//Copy Font-Awesome in parallel
const fontawesome 	= gulp.parallel(fontawesomeFonts, fontawesomeStyles);
// Academicons
const academicons 	= gulp.parallel(academiconsFonts, academiconsStyles);
// Bootstrap
const bootstrap 	= gulp.parallel(bootstrapStyle,bootstrapJS);
//SweetScroll
const copyJS 		= gulp.parallel(sweetScroll, tether, jquery, particle);


// // Run to import collect fonts from sources into assets
gulp.task('fonts', gulp.parallel(fontawesome, academicons));
gulp.task('bootstrap', bootstrap);
gulp.task('vendorJs', copyJS);

gulp.task('setup', gulp.parallel(fontawesome, academicons,bootstrap, copyJS));


// Places Font Awesome fonts in proper location.
function particle() {
    return gulp.src(paths.vendorParticleJS)
        	.pipe(gulp.dest(paths.srcParticle))
        	.on('error', gutil.log);
  };


// Places Font Awesome fonts in proper location.
function jquery() {
    return gulp.src(paths.vendorJQuery)
        	.pipe(gulp.dest(paths.srcJSJQuery))
        	.on('error', gutil.log);
  };

// Places Font Awesome fonts in proper location.
function tether() {
    return gulp.src(paths.vendorTether)
        	.pipe(gulp.dest(paths.srcJSTether))
        	.on('error', gutil.log);
  };

// Places Font Awesome fonts in proper location.
function sweetScroll() {
    return gulp.src(paths.vendorSweetScroll)
        	.pipe(gulp.dest(paths.srcJSSweetScroll))
        	.on('error', gutil.log);
  };

// Places Font Awesome fonts in proper location.
function bootstrapJS() {
    return gulp.src(paths.vendorBootstrapJS)
        	.pipe(gulp.dest(paths.srcJSBoostrap))
        	.on('error', gutil.log);
  };

 // Places Font Awesome fonts in proper location.
function bootstrapStyle() {
    return gulp.src(paths.vendorBootstrapStyle)
        	.pipe(gulp.dest(paths.srcStyleBoostrap))
        	.on('error', gutil.log);
  };


// Places Font Awesome fonts in proper location.
function fontawesomeFonts() {
    return gulp.src(paths.vendorFontAwesomeFonts)
        	.pipe(gulp.dest(paths.assetsFontFolder))
        	.on('error', gutil.log);
  };


function fontawesomeStyles() {
    return gulp.src(paths.vendorFontAwesomeStyle)
        	.pipe(gulp.dest(paths.srcStyleFontAwesome))
        	.on('error', gutil.log);
  };


function academiconsFonts() {
    return gulp.src(paths.vendorAcademiconsFonts)
        .pipe(gulp.dest(paths.assetsFontFolder))
        .on('error', gutil.log);
};

function academiconsStyles() {
    return gulp.src(paths.vendorAcademiconsStyle)
        .pipe(gulp.dest(paths.srcStyleAcademicons))
        .on('error', gutil.log);
};


gulp.task('clean', function(callback) {
    del([paths.srcStyleFontAwesome,
        paths.srcStyleBoostrap,
        paths.srcStyleAcademicons,
        paths.srcJSBoostrap,
        paths.srcJSSweetScroll,
        paths.srcJSTether,
        paths.srcJSJQuery,
        paths.srcParticle,
        paths.assetsFontFolder,
        paths.assetsCSSFolder
    ]);
    callback();
});
