import flask
import json
from flask import Flask, render_template, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    # Unused currently
    # num_col = 6
    # num_row = 10
    return render_template('home.html')

# TODO: Refactor handle_data() and abstract data name parameter.
#  EX: @app.route("/static<name>.json", methods=['GET', 'POST'])


@app.route("/static/data/orm_data.json", methods=['GET', 'POST'])
def handle_data():
    if request.method == 'GET':
        print("GET from get_data")
        file = open('static/data/orm_data.json', 'rb')
        response = flask.make_response(app.response_class(response=file, status=200, content_type='application/json'))
        return response
    if request.method == 'POST':
        print("POST from get_data")
        data = request.json
        file = open('static/data/orm_data.json', 'w')
        tmp = json.dumps(data, sort_keys=False, indent=4)
        file.write(tmp)
        file.close()
        return flask.make_response(app.response_class(status=200))
    else:
        print('POST ERROR 405 Method Not Allowed')


@app.route("/edit-table")
def edit_table():
    return render_template('edit/edit_orm.html')


@app.route("/edit-tracker")
def edit_tracker():
    return render_template('edit/edit_tracker.html')


@app.route("/table")
def table():
    return render_template('table/orm_table.html')


@app.route("/tracker")
def tracker():
    return render_template('table/tracker_table.html')


if __name__ == "__main__":
    app.directory='./'
    app.run(host='127.0.0.1', port=5000)