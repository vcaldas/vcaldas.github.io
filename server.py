import sys, os
from flask import Flask, render_template
from flask_flatpages import FlatPages
from flask_frozen import Freezer
import config

# Some configuration, ensures
# 1. Pages are loaded on request.
# 2. File name extension for pages is Markdown.

app = Flask(__name__)
app.config.from_object(__name__)
app.config.from_object(config.Config)

pages = FlatPages(app)
freezer = Freezer(app)

# URL Routing - Home Page
@app.route('/')
def landing():
    return render_template('landing.html')


@app.route('/publications/')
def publications():
    return render_template('publications.html')


# # URL Routing - Flat Pages
# # Retrieves the page path and
# @app.route('/<path:path>/')
# def page(path):
#     page = pages.get_or_404(path)
#     return render_template("page.html", page=page)

# Main Function, Runs at http://0.0.0.0:8000
if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "build":
        freezer.freeze()
    else:
        app.run(port=8000)