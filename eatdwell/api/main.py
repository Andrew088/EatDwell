"""
eatdwell REST API for random words.

/api/v1/random/

"""
import random

import flask
import eatdwell

RANDOM_WORDS = ["whoa", "tacos", "nice", "sliver", "manifest", "colloquial",
                "inheritance", "silly", "niche"]

RANDOM_MESSAGES = ["Hello world!", "Good afternoon!", "Hi there!", "What's up?"]


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
