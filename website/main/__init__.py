"""
The `blog` blueprint handles displaying main pages.
"""
from flask import Blueprint

bp = Blueprint("main", __name__, template_folder="templates")

from website.main import routes
