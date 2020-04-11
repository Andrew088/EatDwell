import React from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends React.Component {
    constructor(props) {
      super(props);

    }

    handleChange(e) {
        e.preventDefault();
        // fill in 
      }

   
    render() {
        return (
            < Map
              
                google={this.props.google}
                zoom={16}
                style={mapStyles}
                initialCenter={{ lat: 42.291325, lng: -83.717495}} //pierpont
            >
                {/* <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'SOMA'}
                    position={{ lat: 48.00, lng: -122.00}} /> */}

            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBdLt7rmCK0goo7tveQjeP_72aa2RY7Gx4'
  })(MapContainer);

const mapStyles = {
    width: '95%',
    height: '95%',
};