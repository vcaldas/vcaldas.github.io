from flask import render_template

from website.main import bp


@bp.route("/")
def main():
    return render_template("landing.html")


@bp.route("/publications")
def publications():
    return render_template("publications.html")
