from flask import Flask, render_template
from flask_frozen import Freezer

from website.blog.blog_pages import register_pages
from website.config import Config

freezer = Freezer()


def create_app():
    # Create the Flask application
    app = Flask(__name__)
    app.config.from_object(__name__)
    app.config.from_object(Config)
    register_extensions(app)
    register_blueprints(app)
    register_error_pages(app)
    app.add_template_filter(l10n_date)

    register_pages(app)

    return app


def register_extensions(app):
    pass


def register_blueprints(app):
    # Import the blueprints
    from website.main import bp as main_bp

    app.register_blueprint(main_bp)

    from website.blog import bp as blog_bp

    app.register_blueprint(blog_bp, url_prefix="/blog")


def register_error_pages(app):
    @app.errorhandler(404)
    def page_not_found(e):
        return render_template("404.html"), 404


def l10n_date(date):
    """Jinja filter for human dates from date objects"""
    return date.strftime("%a %d %B %Y")
