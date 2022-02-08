from flask import Flask, render_template, url_for
from flask_flatpages import FlatPages
from flask_frozen import Freezer

from website.config import Config

pages = FlatPages()
freezer = Freezer()


def create_app():
    # Create the Flask application
    app = Flask(__name__)
    app.config.from_object(__name__)
    app.config.from_object(Config)
    register_extensions(app)
    register_blueprints(app)
    register_error_pages(app)
    return app


def register_extensions(app):
    pages.init_app(app)
    # freezer.init_app(app)


def register_blueprints(app):
    # Import the blueprints
    from website.main import bp as main_bp

    app.register_blueprint(main_bp)

    from website.blog import bp as blog_bp

    app.register_blueprint(blog_bp)


def register_error_pages(app):
    @app.errorhandler(404)
    def page_not_found(e):
        return render_template("404.html"), 404
