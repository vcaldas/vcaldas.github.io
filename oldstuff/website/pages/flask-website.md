title: Static Websites with Frozen Flask
date: 2018-12-16
description: Get your own website up and running with just a couple lines of Python + Flask!
image: /static/pictures/FlaskBlog/head-image.png
readtime: 11 MINS
time: SUNDAY, DECEMBER 16, 2018

<div style="border-width:1px; border-color:#58a6ff; border-style:solid; padding-left:10px; padding-right:10px;">
  <p>
    <b>Notes</b>: Click this <a href="/static/pictures/Flaskblog/test-flask.zip">link</a> to download a ZIP file that contains the compiled version of all the code below.
  </p>
  <p>
    If you created your personal website based on this tutorial, drop the link as a comment at the bottom of this post, and I'll put a link to it below!
  </p>
  <p>
    john-b-yang <a href="https://github.com/john-b-yang/blog-website">Github</a></li>,
    mjt145 <a href="https://github.com/mjt145/flask_blog">Github</a>
  </p>
</div>

This post has been a long time coming. Today marks some time close to the one year anniversary of this blog, so to commemorate, I thought it'd be fun to write a post about how this website came to be! A year ago, I had always wanted to create my own portfolio website, and with the myriad of front end web design tools these days, the hardest part was figuring out *what* to use to put together a website that could handle an elastic amount of content. I wrote this blog as a detailed walkthrough of the first couple of steps I took to putting together the blog that you're reading today!

<br>
##### A Brief Discussion about Flask

I think it's important to provide some information about my background in web development to contextualize my opinions. I'm in no way a web development guru. I have very little experience with tools such as Ruby on Rails or React. I think the perspective I identify with most is someone who is very new to computer science in general. I'm not interested in studying a more specialized language like Javascript. I simply want to get a website off the ground with as little as code as possible, and I want something that is technically, structurally, and organizationally intuitive. If this sounds like you, then this tutorial could be helpful!

