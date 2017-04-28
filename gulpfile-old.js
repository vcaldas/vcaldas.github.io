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

// include paths file
var paths = require('./gulp/paths');
var local = {
	jekyll: ['**/*.html', '**/*.md', 'assets/**/*.*', '!_site/**/*.html']
}


var jekyllCommand = (/^win/.test(process.platform)) ? 'jekyll.bat' : 'jekyll';


var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};


/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {
			stdio: 'inherit'
		})
		.on('close', done);
});



/**
 * Rebuild Jekyll & do page reload
 */

 // function to properly reload your browser
function reload(done) {
	browserSync.reload();
	done();
};



gulp.task('jekyll-rebuild', gulp.series('jekyll-build', reload));


// Configure the browserSync task
gulp.task('sync', () => {
	browserSync.init({
		server: {
			baseDir: '_site'
		},
	})
});

function startServer(done){
	browserSync.init({
		// tunnel: true,
		// open: false,
		port: 4000, // change port to match default Jekyll
		server: {
			baseDir: '_site'
		}
	});
	done();
}

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', gulp.series('jekyll-build', startServer));




// // Runs jekyll build command using test config.
// gulp.task('build-dev', function(done) {
// 	var shellCommand = 'bundle exec jekyll build --config _config.yml,_config.test.yml';

// 	return gulp.src('')
// 		.pipe(run(shellCommand))
// 		.on('error', gutil.log)
// 		.on('close', done);
// });

// // gulp.task('reloadBrowser', done => {
// // 	browserSync.reload();
// // });








// gulp.task('devTask', (done) => {
// 	browserSync.init({
// 		// tunnel: true,
// 		// open: false,
// 		port: 4000, // change port to match default Jekyll
// 		server: {
// 			baseDir: '_site'
// 		}
// 	});
// 	done();

// 	// watch various files for changes and do the needful
// 	gulp.watch('src/**/**.scss', gulp.series('styles', 'build-dev', reload));
// 	gulp.watch('src/javascript/**/**.js', gulp.series('javascript', 'build-dev', reload));
// 	gulp.watch('_site/**/*.html', browserSync.reload);
// 	gulp.watch(local.jekyll, gulp.series('build-dev', reload));
// 	// gulp.watch(paths.jsFilesGlob, gulp.series('scripts', reload));
// 	// gulp.watch(paths.sassFilesGlob, gulp.series('styles'));
// 	// gulp.watch(paths.imageFilesGlob, gulp.series('images', 'images:feature', reload));
// });

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
*/
function watch() {
    // gulp.watch('_scss/*.scss', ['sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_posts/*'], gulp.series('jekyll-rebuild'));

};

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', gulp.series('browser-sync', watch));
