"""
eatdwell package init.

Maxwell Morgan <mjmor@umich.edu>
"""
import flask

app = flask.Flask(__name__)

import eatdwell.api # noqa: E402 pylint: disable=wrong-import-position
import eatdwell.views # noqa: E402 pylint: disable=wrong-import-position
