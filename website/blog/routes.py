from itertools import groupby

from flask import g, render_template

from website.blog import bp


@bp.route("/")
def index():
    """blog index page"""
    pages = g.pages
    return render_template("blog/index.html", pages=pages, years=pages.years)


@bp.route("/<path:path>/")
def flat_page(path):
    """flat pages rendering"""
    page = g.pages.flatpages.get_or_404(path)
    # Configure the img link plugin
    g.flat_page = page
    return render_template("blog/article.html", page=page)
