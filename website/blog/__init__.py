from flask import Blueprint

bp = Blueprint("blog", __name__)

from website.blog import routes
