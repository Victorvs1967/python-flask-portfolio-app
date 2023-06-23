from flask import Flask
from flask_frozen import Freezer
from flask_flatpages import FlatPages


DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'
FLATPAGES_ROOT = 'content'


app = Flask(__name__)
app.config.from_object(__name__)

freezer = Freezer(app)
flatpages = FlatPages(app)


from . import posts
from . import portfolio