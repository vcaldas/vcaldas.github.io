"""
The `recipes` blueprint handles displaying recipes.
"""
from flask import Blueprint

recipes_blueprint = Blueprint('recipes', __name__, template_folder='templates')

from . import routes
