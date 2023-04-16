from flask import g, render_template

from website.blog import bp


@bp.route("/blog/")
def blog():
    pages = g.pages
    return render_template("blog.html", pages=pages)


@bp.route("/<path:path>/")
def flat_page(path):
    """flat pages rendering"""
    page = g.pages.flatpages.get_or_404(path)
    # Configure the img link plugin
    g.flat_page = page
    return render_template("article.html", page=page)
