from website.main import bp
from flask import render_template, abort

@bp.route('/')
def main():
    return 'Currently not available. Working on something better'
