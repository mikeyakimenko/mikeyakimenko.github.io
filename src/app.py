#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys

from flask import Flask, render_template, request
from urllib.parse import urljoin
from flask_frozen import Freezer

# config
DEBUG = False
TEMPLATES_AUTO_RELOAD = True

BASE_URL = 'https://mikeyakimenko.github.io/'
FREEZER_BASE_URL = 'https://mikeyakimenko.github.io/'
FREEZER_DESTINATION = '../'
FREEZER_RELATIVE_URLS = False
FREEZER_REMOVE_EXTRA_FILES = False

# app
app = Flask(__name__)
app.config.from_object(__name__)
freezer = Freezer(app)

# views
@app.route('/')
def index():
    return render_template('index.html')


# @app.route('/404.html')
# def error404():
#     return render_template('404.html')


# @app.errorhandler(404)
# def page_not_found(error):
#     return render_template('404.html'), 404


# freezer
def make_external(url):
    return urljoin(request.url_root, url)


if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == "build":
        freezer.freeze()
    else:
        app.run(port=8000, debug=True)
