from flask import Flask, render_template

from website.config import Config


def create_app():
    # Create the Flask application
    app = Flask(__name__)
    app.config.from_object(__name__)
    app.config.from_object(Config)
    register_blueprints(app)
    register_error_pages(app)
    return app


def register_blueprints(app):
    # Import the blueprints
    from website.main import bp as main_bp

    # Since the application instance is now created, register each Blueprint
    # with the Flask application instance (app)
    app.register_blueprint(main_bp)


def register_error_pages(app):
    @app.errorhandler(404)
    def page_not_found(e):
        return render_template("404.html"), 404
