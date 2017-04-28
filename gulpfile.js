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

// function to properly reload your browser
function reload(done) {
	browserSync.reload();
	done();
};






// Configure the browserSync task
gulp.task('sync', () => {
	browserSync.init({
		server: {
			baseDir: '_site'
		},
	})
});

function startServer(done) {
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
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
function watch() {
	// gulp.watch('_scss/*.scss', ['sass']);
	gulp.watch(['*.html', '_layouts/*.html', '_posts/*'], gulp.series('jekyll-rebuild'));

};



gulp.task('jekyll-rebuild', gulp.series('jekyll-build', reload));

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('serve', gulp.series('jekyll-build', startServer));

gulp.task('default', gulp.series('browser-sync', watch));
