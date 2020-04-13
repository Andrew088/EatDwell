import React from 'react';
import PropTypes from 'prop-types';
import {
  Map,
  Marker,
  GoogleApiWrapper,
} from 'google-maps-react';
import EventPage from './EventPage';
import InfoWindowEx from './InfoWindowEx';


// ref: https://blog.vanila.io/writing-a-google-maps-react-component-fae411588a91

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      selectedPlace: {},
      currentLoc: [0, 0],
      markers: [],
      activeMarker: {},
    };
    this.getCurrentLoc = this.getCurrentLoc.bind(this);
    this.getCurrentLoc();
    this.getLoc = this.getLoc.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.events !== this.props.events) {
      this.renderChildren();
    }
  }

  onInfoWindowClose() {
    document.getElementById(this.state.marker.eventId).classList.add("display-block");
    document.getElementById(this.state.marker.eventId).classList.remove("display-none");
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }

  onMapClick() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }

  onMarkerClick(props, marker, e) {
    console.log(props.position);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      currentLoc: [],
    });
    //TODO: set smooth animation AND keep the center at the new location
    //current loc: [] does expected behavior but causes issues internally
    //
  }

  getCurrentLoc() {
    const { zipcode } = this.props;
    const geocoder = new google.maps.Geocoder();
    let latitude;
    let longitude;
    geocoder.geocode({ address: `zipcode ${zipcode}` }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        latitude = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();
        console.log("current loc Latitude: " + latitude + "\nLongitude: " + longitude);
        const marker = (
          <Marker
            name="Current Location"
            eventId={0}
            position={{ lat: latitude, lng: longitude }}
            icon={{
              url: "/static/img/eatdwell.png",
              anchor: new google.maps.Point(20, 15),
              scaledSize: new google.maps.Size(60, 60),
            }}
            onClick={this.onMarkerClick}
          />
        );
        this.setState((prevState) => ({
          currentLoc: [latitude, longitude],
          markers: [...prevState.markers, marker],
        }));
      } else {
        console.log("Request failed.");
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getLoc(addr) {
    const geocoder = new google.maps.Geocoder();
    let latitude;
    let longitude;
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: addr }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          latitude = results[0].geometry.location.lat();
          longitude = results[0].geometry.location.lng();
          console.log("Latitude: " + latitude + "\nLongitude: " + longitude);
        } else {
          console.log("Request failed.");
          reject();
        }
        resolve([latitude, longitude]);
      });
    });
  }

  showDetails(eventId) {
    document.getElementById(eventId).classList.add("display-block");
    document.getElementById(eventId).classList.remove("display-none");
  }

  renderChildren() {
    const { events } = this.props;
    const promises = events.map((event) => {
      return this.getLoc(event.location).then((pos) => {
        return (
          <Marker
            name={event.eventName}
            eventId={event.eventId}
            position={{ lat: pos[0], lng: pos[1] }}
            icon={{
              url: "/static/img/test.png",
              anchor: new google.maps.Point(20, 15),
              scaledSize: new google.maps.Size(30, 40),
            }}
            onClick={this.onMarkerClick}
          />
        );
      });
    });
    Promise.all(promises).then((children) => {
      this.setState((prevState) => ({
        markers: [...prevState.markers, children],
      }));
    });
  }

  render() {
    const { currentLoc } = this.state;
    console.log("render current loc: ", currentLoc);
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          center={{ lat: currentLoc[0], lng: currentLoc[1] }}
          onClick={this.onMapClick}
        >
          { this.state.markers }
          {/* <InfoWindowWrapper
            // create a popup infoWindow when clicking marker (just an example)
            onOpen={this.windowHasOpened} // use to keep track of window states
            onClose={this.onInfoWindowClose}
            visible={this.state.showingInfoWindow}
            marker={this.state.activeMarker} //only get's one at a time
          >
            <div>
              <h3>{this.state.selectedPlace.name}</h3>
              <button
                type="button"
                onClick={this.showDetails.bind(this, this.state.selectedPlace)}
              >
                Show details
              </button>
            </div>
          </InfoWindowWrapper> */}
          <InfoWindowEx
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onOpen={this.windowHasOpened} // use to keep track of window states
            onClose={this.onInfoWindowClose}
          >
            <div>
              <h3>{this.state.selectedPlace.name}</h3>
              <button
                type="button"
                onClick={this.showDetails.bind(this, this.state.selectedPlace.eventId)}
              >
                Show details
              </button>
            </div>
          </InfoWindowEx>
        </Map>
      </div>
    );
  }
}

MapContainer.propTypes = {
  zipcode: PropTypes.number.isRequired,
  events: PropTypes.array.isRequired,
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBdLt7rmCK0goo7tveQjeP_72aa2RY7Gx4',
})(MapContainer);

const mapStyles = {
  width: '95%',
  height: '95%',
};
