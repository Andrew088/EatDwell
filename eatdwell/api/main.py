"""
eatdwell REST API for random words.

/api/v1/random/

"""
import random
import os
import sys
import json
from json import JSONDecodeError
import flask
import eatdwell
import datetime

RANDOM_WORDS = ["whoa", "tacos", "nice", "sliver", "manifest", "colloquial",
                "inheritance", "silly", "niche"]

RANDOM_MESSAGES = ["Hello world!", "Good afternoon!", "Hi there!", "What's up?"]

KEY_WORDS = ["tickets", "venmo", "fee", "fundraiser", "money", "dollar", "ticket", "pay", "price", "pricing", "sell", "selling", "pay", "paymemt", "donate"]

@eatdwell.app.route('/api/v1/random/', methods=["GET"])
def get_random():
    """Return a random word from a list of words."""
    data = {}
    random_idx = random.randint(0, len(RANDOM_WORDS) - 1)
    data["random_word"] = RANDOM_WORDS[random_idx]
    return flask.jsonify(**data)

@eatdwell.app.route('/api/v1/message/', methods=["GET"])
def get_message():
    """Return a random word from a list of words."""
    data = {}
    random_idx = random.randint(0, len(RANDOM_MESSAGES) - 1)
    data["random_message"] = RANDOM_MESSAGES[random_idx]
    return flask.jsonify(**data)

@eatdwell.app.route('/uploads/<img_url>')
def show_image(img_url):
    """Return the image."""
    print("reaches here!")
    return flask.send_from_directory(
        eatdwell.app.config['UPLOAD_FOLDER'], img_url, as_attachment=True)


@eatdwell.app.route('/api/v1/<int:zipcode>', methods=["GET"])
def get_event(zipcode):
    """return a list of events at that location"""
    today = datetime.date.today()
    today = today.strftime("%m%d%Y")
    date_of_event = flask.request.args.get('date', default=today)
    freeEvents = { "data": [] }
    #/mnt/c/Users/mimiz/Documents/EECS493/EatDwell/data.json
    print(os.path.exists('data/data.json'))
    try:
        with open('data/data.json', 'r') as json_file:
            print("entered here")
            try:
                data = json.load(json_file)
            except JSONDecodeError:
                print("nani")
    except ValueError:
        print('Error_JSON: failed to parse data.json')
        exit(1)
    except FileNotFoundError:
        print('Error_FileNotFound: cannot find data.json')
        exit(1)
    for i in data["data"]:
        if zipcode == i["zipcode"]:
            formatted_date = i["date"].split("/")
            if date_of_event == "".join(formatted_date):
                """look into description"""
                freeFood = True
                split_desc = i["description"].split()
                for j in KEY_WORDS:
                    if j in split_desc:
                        freeFood = False
                        break
                if freeFood:
                    freeEvents["data"].append(i)
    return flask.jsonify(**freeEvents)
