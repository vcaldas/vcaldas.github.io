"""
This file (test_recipes.py) contains the functional tests for the `recipes` blueprint.
"""
from website.recipes.routes import breakfast_recipes_names, dinner_recipes_names, \
                                   baked_goods_recipes_names, side_dishes_recipes_names, \
                                   dessert_recipes_names, drink_recipes_names


def test_get_home_page(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/' page is requested (GET)
    THEN check the response is valid
    """
    header_items = [b'Kennedy Family Recipes', b'Recipes', b'Blog', b'About']
    recipe_types = [b'Breakfast', b'Dinner', b'Side Dishes',
                    b'Dessert', b'Drinks', b'Baked Goods']
    response = test_client.get('/')
    assert response.status_code == 200
    for header_item in header_items:
        assert header_item in response.data
    for recipe_type in recipe_types:
        assert recipe_type in response.data


def test_get_breakfast_recipes(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/breakfast/' page is requested (GET)
    THEN check the response is valid
    """
    recipes = [b'Pancakes', b'Honey Bran Muffins', b'Acai Bowl',
               b'Breakfast Scramble', b'Pumpkin Donuts', b'Waffles',
               b'Omelette']
    response = test_client.get('/breakfast/')
    assert response.status_code == 200
    for recipe in recipes:
        assert recipe in response.data


def test_get_individual_breakfast_recipes(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/breakfast/<recipe_name>' page is requested (GET)
    THEN check the response is valid
    """
    for recipe_name in breakfast_recipes_names:
        response = test_client.get(f'/breakfast/{recipe_name}/')
        assert response.status_code == 200
        assert str.encode(recipe_name) in response.data


def test_get_invalid_individual_recipes(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/<recipe_type>>/<recipe_name>' page is requested (GET) with invalid recipe names
    THEN check that 404 errors are returned
    """
    invalid_recipe_names = ['acai_bowls', 'french_toast', 'breakfast_burrito', 'abcd']
    for recipe_name in invalid_recipe_names:
        response = test_client.get(f'/breakfast/{recipe_name}/')
        assert response.status_code == 404
        response = test_client.get(f'/dinner/{recipe_name}/')
        assert response.status_code == 404
        response = test_client.get(f'/baked_goods/{recipe_name}/')
        assert response.status_code == 404
        response = test_client.get(f'/side_dishes/{recipe_name}/')
        assert response.status_code == 404
        response = test_client.get(f'/dessert/{recipe_name}/')
        assert response.status_code == 404
        response = test_client.get(f'/drink/{recipe_name}/')
        assert response.status_code == 404


def test_get_dinner_recipes(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/dinner/' page is requested (GET)
    THEN check the response is valid
    """
    recipes = [b'Steak Fajitas', b'Ground Beef Tacos', b'Pizza', b'Sweet Fire Chicken', b'Tri-Tip']
    response = test_client.get('/dinner/')
    assert response.status_code == 200
    for recipe in recipes:
        assert recipe in response.data


def test_get_individual_dinner_recipes(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/dinner/<recipe_name>' page is requested (GET)
    THEN check the response is valid
    """
    for recipe_name in dinner_recipes_names:
        response = test_client.get(f'/dinner/{recipe_name}/')
        assert response.status_code == 200
        assert str.encode(recipe_name) in response.data


def test_get_baked_goods_recipes(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/baked_goods/' page is requested (GET)
    THEN check the response is valid
    """
    recipes = [b'Bagels', b'French Bread', b'Pitas', b'Irish Soda Bread', b'Soft Rolls', b'Pizza Dough']
    response = test_client.get('/baked_goods/')
    assert response.status_code == 200
    for recipe in recipes:
        assert recipe in response.data


def test_get_individual_baked_goods_recipes(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/baked_goods/<recipe_name>' page is requested (GET)
    THEN check the response is valid
    """
    for recipe_name in baked_goods_recipes_names:
        response = test_client.get(f'/baked_goods/{recipe_name}/')
        assert response.status_code == 200
        assert str.encode(recipe_name) in response.data


def test_get_side_dishes_recipes(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/side_dishes/' page is requested (GET)
    THEN check the response is valid
    """
    recipes = [b'Sweet Potatoes', b'Spanish Rice', b'Jasmine Rice']
    response = test_client.get('/side_dishes/')
    assert response.status_code == 200
    for recipe in recipes:
        assert recipe in response.data


def test_get_individual_side_dishes_recipes(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/side_dishes/<recipe_name>' page is requested (GET)
    THEN check the response is valid
    """
    for recipe_name in side_dishes_recipes_names:
        response = test_client.get(f'/side_dishes/{recipe_name}/')
        assert response.status_code == 200
        assert str.encode(recipe_name) in response.data


def test_get_dessert_recipes(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/dessert/' page is requested (GET)
    THEN check the response is valid
    """
    recipes = [b'Brownies', b'Chocolate Chip Cookies', b'Linzer Cookies', b'Sugar Cookies']
    response = test_client.get('/dessert/')
    assert response.status_code == 200
    for recipe in recipes:
        assert recipe in response.data


def test_get_individual_dessert_recipes(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/dessert/<recipe_name>' page is requested (GET)
    THEN check the response is valid
    """
    for recipe_name in dessert_recipes_names:
        response = test_client.get(f'/dessert/{recipe_name}/')
        assert response.status_code == 200
        assert str.encode(recipe_name) in response.data


def test_get_drink_recipes(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/drink/' page is requested (GET)
    THEN check the response is valid
    """
    recipes = [b'Berry Smoothie', b'Chocolate Milk Shake', b'Apple Cider Vinegar Drink']
    response = test_client.get('/drink/')
    assert response.status_code == 200
    for recipe in recipes:
        assert recipe in response.data


def test_get_individual_drink_recipes(test_client):
    """
    GIVEN a Flask application configured for testing
    WHEN the '/drink/<recipe_name>' page is requested (GET)
    THEN check the response is valid
    """
    for recipe_name in drink_recipes_names:
        response = test_client.get(f'/drink/{recipe_name}/')
        assert response.status_code == 200
        assert str.encode(recipe_name) in response.data
