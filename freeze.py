import shutil

import click
from flask_frozen import Freezer

from website import create_app

# Call the application factory function to construct a Flask application
# instance using the development configuration
app = create_app()

# Create an instance of Freezer for generating the static files from
freezer = Freezer(app)


if __name__ == "__main__":
    # Generate the static files using Frozen-Flask
    with click.progressbar(
        freezer.freeze_yield(), item_show_func=lambda p: p.url if p else "Done!"
    ) as urls:
        for url in urls:
            # everything is already happening, just pass
            pass
    # freezer.run()
    # Hack to copy the content of statics folder
    shutil.copytree("./website/static/", "./docs/static/", dirs_exist_ok=True)
