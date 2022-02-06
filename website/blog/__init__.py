"""
The `blog` blueprint handles displaying blog posts.
"""
from flask import Blueprint

blog_blueprint = Blueprint('blog', __name__, template_folder='templates')

from . import routes
