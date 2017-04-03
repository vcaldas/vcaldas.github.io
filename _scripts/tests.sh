Script started on Mon Apr  3 17:44:39 2017
[?1034hbash-3.2$ ./[K[Kbst[K[Kash tests.sh 
Script started, output file is started
Script: on: No such file or directory

Script done, output file is started
bash-3.2$ ls
build.back.sh	build.sh	started		tests.sh
bash-3.2$ rake[K[K[K[Kcd ..
bash-3.2$ s[Kls
CNAME			_includes		gulpfile copy.js
Gemfile			_layouts		gulpfile.js
Gemfile.lock		_pages			index.md
README.md		_scripts		node_modules
Rakefile		_site			package.json
_config.test.yml	assets			src
_config.yml		cv.pdf
_draft			favicon.ico
bash-3.2$ rake
Ignoring gem-wrappers-1.2.7 because its extensions are not built.  Try: gem pristine gem-wrappers --version 1.2.7
----------------------------------

##Initiating vcaldas/vcaldas.github.io
Reinitialized existing Git repository in /Users/caldas/git/vcaldas.github.io/.git/
----------------------------------

## Staging modified files
Success
----------------------------------

# Checking repository status
On branch source
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	[32mmodified:   .travis.yml[m
	[32mmodified:   _scripts/build.sh[m
	[32mnew file:   _scripts/started[m
	[32mmodified:   _scripts/tests.sh[m

----------------------------------

## Committing a site build at 2017-04-03 15:45:55 UTC
[source 90c39f6] Site updated at 2017-04-03 15:45:55 UTC
 4 files changed, 42 insertions(+), 40 deletions(-)
 rewrite .travis.yml (90%)
 mode change 100644 => 100755 _scripts/build.sh
 create mode 100644 _scripts/started
 mode change 100644 => 100755 _scripts/tests.sh
Success
----------------------------------
On branch source
nothing to commit, working tree clean

## Pushing commits to remote
Counting objects: 6, done.
Delta compression using up to 4 threads.
Compressing objects:  16% (1/6)   Compressing objects:  33% (2/6)   Compressing objects:  50% (3/6)   Compressing objects:  66% (4/6)   Compressing objects:  83% (5/6)   Compressing objects: 100% (6/6)   Compressing objects: 100% (6/6), done.
Writing objects:  16% (1/6)   Writing objects:  33% (2/6)   Writing objects:  50% (3/6)   Writing objects:  66% (4/6)   Writing objects:  83% (5/6)   Writing objects: 100% (6/6)   Writing objects: 100% (6/6), 2.12 KiB | 0 bytes/s, done.
Total 6 (delta 1), reused 0 (delta 0)
remote: Resolving deltas:   0% (0/1)   [Kremote: Resolving deltas: 100% (1/1)   [Kremote: Resolving deltas: 100% (1/1), completed with 1 local objects.[K
To https://github.com/vcaldas/vcaldas.github.io.git
   befcea8..90c39f6  source -> source
Success
Website deployed! Now Travis will work.
bash-3.2$ curl https://www.teleconsole.com/get.sh | sh
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100   933  100   933    0     0   2239      0 --:--:-- --:--:-- --:--:--  2303
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100   143  100   143    0     0    120      0  0:00:01  0:00:01 --:--:--   121
  0     0    0     0    0     0      0      0 --:--:--  0:00:01 --:--:--     0100   614    0   614    0     0    366      0 --:--:--  0:00:01 --:--:--  5531
  1 4302k    1 69175    0     0  26658      0  0:02:45  0:00:02  0:02:43 26658 53 4302k   53 2293k    0     0   649k      0  0:00:06  0:00:03  0:00:03 2378k100 4302k  100 4302k    0     0  1071k      0  0:00:04  0:00:04 --:--:-- 2979k
Copying teleconsole binary into /usr/local/bin
Password:
Teleconsole has been installed into /usr/local/bin/teleconsole
bash-3.2$ 