require "rubygems"
require "tmpdir"
require "bundler/setup"
require "jekyll"
require 'html-proofer'

# Change your GitHub reponame - Basic configurations.
# Note I deploy to master. Travis deploys to gh-pages!
GITHUB_REPONAME = "vcaldas/vcaldas.github.io"
GITHUB_REPO_BRANCH = "master"


task default: %w[deploy]

# Generate a stable build of your Jekyll source files into the `_site`-folder

desc "Generate blog files"
task :build do
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => ".",
    "destination" => "_site",
    "config" => "_config.yml"
  })).process
end


desc "Generate and publish blog to master"
task :deploy => [:build] do
  puts "----------------------------------"
  puts "\n##Initiating #{GITHUB_REPONAME}"
  system "git init"
  puts "----------------------------------"
  puts "\n## Staging modified files"
  status = system("git add --all")
  puts status ? "Success" : "Failed"
  puts "----------------------------------"
  puts "\n# Checking repository status"
  status = system("git status")
  puts "----------------------------------"
   puts "\n## Committing a site build at #{Time.now.utc}"
   #Example rake message="mymessage"
  message = ENV["message"] || "Site updated at #{Time.now.utc}"
  status = system("git commit -m \"#{message}\"")
  puts status ? "Success" : "Failed"
  puts "----------------------------------"
  system "git commit -m #{message.inspect}"
  puts "\n## Pushing commits to remote"
  #system "git remote add origin git@github.com:#{GITHUB_REPONAME}.git"
  system "git push origin #{GITHUB_REPO_BRANCH} --force"
  puts status ? "Success" : "Failed"
  puts "Website deployed! Now Travis will work."
end



task :test do
  HTMLProofer.check_directories(
    ["./_site"], {
      :allow_hash_href => true,
      :parallel => {:in_processes => 4},
      :only_4xx => true,
      :url_ignore => ["/^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?drupal\.org(?:/.*)?$/",
                      "/^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?linkedin\.com(?:/.*)?$/",
                      "/^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?fldrupal\.camp(?:/.*)?$/"],
      :empty_alt_ignore => false,
      :verbose => true,
      :typhoeus => {
        :timeout => 3 }
    }).run
end
