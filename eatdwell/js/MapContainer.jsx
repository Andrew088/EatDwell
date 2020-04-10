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
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 47.444, lng: -122.176}}
            >
                <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'SOMA'}
                    position={{ lat: 48.00, lng: -122.00}} />

            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
    //apiKey: 'AIzaSyDTvvfOhXAjcQPSzGd0xYJfx4AwwZZxs4U'
  })(MapContainer);

const mapStyles = {
    width: '100%',
    height: '100%',
};