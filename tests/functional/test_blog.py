"""
This file (test_blog.py) contains the functional tests for the `blog` blueprint.
"""
from website.blog.routes import blog_post_titles


def test_get_blog_page(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/blog/' page is requested (GET)
    THEN check the response is valid
    """
    titles = [b'Why I Love my Kitchenaid Stand Mixer',
              b'Why I Love having Lots of Measuring Cups',
              b'Thoughts on Air Fryers After Owning  For One Year']
    response = test_client.get('/blog/')
    assert response.status_code == 200
    for title in titles:
        assert title in response.data


def test_get_individual_blog_posts(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/blog/<blog_title>' page is requested (GET)
    THEN check the response is valid
    """
    for blog_title in blog_post_titles:
        response = test_client.get(f'/blog/{blog_title}/')
        assert response.status_code == 200
        assert str.encode(blog_title) in response.data


def test_get_invalid_individual_recipes(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/blog/<blog_title>' page is requested (GET) with invalid blog titles
    THEN check that 404 errors are returned
    """
    invalid_blog_titles = ['instant_pot', 'butter', 'abcd']
    for blog_title in invalid_blog_titles:
        response = test_client.get(f'/blog/{blog_title}/')
        assert response.status_code == 404


def test_get_about_page(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/about/' page is requested (GET)
    THEN check the response is valid
    """
    headings = [b'About', b'Recipes', b'Technology']
    response = test_client.get('/about/')
    assert response.status_code == 200
    for heading in headings:
        assert heading in response.data
