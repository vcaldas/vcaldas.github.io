import os

from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, ".env"))


class Config(object):
    email = "caldas.victor@gmail.com"
    twiter = "vcalds"
    github = "vcaldas"
    vimeo = "https://vimeo.com/vcaldas"
    px500 = "https://500px.com/victorcaldas"
    linkedin = "https://www.linkedin.com/in/vcaldas/"
    github_username = "vcaldas"
    DEBUG = True
    FLATPAGES_AUTO_RELOAD = DEBUG
    FLATPAGES_EXTENSION = ".md"
    FREEZER_DESTINATION = "../docs"
    # FREEZER_RELATIVE_URLS = "/website/"
