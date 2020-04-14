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
    if ((zipcode === "") || (zipcode.length < 5)) {
      alert("Please enter a valid zipcode");
    }
    else {
      this.setState({ zipcode });
    }
  }

  render() {
    const { zipcode } = this.state;
    let render;
    
    if (zipcode !== 0) {
      render = (
        <div id="bar">
          <MainPage zipcode={parseInt(zipcode, 10)} />;
        </div>
      )
    } else {
      render = (
        
        <div id="bar">
          <SearchBar defaultText="Enter zipode here..." onChange={this.handleZipcodeChange} />
        </div>
      );
    }
    return (
      
      <div id="app">
        
        { render }
      </div>
    );
  }
}

export default App;
