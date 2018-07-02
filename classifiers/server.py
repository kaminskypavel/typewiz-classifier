#!flask/bin/python
from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/data')
def data():
    return request.query_string

if __name__ == '__main__':
    app.run(debug=True)
