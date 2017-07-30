var cleanCSS = require('gulp-clean-css');
var fs = require('fs');
var rename = require("gulp-rename");
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var cp = require('child_process');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var del = require('del');
var babel = require('gulp-babel');
var shell = require('gulp-shell');

// --- Arguments
var PRODUCTION = !!(yargs.argv.production);

// Load parameters

function loadConfig() {
    var ymlFile = fs.readFileSync('gulp/gulpconfig.yml', 'utf8');
    return yaml.load(ymlFile);
}

// ---------- Variables
var outputFolder = "_site/";

var sources = {
  sass: 'src/styles/**/*.scss',
	javascripts: 'src/js/**/*.js',
  templates: 'src/templates/**/*.html',
  assets: 'src/assets/**/*.*',
  app: 'src/app/**/*.ts',
  appWithDefinitions: 'src/**/*.ts',
  integration: 'src/tests/integration/**/*.js',
  index: 'src/index.html'
};

var destinations = {
  css: outputFolder + "assets/styles",
	cssdev: "assets/styles",
  js: outputFolder + "assets/js",
	jsdev: "assets/js",
  libs: outputFolder + "/vendor",
  assets: outputFolder + "/assets",
  index: outputFolder,
	images: "assets/img"
};

// Gulp tasks
var jekyll  = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// Set the banner content
var banner = ['/*!\n',
    ' * Victor Caldas - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license %> (https://github.com/vcaldas.github.io/<%= pkg.name %>/blob/master/LICENSE)\n',
    ' */\n',
    ''
].join('');

function clean() {
  return del([ '_site/', 'assets/js', 'assets/styles' ]);
}

/*
* Compile and minify sass
*/
function styles() {
  return gulp.src(sources.sass)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(destinations.css))
    .pipe(gulp.dest(destinations.cssdev))
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest(destinations.cssdev))
		.pipe(gulp.dest(destinations.css));
		// .pipe(browserSync.reload({stream: true}));
}

/**
 * Compile and minify js
 */
function scripts() {
  return gulp.src(sources.javascripts, { sourcemaps: true })
    .pipe(babel())
		.pipe(gulp.dest(destinations.jsdev))
    .pipe(uglify())
    // .pipe(concat('main.min.js'))
    .pipe(gulp.dest(destinations.jsdev))
		.pipe(gulp.dest(destinations.js));
		// .pipe(browserSync.reload({stream: true}));
}


/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
// exports.imagemin = imagemin;
// exports.watch = watch;

/**
 * Build the Jekyll Site
 */
// gulp.task('jekyll-build', function (done) {
//     browserSync.notify(messages.jekyllBuild);
//     return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
//         .on('close', done);
// });
// Task for building blog when something changed:
gulp.task('jekyll-build', shell.task(['bundle exec jekyll build --watch']));

// gulp.task('refresh', function(done){
//   browserSync.reload({stream: true});
// 	done();
// });

// /**
//  * Rebuild Jekyll & do page reload
//  */
// gulp.task('jekyll-rebuild', gulp.series('jekyll-build', 'refresh'));


// Task for serving blog with Browsersync
gulp.task('serve', function () {
    browserSync.init({server: {baseDir: '_site/'}});
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
    gulp.watch(sources.sass, gulp.series('styles'));
    gulp.watch(sources.javascripts, gulp.series('scripts'));
});


gulp.task('browser-sync', gulp.series('jekyll-build', 'serve'));

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
gulp.task(
  'build',

    gulp.parallel(styles, scripts)
);

gulp.task(
  'default',
  gulp.series('build', gulp.parallel('jekyll-build', 'serve' ))
);
