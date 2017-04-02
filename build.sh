#!/bin/bash

# Enable error reporting to the console.
set -e

# Install bundles if needed
bundle check || bundle install

# NPM install if needed.
. $HOME/.nvm/nvm.sh && nvm install 6.1 && nvm use 6.1
npm install

# Build the site.
gulp

git clone https://$GITHUB_REPO
cd $(basename ${GITHUB_REPO%.git})
git config user.name "Travis CI"
git config user.email ${EMAIL}
rsync -az --delete --exclude '.git*' ../_site/ .
touch .nojekyll
git add -A .
git commit -m "Generated Jekyll site by Travis CI - ${TRAVIS_BUILD_NUMBER}"
git push --force "https://${DEPLOY_KEY}@${GITHUB_REPO}" HEAD:${REPO_TARGET_BRANCH}
