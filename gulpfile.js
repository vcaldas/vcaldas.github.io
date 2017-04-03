var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var cp = require('child_process');
//--------//
var runSequence = require('run-sequence');
var run = require('gulp-run');
var gutil = require('gulp-util');

//-----//

var jekyllCommand = (/^win/.test(process.platform)) ? 'jekyll.bat' : 'jekyll';

var paths = {
  //imagesSrc: ['_src/img/**/*', '!_src/img/team/*.psd'],
  //imagesDest: 'img',
  //scripts: ['_src/js/**/*.js', '!_src/js/vendor**/*.js'],
  //sass: '_src/sass/style.scss',
  //sassFiles: '_src/sass/**/*.scss',
  //fonts: 'fonts/**/*.css',
  //assets: '_site/assets/',
  jekyll: ['**/*.html', '**/*.md', 'assets/**/*.*', '!_site/**/*.html']
}

// Set the banner content
var banner = ['/*!\n',
    ' * Victor Caldas - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

// Compiles SCSS files from /scss into /css
gulp.task('sass', function() {
    return gulp.src('src/styles/main.scss')
        .pipe(sass())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
        .on('error', gutil.log)
});

// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
    return gulp.src('assets/css/main.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src('src/js/app.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('assets/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy lib libraries from /node_modules into /lib
gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('assets/lib/bootstrap'))
        .on('error', gutil.log);

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('assets/lib/jquery'))
        .on('error', gutil.log);

    gulp.src(['node_modules/tether/dist/js/*.js'])
        .pipe(gulp.dest('assets/lib/tether'))
        .on('error', gutil.log);

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('assets/lib/font-awesome'))
        .on('error', gutil.log);
})

// Run everything
gulp.task('default', ['sass', 'minify-css', 'minify-js', 'copy','jekyll-build']);

// Configure the browserSync task
gulp.task('browserSync', ['jekyll-build'],function() {
    browserSync.init({
        server: {
            baseDir: '_site'
        },
    })
})

/*
 * Build the Jekyll Site
 * runs a child process in node that runs the jekyll commands

gulp.task('jekyll-build', function (done) {
    return cp.spawn(jekyllCommand, ['build'], {stdio: 'inherit'})
        .on('close', done);
});
 */

// Our 'build' tasks for jekyll server.
gulp.task('jekyll-build', function (done) {
  return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
    .on('error', gutil.log)
    .on('close', done);
});

/*
 * Rebuild Jekyll & reload browserSync
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});


// Dev task with browserSync
gulp.task('dev', ['browserSync', 'sass', 'minify-css', 'minify-js'], function() {
    gulp.watch('src/styles/*.scss', ['sass']);
    gulp.watch('assets/css/*.css', ['minify-css']);
    gulp.watch('src/js/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch(paths.jekyll, ['jekyll-build']);
    gulp.watch('_site/**/*.html', browserSync.reload);
    gulp.watch('assets/js/**/*.js', browserSync.reload);

});


//---- new codes -- //

// Builds site anew using test config.
gulp.task('build:test', function(callback) {
    runSequence(//'clean',
      //  ['build:scripts', 'build:images', 'build:styles', 'build:fonts'],
        //'build:jekyll:test',
        ['sass','minify-css','minify-js', 'copy'], 'build:jekyll:test',
        callback);
});

// Runs jekyll build command using test config.
gulp.task('build:jekyll:test', function(done) {
    var shellCommand = 'bundle exec jekyll build --config _config.yml,_config.test.yml';

    return gulp.src('')
        .pipe(run(shellCommand))
        .on('error', gutil.log)
        .on('close', done);
});
