import json
from flask import render_template

from app import app, flatpages


POST_DIR = 'posts'
PORT_DIR = 'portfolio'

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
