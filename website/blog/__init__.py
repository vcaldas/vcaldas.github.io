from flask import Blueprint

bp = Blueprint("blog", __name__, url_prefix="/blog")

from website.blog import routes
