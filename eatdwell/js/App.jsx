import React from 'react';
import SearchBar from './SearchBar';
import MainPage from './MainPage';
import logo from '../img/eatdwell.png';

// const logo = require('../img/eatdwell.png');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      zipcode: 0,
    };
    this.handleZipcodeChange = this.handleZipcodeChange.bind(this);
  }

  handleZipcodeChange(zipcode) {
    this.setState({ zipcode });
  }

  render() {
    const { zipcode } = this.state;
    let render;
    if (zipcode !== 0) {
      render = <MainPage zipcode={zipcode}/>;
    } else {
      render = (
        <div className="container">
          <SearchBar defaultText="Enter zipode here..." onChange={this.handleZipcodeChange} />
        </div>
      );
    }
    return (
      <div>
        { render }
      </div>
    );
  }
}

export default App;
