# import sys, os
# import json
# import click
# # Imports
# from flask import Flask, render_template
# from flask_flatpages import FlatPages
# from flask_frozen import Freezer
# from flaskext.markdown import Markdown
# from config import Config


# app = Flask(__name__)
# app.config.from_object(__name__)
# app.config.from_object(Config)
# pages = FlatPages(app)
# freezer = Freezer(app)
# markdown_manager = Markdown(app, extensions=['fenced_code'], output_format='html5',)

# posts = [page for page in list(pages)]

# # Routes
# @app.route('/')
# def index():
#     return render_template('about.html')

# @app.route('/blogs/')
# def blogs():
#     return render_template('blogs.html', pages=posts, tag="all")

# @app.route('/<path:path>/')
# def page(path):
#     return render_template('page.html', page=pages.get_or_404(path))


# @app.errorhandler(404)
# def page_not_found(path):
#     # note that we set the 404 status explicitly
#     return render_template('404.html'), 404

# if __name__ == '__main__':
#     if len(sys.argv) > 1 and sys.argv[1] == "build":
#         print("Freezing website")
#         with click.progressbar(
#             freezer.freeze_yield(), item_show_func=lambda p: p.url if p else "Done!"
#             ) as urls:
#                 for url in urls:
#                     # everything is already happening, just pass
#                     pass
#     else:
#         port = int(os.environ.get('PORT', 5000))
#         app.run(host='0.0.0.0', port=port)
