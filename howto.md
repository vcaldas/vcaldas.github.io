
Short reference guide
=====================


[This site](http://victorcaldas.com) is built with Jekyll and hosted on GitHub Pages. Site source at
[vcaldas/vcaldas.github.io](http://github.com/vcaldas/vcaldas.github.io).

Travis-CI Build status: ![alt text](https://travis-ci.org/vcaldas/vcaldas.github.io.svg?branch=master)

Please report [errors or feedback here](https://github.com/vcaldas/vcaldas.github.io/issues).

--------------------------------------------------------------------------------

This short document will guide you through the steps to use my template. Note that this is a work in development and feedback is welcome.


## First use

I add several folders to the .gitignore file to reduce traffic. This means that locally my build always work even if a file is missing. For a fresh install, you would have to download the missing repositories and files.

### Getting the website
On the directory you want to copy, type:

``` sh
$ git clone https://github.com/vcaldas/vcaldas.github.io.git
```

This command will create a folder "vcaldas.github.io".

### Checking dependencies

I use a series of other packages, not necessarily following the best practices. Drop a message if something hurt your eyes! =D

#### Gulp
  Used to automatize routines

  ``` sh
  $ npm install gulp
  ```

  You might want to update (You will get a message):

  ``` sh
  # Depending on how you installed, you would need sudo
  $ npm i -g npm
  ```

  Get the gulp packages that will be used:

  ``` sh
  $ npm install
  ```gulp
