var gulp = require('gulp');
var requireDir = require('require-dir');
var tasks = requireDir('./gulp/tasks', {
	recurse: true
}); // eslint-disable-line
var run = require('gulp-run');
var concat = require('gulp-concat');
var less = require('gulp-less');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var cp = require('child_process');
var runSequence = require('run-sequence');
var notify = require('gulp-notify');

// include paths file
//var paths = require('./gulp/paths');
var local = {
	jekyll: ['**/*.html', '**/*.md', 'assets/**/*.*', '!_site/**/*.html']
}

var jekyllCommand = (/^win/.test(process.platform)) ? 'jekyll.bat' : 'jekyll';


var messages = {
	jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};


/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
// gulp.task('sass', function () {
// 		return gulp.src('src/styles/main.scss')
// 				.pipe(sass({
// 						includePaths: ['src/styles/**/*.scss'],
// 						onError: browserSync.notify
// 				}))
// 				//.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
// 				.pipe(gulp.dest('assets/css/main.css'))
// 				.pipe(browserSync.reload({stream:true}))
// 				.pipe(gulp.dest('_site/css/main.css'))
// 				.pipe(notify('Sass Compiled'));;
// });
//
// gulp.task('sass', function () {
//   return gulp.src('src/styles/**/*.scss')
// 		.pipe(sass())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('assets/css/main.css'));
// });



/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function(done) {
	browserSync.notify(messages.jekyllBuild);
	return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {
			stdio: 'inherit'
		})
		.on('close', done);
});



 /**
  * Rebuild Jekyll & do page reload
  */
gulp.task('jekyll-rebuild', gulp.series('jekyll-build', function () {
     browserSync.reload();
 }));

 /**
  * Wait for jekyll-build, then launch the Server
  */
gulp.task('browser-sync', gulp.series('sass', 'jekyll-build', function() {
     browserSync.init({
         server: {
             baseDir: '_site'
         }
     });
 }));

// /**
// *
// * BrowserSync.io
// * - Watch CSS, JS & HTML for changes
// * - View project at: localhost:3000
// *
// **/
// gulp.task('browser-sync', gulp.series(function() {
//   browserSync.init(['assets/css/*.css', 'src/styles/**/*.scss'], {
//     server: {
//       baseDir: '_site'
//     }
//   });
// });





 /**
  * Watch scss files for changes & recompile
  * Watch html/md files, run jekyll & reload BrowserSync
  */
gulp.task('watch', function () {
     gulp.watch('src/styles/**/*.scss', gulp.series('styles', browserSync.reload));
     gulp.watch(['*.html', '_layouts/*.html', '_posts/*'], gulp.series('jekyll-rebuild'));
 });


 /**
  * Default task, running just `gulp` will compile the sass,
  * compile the jekyll site, launch BrowserSync & watch files.
  */
gulp.task('default', gulp.series('styles', 'browser-sync', 'watch'));
