## Overview

You'll need to create a new python virtual
environment and a node environment as well as install the proper python and
node packages. We've included a `setup.py` and `package.json` for you in this
repository. Thus you can create the environments and install the packages with
the following commands:
```shellsession
$ cd $DEMO_ROOT
$ python3 -m venv env
$ source env/bin/activate
$ pip install nodeenv
$ nodeenv --python-virtualenv
$ source env/bin/activate  # again, after installing node
$ pip install -e .
$ npm install .
```

If you get an error similar to "No python virtualenv is available" you may have to reactivate with `source env/bin/activate`



### `eatdwell`
We provide a Flask app named `eatdwell`. The `eatdwell` app can be started
with the provided executable `./bin/dwellrun`. To run, just call and navigate to http://localhost:8000:

```
$ ./bin/dwellrun
```

You might need to install these extra dependencies:
```
$ npm install --save react-snowstorm react-date-picker
$ npm install --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
$ npm install --save google-map-react 
```
