import React from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';


// ref: https://blog.vanila.io/writing-a-google-maps-react-component-fae411588a91

class MapContainer extends React.Component {
    constructor(props) {
      super(props);

    }

    renderChildren(){
        return (

            // create markers automatically somehow... this is just a dummy marker var for reference
            <Marker
                name={'Your position'}
                position={{lat: 42.291325, lng: -83.717495}}
                icon={{
                    url: "/static/img/snowflake.png",
                    anchor: new google.maps.Point(32,32),
                    scaledSize: new google.maps.Size(64,64)
                }} />
        );
    }

   
    render() {
        return (
            < Map
              
                google={this.props.google}
                zoom={17}
                style={mapStyles}
                initialCenter={{ lat: 42.291325, lng: -83.717495}} //pierpont
            >
                {this.renderChildren()}

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