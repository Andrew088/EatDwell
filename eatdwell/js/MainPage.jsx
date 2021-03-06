import React from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper } from 'google-maps-react';
import SearchBar from './SearchBar';
import EventList from './EventList';
import EventPage from './EventPage';
import MapContainer from "./MapContainer";
import DatePicker from 'react-date-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import logo from '../img/eatdwell.png';
// import './style.css';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      saved: [],
      events: [],
      booked: [],
      // eslint-disable-next-line react/no-unused-state
      query: '',
      // eslint-disable-next-line react/no-unused-state
      sortBy: '',
      date: new Date(),
    };
    this.fetchEvents = this.fetchEvents.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.bookmark = this.bookmark.bind(this);
    this.unbookmark = this.unbookmark.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.fetchEvents();
  }

  onChange(date) {
    this.setState({ date });
    console.log(date);
    let formatted_date = date.toString().split(" ").slice(1, 4);
    console.log(formatted_date);
    formatted_date[0] = this.convert_to_num(formatted_date[0]);
    let formatted_date_str = formatted_date.join('')
    console.log(formatted_date_str);

    const url = `/api/v1/${this.props.zipcode}?date=${formatted_date_str}`;
    fetch(url, { method: 'GET' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        data.data.forEach((event) => { event.bookmark = false; }, data.data);
        this.handleFetchReq(this.state.query, data.data);
      })
      .catch((error) => console.log(error));
  }

  handleQuery(query) {
    this.handleFetchReq(query, this.state.saved);
  }

  fetchEvents() {
    const { zipcode } = this.props;
    console.log(zipcode);
    const url = `/api/v1/${zipcode}`;
    fetch(url, { method: 'GET' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        data.data.forEach((event) => { event.bookmark = false; }, data.data);
        this.setState({ saved: data.data, events: data.data });
      })
      .catch((error) => console.log(error));
  }


  handleFetchReq(query, curData) {
    if (query) {
      const matches = [];
      for (let i = 0; i < curData.length; i += 1) {
        for (let j = 0; j < curData[i].foodType.length; j+= 1) {
          if (query.toLowerCase() === curData[i].foodType[j].toLowerCase()) {
            matches.push(curData[i]);
          }
        }
      }

      if (matches.length == 0){
        alert(":( No events serving "+query);
      }
      console.log(matches);
      this.setState({saved: curData, events: matches, query});
    }
    else {
      this.setState({saved: curData, events: curData, query: ''});
    }
  }

  unbookmark(id) {
    console.log("unbookmark main page")
    const { booked } = this.state;
    let found = false;
    let i = 0;
    for (; i < booked.length; ++i) {
      if (booked[i].eventId === id) {
        found = true;
        break;
      }
    }
    if (found) {
      console.log(booked);
      booked.splice(i);
      this.setState({ booked });
      console.log(booked);
      const { events } = this.state;
      for (let j = 0; j < events.length; ++j) {
        if (events[j].eventId === id) {
          events[j].bookmark = false;
          this.setState({
            events,
          });
        }
      }
    }
  }

  bookmark(id) {
    console.log(id);
    const { booked } = this.state;
    let found = false;
    for (let i = 0; i < booked.length; ++i) {
      if (booked[i].eventId === id) {
        found = true;
        break;
      }
    }
    if (!found) {
      const { events } = this.state;
      for (let j = 0; j < events.length; ++j) {
        if (events[j].eventId === id) {
          events[j].bookmark = true;
          this.setState({
            booked: [...booked, events[j]],
          });
        }
      }
    }
  }

  convert_to_num(month) {
    let dateHash = {
      Jan : "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12"
    };
    return dateHash[month];
  }

  

  render() {
    console.log("hello friends");
    console.log(this.state.events);
    const { zipcode } = this.props;
    const { booked, events } = this.state;
    return (
      <div className="container">
        <div id = "bar" className="white-text">
          <h6 onClick={this.props.goBack}>Switch zipcodes</h6>
          <div className="text-center">
            <SearchBar defaultText="Search specific food / drinks..." onChange={this.handleQuery} />
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <MapContainer zipcode={parseInt(zipcode, 10)} events={events} />
          </div>
          <div className="col-4">
            <div value={this.props}>
              <EventList
                listType="bookmarked"
                events={booked}
                bookmark={this.bookmark}
                zipcode={zipcode.toString()}
                unbookmark={this.unbookmark}
              />
              <DatePicker className="datepicker" showLeadingZeros={true} onChange={this.onChange} value={this.state.date}/>
              <EventList
                listType="events"
                events={events}
                bookmark={this.bookmark}
                zipcode={zipcode.toString()}
                unbookmark={this.unbookmark}
              />
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}

MainPage.propTypes = {
  zipcode: PropTypes.number.isRequired,
  goBack: PropTypes.func.isRequired,
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyART3iUaVq62aWfOfBKKc3Jup2fjTUDqB8',
})(MainPage);
