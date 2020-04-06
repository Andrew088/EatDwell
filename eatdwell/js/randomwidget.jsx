import React from 'react';
import PropTypes from 'prop-types';


class RandomWidget extends React.Component {
  /*
  Display a list of random words and a button to generate new random words.
  */

  constructor(props) {
    // Initialize immutable properties and mutable state
    super(props);
    // TODO 1: initialize component state

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // TODO 2: Call REST API to get a random word and update state
    // check out:
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  }

  handleClick(e) {
    // TODO 4: Handle 'add word' button.  Retrieve and add word to our state.
    // useful link:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
    e.preventDefault(); // Prevent button form submitting form
  }

  render() {
    // TODO 3: Render a button and a word list from the state
    // check out:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    // https://reactjs.org/docs/lists-and-keys
    return (
      <p>IMPLEMENT ME</p>
    );
  }
}

RandomWidget.propTypes = {
  url: PropTypes.string.isRequired,
};

export default RandomWidget;
