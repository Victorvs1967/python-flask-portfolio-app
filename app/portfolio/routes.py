from flask import render_template
from flask_flatpages import pygments_style_defs

from app import app, flatpages


PORT_DIR = 'portfolio'

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
  return pygments_style_defs('material'), 200, {'Content-Type': 'text/css'}

@app.errorhandler(404)
def page_not_found(e):
  return render_template('404.html'), 404