---
permalink: /manual/
title: "Development Notes"
modified: 2016-04-18T16:39:37-04:00
author_profile: true
layout: default
---

Overview
========


[This site](http://victorcaldas.com) is built with Jekyll and hosted on GitHub Pages. Site source at
[vcaldas/vcaldas.github.io](http://github.com/vcaldas/vcaldas.github.io).

Travis-CL Build status: ![alt text](https://travis-ci.org/vcaldas/vcaldas.github.io.svg?branch=master)

Please report [errors or feedback here](https://github.com/vcaldas/vcaldas.github.io/issues).

-----------------------------------------------------------------------------------------------------------

Site Features & Credits
=======================

I use 4-step development for this website:
  - Setup
  $ gulp setup

  In a fresh start, collect all third party files and copy to the respective directories. By doing that, I have control over when a particular package is updated and can implement the updates when needed

  - compilation
  $ gulp compile

  Compile sass and js files, including minification
