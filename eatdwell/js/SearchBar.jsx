import React from 'react';
import PropTypes from 'prop-types';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.props.onChange(this.textInput.value);
  }

  render() {
    const { defaultText } = this.props;
    return (
      <div className="text-center">
        <form onSubmit={this.handleChange}>
          <input type="text" className="form-control" placeholder={defaultText} ref={(input) => this.textInput = input} />
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  defaultText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
