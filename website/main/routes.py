from website.main import bp
from flask import render_template, abort

@bp.route('/')
def main():
    return 'this is the landing page'
