"""
Blog flat pages
"""
from flask import g
from flask_flatpages import FlatPages


def register_pages(app):
    """Initializes and register flat pages in g.pages"""
    pages = FlatPages(app)

    def before():
        """Before request event to attach g.pages"""
        g.pages = PagesRepository(pages)

    app.before_request(before)


class PagesRepository(object):
    """Easy access to pages in the flat pages object"""

    def __init__(self, pages):
        self.__pages = pages

    def __iter__(self):
        return iter(self.__pages)

    @property
    def flatpages(self):
        """Get the flatpages object with all the pages"""
        return self.__pages

    @property
    def years(self):
        """Gets a list of integers with the years we have pages in"""
        return sorted(set(page["date"].year for page in self), reverse=True)

    @property
    def sorted(self):
        """Sort pages by date"""
        return _sort_pages(self)

    def by_year(self, year):
        """Get pages for a specific year"""
        return _sort_pages((p for p in self if p["date"].year == year))


def _sort_pages(pages):
    """Sort given pages by date"""
    return sorted(pages, key=lambda p: p["date"], reverse=True)
