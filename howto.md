
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

Navigate inside the folder and get the gulp packages that will be used:

``` sh
$ npm install
```

#### Gulp

The following Gulp pipelines are available:


``` sh
$ gulp
```

Compile and launch the website

``` sh
$ gulp clean
```
Remove clean all generated files, including the website. It runs before also when building to deploy.


``` sh
$ gulp
```