Ultimately, I settled on using [Flask](http://flask.pocoo.org/) for its simplicity. I found it easy to write clean, concise, and modularized code. URI and Routing management for creating new web pages boils down to just three lines of Python. Flask comes with Jinja2 templating for nested web pages, integrated unit testing, and built in server development and debugging tools. Paired with the [Frozen Flask](https://pythonhosted.org/Frozen-Flask/) and [Flask FlatPages](https://pythonhosted.org/Flask-FlatPages/) modules, and you have the perfect set of tools to build a static website. Frozen Flask "freezes" a Flask based application, generating a "build" file that converts your dynamic Flask code into a series of static files, meaning that your code can be hosted without any server side software. Instead of having to pull data from a traditional relational database, Flask Flat Pages allows you to construct content from regular text files, which makes writing and pushing blog content as simple as creating a new Markdown file in the designated directory.

<br>
##### Basic Setup

To keep all your modules and dependencies in order, I recommend creating a virtual environment, whether it's with the "virtualenv" module or an Anaconda environment. Within your Terminal, assuming you're using Anaconda, you'll want to type in something along the lines of this. The first three lines create the folder and python file that will contain your blog's Flask code. The remaining lines set up the virtual environment and install the necessary packages.

<pre class="prettyprint lang-bsh background">
$ mkdir flask_blog
$ cd flask_blog
$ touch server.py
$ conda create --name myenv
$ source activate myenv
$ pip install Flask Frozen-Flask Flask-FlatPages
</pre>

Pip will most likely install some extra dependencies that Flask comes with, but those are the bare necessities. Now, within the server.py file, you'll want to enter the following code.

<pre class="prettyprint lang-py background">
import sys, os
from flask import Flask
app = Flask(__name__)

# URL Routing - Home Page
@app.route("/")
def index():
    return "Hello World!"

# Main Function, Runs at http://0.0.0.0:8000
if __name__ == "__main__":
    app.run(port=8000)
</pre>

If you go back to Terminal and run the following command, you should see an output similar to the following. If you point your web browser at the given URL, you should see output like the third line begin to pop up. The webpage itself should just be a plain white screen with the words "Hello World!" at the top left corner.

<pre class="prettyprint lang-sh background">
$ python server.py
  * Running on http://127.0.0.1:8000/ (Press CTRL+C to quit)
127.0.0.1 - - [05/Jan/2019 17:48:24] "GET / HTTP/1.1" 200 -
</pre>

Note that at this point, you can start creating new routes using the same methodology as above. For example, if I wanted to create a new URL route at *welcome* pointing at a web page that displays "Welcome to my webpage!" (http://127.0.0.1:8000/welcome), I would just put the following block within the code.

<pre class="prettyprint lang-py background">
@app.route("/welcome/")
def welcome():
    return "Welcome to my webpage!"
</pre>

<br>
##### Flat Pages

The next step involves enabling the Flask app to create and display webpages from text files like Markdown! To make this happen, let's first create a markdown file that we can draw information from. Make sure that within Terminal, you're still within the *flask_blog* folder and type the following commands.

<pre class="prettyprint lang-sh background">
$ mkdir pages
$ touch pages/example-text.md
$ vi touch pages/example-text.md
</pre>

Within Vim on Terminal, enter the following content within the *example-text.md* file. Within our Markdown files, when we type in *&lt;key&gt;:&lt;value&gt;* at the top of our Markdown file, like for *title: My First Entry*, we are creating **metadata** that we can later access in our template HTML files.

Note that when Jinja2 renders content from a flat page, the metadata is not displayed. Only the content below is shown. Metadata can be particularly useful when it comes to organizing and filtering our text files, whether it's for our own or users' purposes. For example, if you want to display your blog entries chronologically, it might be useful to have a *date* metadata. In addition, if your users would like to filter your blog posts by category, it could be cool to have a series of *tag* metadata. Metadata is interpreted as YAML, so your metadata can have one of many types including string, boolean, integer, float, list, and even dictionaries.

<pre class="prettyprint lang-txt background">
title: My First Entry
date: 2018-01-01

This is my **first** blog post ever! Welcome!
</pre>

Now that our folder is set up, let's perform some Python acrobatics so that our web app can render a markdown file's content by its name! You can learn more about how to configure the Flat Pages module [here](https://pythonhosted.org/Flask-FlatPages/).

<pre class="prettyprint lang-py background">
import sys, os
from flask import Flask
from flask_flatpages import FlatPages

# Some configuration, ensures
# 1. Pages are loaded on request.
# 2. File name extension for pages is Markdown.
DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'

app = Flask(__name__)
app.config.from_object(__name__)
pages = FlatPages(app)

# URL Routing - Home Page
@app.route("/")
def index():
    return "Hello World!"

# URL Routing - Flat Pages
# Retrieves the page path and
@app.route("/&lt;path:path&gt;/")
def page(path):
    return pages.get_or_404(path).html

# Main Function, Runs at http://0.0.0.0:8000
if __name__ == "__main__":
    app.run(port=8000)
</pre>

<br>
##### Templating

At this point, our web page is able to render content, but it doesn't look very pretty. Using the Jinja2 template engine mixed with HTML, we can create webpage templates to add color, organization, and styling to our page content. Within the *flask_blog* directory, let's do the following:

<pre class="prettyprint lang-bsh background">
$ mkdir templates
$ touch templates/base.html
$ touch templates/page.html
</pre>

Jinja2 works very similarly to Django's templates. I very much like Jinja2's "template inheritance" feature. What this means is that you can create layers of HTML files enveloped within one another. Let's check it out in action here. As suggested by the file name, the *base.html* file will form the foundation of your website's styling and layout, kind of like your "root" file. The focus here is to introduce basic styling and exercise some of Jinja2's features and syntax, so boilerplate code like the following should do.

<pre class="prettyprint lang-html background">
&lt;!doctype html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;meta name="author" content="John Appleseed"&gt;
    &lt;meta name="description" content="John Appleseed's Blog"&gt;
    &lt;title>Appleseed's Blog&gt;/title&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;h1&gt;&lt;a href="{{ url_for("index") }}"&gt;Appleseed's Blog&lt;/a&gt;&lt;/h1&gt;

    &lt;div&gt;
        {% block content %}
        &lt;p&gt;Default Content&lt;/p&gt;
        {% endblock content %}
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>

Now, this looks like regular HTML, but there are a couple nice features to note. <br>
&bull; The **url_for()** generates a URL for the "index" endpoint, helpful for linking website parts w/o using the entire URL. [Documentation](http://flask.pocoo.org/docs/1.0/api/#flask.url_for). <br>
&bull; The **{% block content %}** and **{% endblock content %}** specify where nested HTML content should be placed (template inheritance!) <br>

Next, let's hash out *page.html*, which in the template inheritance relationship, can be thought of as the "child" of *base.html*. Again, we're not doing anything too fancy here.

<pre class="prettyprint lang-py background">
{% extends "base.html" %}
{% block content %}
    &lt;h2&gt;{{ page.title }}&lt;/h2&gt;
    {{ page.html|safe }}
{% endblock content %}
</pre>

Let's review some of the new Jinja2 syntax we've introduced. <br>
&bull; The **extends** keyword specifies the parent HTML template. Here, the *page.html*'s contents will go within **{% end/block content %}** of *base.html*. <br>
&bull; When you see page.**title** or page.**html**, we're accessing the metadata of the page. In this case, we'd be grabbing the title and contents of this page, but not the date (refer to *example-text.md*).

Of course, there's a lot more to Jinja2 than what's presented here, but for setup purposes, I believe this covers a few of the basic functions and syntax that you can expect to use repetitively as you build your web app out more thoroughly.

Last but not least, to make sure these HTML files are rendered properly, we will use the *render_template* function from flask, then change the *def page(path)* function to return the rendered HTML file as opposed to the raw code, as follows.

<pre class="prettyprint lang-py background">
from flask import Flask, render_template
...
def page(path):
    page = pages.get_or_404(path)
    return render_template("page.html", page=page)
</pre>

You have a pretty skeleton of a blog, albeit the lack of styling and a friendly interface.

<br>
##### Extras

At this point, I hope it's becoming apparent how easy creating a blog can be with Flask. You could go on to add more CSS styling, create new content in the form of templates or Markdown files, or deploy the website so your friends can check it out! These next couple sections will discuss potential improvements and augmentations for your website.

**HOME PAGE**

Right now, our home page (the '/' route) only displays a single line of "Hello World". Not very exciting. Let's add a page that lists all the available pages that a website visitor can check out.

Within terminal, in your *flask_blog* directory, create a file called *index.html*. The following code only contains the functionality for creating the list.

<pre class="prettyprint lang-html background">
{% extends "base.html" %}

{% block content %}
    &lt;h2&gt;Posts&lt;/h2&gt;
    &lt;ul&gt;
    {% for page in pages %}
        &lt;li&gt;
            &lt;a href="{{ url_for("page", path=page.path) }}"&gt;{{ page.title }}&lt;/a&gt;
        &lt;/li&gt;
    {% else %}
        &lt;li&gt;No pages so far&lt;/li&gt;
    {% endfor %}
    &lt;/ul&gt;
{% endblock content %}
</pre>

The syntax might look a little wonky at first, but it's pretty simple. The *pages* variable includes references to all the Markdown files within the *pages* directory. For every page, a hyperlink to it is created. In fact, if you create more markdown files within that directory, they will show up. On the other hand, if the *pages* directory is empty, the default "No pages so far" message will be shown instead.

Last but not least, within the *server.py* file, remember to change the index method to the following.
<pre class="prettyprint lang-py background">
@app.route('/')
def index():
    return render_template('index.html', pages=pages)
</pre>

**STATIC WEB APP**

Right now, our website is still dynamic, in that the Flask app still serves and renders flat pages from a file system. Our goal is to create a static set of files and assets that removes the Flask middleman service. It only takes a couple steps to make this happen.

<pre class="prettyprint lang-py background">
from flask_flatpages import FlatPages
from flask_frozen import Freezer # Added
...
pages = FlatPages(app)
freezer = Freezer(app) # Added
...
# Modified Main
if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "build":
        freezer.freeze()
    else:
        app.run(port=8000)
</pre>

We've added three lines to our code. <br>
&bull; **from flask_frozen import Freezer** - Import Statement <br>
&bull; **freezer = Freezer(app)** - Creates a frozen flask object of the Flask app <br>
&bull; **freezer.freeze()** - Method call that creates a set of static files from the Flask app <br>

In Terminal, if you run the command from within the *flask_blog* directory

<pre class="prettyprint lang-bsh background">
$ python server.py build
</pre>

A *build* folder will be autogenerated containing a series of *index.html* files for each Markdown/flat file, and you'll notice that any Flask code and the *server.py* file itself have been completely excluded from the build's result. This folder will contain a purely static web app that doesn't require Flask at all!

For example, after following this tutorial, you should have a directory that looks something along the lines of this. I added a couple extra markdown files for multiple pages.

<pre class="prettyprint lang-bsh background">
- flask_blog
    - pages
        - example-text.md
        - example-text2.md
        - example-text3.md
    - server.py
    - templates
        - base.html
        - index.html
        - page.html
</pre>

After running the command, your *build* directory should pop up within the flask_blog directory and look similar to the following.

<pre class="prettyprint lang-bsh background">
- build
    - example-text
        - index.html
    - example-text2
        - index.html
    - example-text3
        - index.html
    - index.html
</pre>
