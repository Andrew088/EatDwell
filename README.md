# eecs485-discussion5-demo

A hands on demo for EECS 485 Discussion 5.

Contents:
1. [Objective](#objective)
2. [Setup](#setup)
3. [Overview](#overview)

## Objective

Create a react widget that generates random words. The widget should display a
list of words along with a button that adds a new word to the list.

## Setup

### React Dev Tools
It will be wildly useful to install React dev tools before continuing on
with this demo. You can find React dev tools in the chrome web store
[here](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
or in the firefox web store
[here](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

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
```

If you get an error similar to "No python virtualenv is available" you may have to reactivate with `source env/bin/activate`

```
$ source env/bin/activate  # again, after installing node
$ pip install -e .
$ npm install .
```

## Overview

### `eatdwell`
We provide a Flask app named `eatdwell`. The `eatdwell` app can be started
with the provided executable `./bin/eatdwellrun`.

`eatdwell` has two routes: `/api/v1/random/` and `/`. The `/api/v1/random/`
route is an API used to retrieve random words and `/` will be where your react
widget will be placed.

#### Random API (`/api/v1/random/`)

An API is provided to you that will generate random words. You can test this
API by querying the API with httpie.

Start the app in one terminal:
```shellsession
$ cd $DEMO_ROOT
$ ./bin/eatdwellrun
```

In another terminal query the API with `httpie`:
```shellsession
$ http "http://localhost:8000/api/v1/random/"
```

#### Random Widget (`/`) and React

The random widget will be placed on the main page at route `/`. We've already
coded the route for the main page as well as the template used. See
`eatdwell/views/index.py` and `eatdwell/templates/index.html` for more
details.

Your job will be to complete the implementation of the random widget started
in `eatdwell/js/randomwidget.jsx`. There are comments in the file with hints
regarding which order to implement. These comments also give hints about what
each function should accomplish.

It's also worth studying how `eatdwell/templates/index.html`,
`eatdwell/js/main.jsx`, `eatdwell/js/randomwidget.jsx` interact with one
another. Note that `eatdwell/templates/index.html` references
`eatdwell/static/js/bundle.js` which is the compiled form of the react
components in `eatdwell/js/`.

#### Component Heirarchy

Now we will take this a step further to demonstrate how a page can be comprised of multiple components.  
On our main page, we want to display "random pannel."  A random pannel consists of a displayed random message, which you can get from `/api/v1/message/`, and 2 random widgets.  The random pannel should be a new component, which you'll implement in `randomsite/js/randompannel.jsx`.  You'll
want to modify `eatdwell/js/main.jsx` to render the random pannel component, instead of the random widget.
**You shouldn't have to modify your code in `eatdwell/js/randomwidget.jsx`**

### Acknowledgments
Original demo written by Maxwell Morgan.
maintained by EECS 485 Staff.
