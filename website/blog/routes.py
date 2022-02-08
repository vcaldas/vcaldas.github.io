from flask import render_template, url_for

from website import freezer, pages
from website.blog import bp


@bp.route("/")
def index():
    return render_template("blog/index.html", pages=pages)


@bp.route("/<path:path>.html")
def page(path):
    page = pages.get_or_404(path)
    return render_template("page.html", page=page)


@freezer.register_generator
def pagelist():
    for page in pages:
        print(f"making page for {page.path}")
        yield url_for("blog", path=page.path)
