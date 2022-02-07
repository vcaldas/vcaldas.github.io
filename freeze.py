import shutil

from flask_frozen import Freezer

from website import create_app

# Call the application factory function to construct a Flask application
# instance using the development configuration
app = create_app()

# Create an instance of Freezer for generating the static files from
freezer = Freezer(app, with_no_argument_rules=False, log_url_for=True)


if __name__ == "__main__":
    # Generate the static files using Frozen-Flask
    freezer.freeze_yield()
    # Hack to copy the content of statics folder
    shutil.copytree("./website/static/", "./docs/static/", dirs_exist_ok=True)
