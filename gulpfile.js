// modified from generator-jekyllized 1.0.0-rc.6
var gulp          = require('gulp');
var requireDir    = require('require-dir');
var fs            = require('fs');
var yargs         = require('yargs');
var yaml          = require('js-yaml');
var del           = require('del');
var sass          = require('gulp-sass');
var browserSync   = require('browser-sync').create();;
var cssnano       = require('gulp-cssnano');
var gulpif        = require('gulp-if');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer');
var rsync         = require('gulp-rsync');
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');
var imagemin      = require('gulp-imagemin');
var wiredep       = require('wiredep').stream;
var autoprefixer  = require('gulp-autoprefixer');
var spawn         = require('cross-spawn');
var sequence      = require('run-sequence');
var purify        = require('gulp-purifycss');


// --- Arguments
var PRODUCTION = !!(yargs.argv.production);

// Set the banner content
var banner = ['/*!\n',
    ' * Victor Caldas - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license %> (https://github.com/vcaldas/<%= pkg.name %>/blob/master/LICENSE)\n',
    ' */\n',
    ''
].join('');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// Gulp tasks
var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

// Load configuration parameters
function loadConfig() {
    var ymlFile = fs.readFileSync('gulp/gulpconfig.yml', 'utf8');
    return yaml.load(ymlFile);
}

var config = loadConfig();
module.exports = config;

// Clean all compiled files
gulp.task('clean', function(done) {
    del(config.clean);
    done();
});

gulp.task('sass', function(done) {
    return gulp.src(config.sass.src)
        // .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(config.sass.compatibility))
        .pipe(gulp.dest(config.sass.dest.jekyllRoot))
        .pipe(gulpif(PRODUCTION, cssnano()))
        // .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
        .pipe(gulp.dest(config.sass.dest.buildDir))
            ;
});



gulp.task('javascript', function(done) {
    browserSync.notify(config.javascript.notification);
    return gulp.src(config.javascript.src)
        // .pipe(sourcemaps.init())
        // .pipe(concat(config.javascript.filename))
        // .pipe(gulpif(PRODUCTION, uglify()))
        .pipe(gulp.dest(config.javascript.dest.jekyllRoot))
        .pipe(gulp.dest(config.javascript.dest.buildDir));
});

gulp.task('css', function(done) {
  return gulp.src(config.jekyll.css)
    .pipe(purify([config.jekyll.site]))
    .pipe(gulp.dest(config.sass.dest.jekyllRoot))
    .pipe(gulpif(PRODUCTION, cssnano()))
    // .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(gulp.dest(config.sass.dest.buildDir));
});


gulp.task('fonts', function() {
    browserSync.notify(config.fonts.notification);
    return gulp.src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.dest.jekyllRoot))
        .pipe(gulp.dest(config.fonts.dest.buildDir));
});

gulp.task('copy', function() {
    browserSync.notify(config.copy.notification);
    return gulp.src(config.copy.assets)
        .pipe(gulpif(PRODUCTION, imagemin()))
        .pipe(gulp.dest(config.copy.dist));
});

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var styles    = gulp.series('sass');
var scripts   = gulp.series('javascript');
var assets    = gulp.series(styles, scripts, 'fonts');
// Define tasks
gulp.task('assets', assets)

gulp.task('jekyll-build', function(done) {
    browserSync.notify(config.jekyll.notification);
    return spawn('bundle', ['exec', 'jekyll', 'build'], {
            stdio: 'inherit'
        })
        .on('close', done);
});


// gulp.task('jekyll-build', function(done) {
//     browserSync.notify(config.jekyll.notification);
//     return spawn('jekyll', ['build'], {
//             stdio: 'inherit'
//         })
//         .on('close', done);
// });

//functions to have in the end
// build, deploy, dev, server


gulp.task('build', gulp.series('clean', assets, 'jekyll-build', 'copy'))

gulp.task('browser-sync', function() {
    browserSync.init({
        notify: config.browsersync.notify,
        open: config.browsersync.open,
        port: config.browsersync.port,
        server: {
            baseDir: config.browsersync.server.basedir
        },
        xip: config.browsersync.xip,
        browser: config.browsersync.browser
    });
});


gulp.task('watch', function() {
    gulp.watch(config.watch.pages,  gulp.series('jekyll-build') );
    gulp.watch(config.watch.javascript, gulp.series(scripts));
    gulp.watch(config.watch.sass, gulp.series(styles));
    // gulp.watch(config.watch.images, gulp.series('copy', browserSync.reload));
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

gulp.task('build-clean', gulp.series('build', 'css'))

gulp.task('default', gulp.series('build', gulp.parallel( 'browser-sync', 'watch')));

gulp.task('develop', gulp.parallel('browser-sync', 'watch'))
// gulp.task('deploy', function(done){
//     sequence('build', 'rsync', done);
// });
