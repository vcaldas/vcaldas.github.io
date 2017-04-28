require 'html-proofer'

# Change your GitHub reponame - Basic configurations.
# Note I deploy to master. Travis deploys to gh-pages!
GITHUB_REPONAME = "vcaldas/vcaldas.github.io"
GITHUB_REPO_BRANCH = "source"
GITHUB_DEPLOY_BRANCH = "master"


task default: %w[deploy]

desc "Copy tst"
task :gulp do
  system "gulp deploy"
end

desc "Publish website Files"
task :publish =>  ['gulp', 'deploy'] do
    puts "Create Dummy directory for website"
    system "git clone git@github.com:#{GITHUB_REPONAME}.git temp"
    Dir.chdir('temp') do
      puts "----------------------------------"
      system "git checkout master"
      #system "rm -rf *"
      #File.join(RAILS_ROOT, "../_site", "./")
    end
    FileUtils.rm_rf(Dir.glob('./temp/*'))
    FileUtils.cp_r('./_site/.', './temp')
    Dir.chdir('temp') do
      puts "----------------------------------"
      puts "\n## Staging modified files"
      status = system("git add --all")
      puts status ? "Success" : "Failed"
      puts "----------------------------------"
      puts "\n# Checking repository status"
      status = system("git status")
      puts "----------------------------------"
      puts "\n## Committing a site build at #{Time.now.utc}"
      message = ENV["message"] || "Site updated at #{Time.now.utc}"
      status = system("git commit -m \"#{message}\"")
      puts status ? "Success" : "Failed"
      puts "----------------------------------"
      system "git commit -m #{message.inspect}"
      puts "\n## Pushing commits to remote"
      #system "git remote add origin git@github.com:#{GITHUB_REPONAME}.git"
      system "git push origin #{GITHUB_DEPLOY_BRANCH} --force"
      puts status ? "Success" : "Failed"
      puts "Website deployed!"
    end
    system "git checkout source"
    FileUtils.rm_rf('temp')

end

desc "Run gulp"
task :gulp do
  puts "Run gulp"
  system "gulp"
end

desc "Generate and publish blog to master"
task :deploy do
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
  puts "Source branch updated."
end


desc "build and test website"
task :test do
  sh "bundle exec jekyll build"
  HTMLProofer.check_directory(
    "./_site",
    {
      :allow_hash_href => true,
      :url_ignore => ["/linkedin.com/","/^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?drupal\.org(?:/.*)?$/",
                      "/^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?linkedin\.com(?:/.*)?$/",
                      "/^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?fldrupal\.camp(?:/.*)?$/",
                      "/^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?vimeo\.camp(?:/.*)?$/"],
      :empty_alt_ignore => false,
      :disable_external => true,
      :verbose => true,
      :typhoeus => {
        :followlocation => true,
        :ssl_verifypeer => false,
        :headers => {
          'User-Agent' => 'html-proofer'
        }
      }
    }
  ).run
end
