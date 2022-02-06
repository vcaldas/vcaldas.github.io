from flask import Flask, render_template


######################################
#### Application Factory Function ####
######################################

def create_app():
    # Create the Flask application
    app = Flask(__name__)

    register_blueprints(app)
    register_error_pages(app)
    return app


########################
### Helper Functions ###
########################

def register_blueprints(app):
    # Import the blueprints
    from website.recipes import recipes_blueprint
    from website.blog import blog_blueprint

    # Since the application instance is now created, register each Blueprint
    # with the Flask application instance (app)
    app.register_blueprint(recipes_blueprint)
    app.register_blueprint(blog_blueprint)


def register_error_pages(app):
    @app.errorhandler(404)
    def page_not_found(e):
        return render_template('404.html'), 404
