"""
eatdwell index (main) view.

URLs include:
/

"""
import flask
import eatdwell


@eatdwell.app.route('/', methods=["GET"])
def show_index():
    """Display / route."""
    return flask.render_template("index.html")
