import os
import shutil
import sys

import click
from flask_frozen import Freezer

from website import create_app

# Call the application factory function to construct a Flask application
# instance using the development configuration
app = create_app()

# Create an instance of Freezer for generating the static files from
# the Flask application routes ('/', '/breakfast', etc.)
freezer = Freezer(app)


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "build":
        print("Freezing website")
        with click.progressbar(
            freezer.freeze_yield(), item_show_func=lambda p: p.url if p else "Done!"
        ) as urls:
            for url in urls:
                # everything is already happening, just pass
                pass
        shutil.copytree("./website/static/", "./docs/static/", dirs_exist_ok=True)

    else:
        port = int(os.environ.get("PORT", 5000))
        app.run(host="0.0.0.0", port=port)
