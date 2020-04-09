import React from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

class Map extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        // fill in 
      }

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 47.444, lng: -122.176}}
            />

            // TODO: ADD MARKERS HERE
            // <Marker position={{ lat: {something}}, lng: {something}}}} />
            <Marker position={{ lat: 48.00, lng: -122.00}} />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDTvvfOhXAjcQPSzGd0xYJfx4AwwZZxs4U'
  })(Map);

const mapStyles = {
    width: '100%',
    height: '100%',
};