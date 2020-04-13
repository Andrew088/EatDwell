import React from 'react';
import PropTypes from 'prop-types';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.node && !this.node.contains(event.target)) {
      this.setState({
        open: false,
      });
    }
  }

  handleButtonClick() {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  }

  handleSubmit(item_title) {
    this.props.toggle(item_title);
  }

  render() {
    const { open } = this.state;
    const { res } = this.props;
    const list = res.map((option) => <li key={option.title} onClick={() => this.handleSubmit(option.title)} 
                                      className={`filter-item selected-${option.selected}`}>{option.title}</li>);
    const fullList = (
      <ul className="list-group dropdown-list">
        {list}
      </ul>
    );
    return (
      // eslint-disable-next-line no-return-assign
      <div ref={(node) => (this.node = node)}>
        <button type="button" className="btn btn-outline-primary btn-sm" onClick={this.handleButtonClick}>
          {this.props.title}
        </button>
        {open && fullList}
      </div>
    );
  }
}

Dropdown.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  res: PropTypes.array.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Dropdown;
