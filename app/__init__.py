import json
from flask import Flask, render_template
from flask_flatpages import FlatPages, pygments_style_defs
from flask_frozen import Freezer


DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'
FLATPAGES_ROOT = 'content'
POST_DIR = 'posts'
PORT_DIR = 'portfolio'

app = Flask(__name__)
flatpages = FlatPages(app)
freezer = Freezer(app)
app.config.from_object(__name__)

@app.route('/')
def index():
  posts = [p for p in flatpages if p.path.startswith(POST_DIR)]
  posts.sort(key=lambda item: item['date'], reverse=True)
  cards = [p for p in flatpages if p.path.startswith(PORT_DIR)]
  cards.sort(key=lambda item: item['title'])
  with open('./settings.json', encoding='utf8') as config:
    data = config.read()
    settings = json.loads(data)

  tags = set()
  for p in flatpages:
    t = p.meta.get('tag')
    if t:
      tags.add(t.lower())

  vars = {
    'posts': posts,
    'cards': cards,
    'tags': tags,
    'bigheader': True,
  }
  return render_template('index.html', **vars, **settings)

@app.route('/posts/<name>/')
def post(name):
  path = f'{POST_DIR}/{name}'
  post = flatpages.get_or_404(path)
  vars = {
    'title': f'Post: {name}',
    'post': post,
  }
  return render_template('post.html', **vars)

@app.route('/portfolio/<name>/')
def card(name):
  path = f'{PORT_DIR}/{name}'
  card = flatpages.get_or_404(path)
  vars = {
    'title': 'Portfolio',
    'card': card
  }
  return render_template('card.html', **vars)

@app.route('/pygments.css')
def pygments_css():
  return pygments_style_defs('monokai'), 200, {'Content-Type': 'text/css'}

@app.errorhandler(404)
def page_not_found(e):
  return render_template('404.html'), 404