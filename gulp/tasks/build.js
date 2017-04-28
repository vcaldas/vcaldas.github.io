'use strict';
var argv  = require('yargs').argv;
var gulp  = require('gulp');
var shell = require('shelljs');

// include paths file
var paths = require('../paths');


// 'gulp site' -- builds site with development settings
// 'gulp site --prod' -- builds site with production settings
gulp.task('site', done => {
  if (!argv.prod) {
    shell.exec('bundle exec jekyll build --config _config.yml');
    done();
  } else if (argv.prod) {
    shell.exec('bundle exec jekyll build');
    done();
  }
});
