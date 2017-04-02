#!/usr/bin/env bash
set -e
gulp build:test
#bundle exec scss-lint _assets/styles/scss/*/*.scss
#bundle exec mdl . -c .mdlrc --git-recurse
bundle exec rake test -f Rakefile
