# Overview

I wanted to find a way to learn python and blog a little bit, sharing the
joys and hurdles when building something. I am aware of several other frameworks (e.g. [Jekyll](https://github.com/jekyll/jekyll) and Wordpress) however, I wanted to keep in python as much as possible.

[This site](http://vcaldas.github.io) is built with Flask and hosted on GitHub Pages.

Please report [errors or feedback here](https://github.com/vcaldas/vcaldas.github.io/issues).

## Websites that inspired me

Source of great ideas and codes.

* Excellent Flask tutorial by Miguel Grinber -[Megaflask Tutorial](https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world)

## Copyrights & License

All original content unless otherwise specified is placed
in the public domain by Victor Caldas to the extent
possible under law by the Creative Commons Zero declaration,
[CC0](http://creativecommons.org/publicdomain/zero/1.0/).  Please remember
to cite or attribute this content where appropriate.

*Any opinions, findings, and conclusions or recommendations expressed
in this material are those of the author(s).*

## Getting started

``` sh
$git clone https://github.com/vcaldas/vcaldas.github.io.git
$conda env create -f environment.yml
$pre-commit install
```

### Create a server for development

``` sh
$flask run
```

### Build

``` sh
$python buil.py
```

This command will create a static website on `./build`.
