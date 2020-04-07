import React from 'react';
// import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import EventList from './EventList';
import Dropdown from './Dropdown';
import './style.css';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      saved: [],
      // eslint-disable-next-line react/no-unused-state
      query: '',
    };
    this.handleQuery = this.handleQuery.bind(this);
  }

  handleQuery(query) {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ query });
  }

  render() {
    return (
      <div className="text-center">
        <h1>Main Page (logo goes here)</h1>
        <SearchBar defaultText="Search specific food / drinks..." onChange={this.handleQuery} />
        <EventList />
        <EventList />
        <Dropdown />
      </div>
    );
  }
}

MainPage.propTypes = {
};

export default MainPage;
