source "https://rubygems.org"
ruby '2.3.1'

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
gem "jekyll"
gem 'bootstrap', '~> 4.0.0.alpha6'
gem "jekyll-paginate"

# This is the default theme for new Jekyll sites. You may change this to anything you like.
gem "minima", "~> 2.0"



# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
# gem "github-pages", group: :jekyll_plugins

# If you have any plugins, put them here!
group :jekyll_plugins do
   gem "jekyll-feed", "~> 0.6"
   gem "rake"
   gem 'wdm', '>= 0.1.0' if Gem.win_platform?
end

# => gem 'html-proofer'
gem "jekyll-assets"
#
# Additional gems for jekyll-assets
#

gem "coffee-script" # We want to write our javascripts in CoffeeScript
gem "uglifier"      # And we want our javascripts to be minified with UglifyJS
gem "sass"          # And we 