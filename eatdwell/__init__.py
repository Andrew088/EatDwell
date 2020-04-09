"""
eatdwell package init.
"""
import flask

app = flask.Flask(__name__)

app.config.from_object('eatdwell.config')

import eatdwell.api # noqa: E402 pylint: disable=wrong-import-position
import eatdwell.views # noqa: E402 pylint: disable=wrong-import-position
