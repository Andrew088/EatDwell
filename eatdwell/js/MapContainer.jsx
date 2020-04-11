import React from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';


// ref: https://blog.vanila.io/writing-a-google-maps-react-component-fae411588a91

class MapContainer extends React.Component {
    constructor(props) {
      super(props);

      this.state= {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
      };

    

    }

    // NOTE: buggy. idk how to make it work in one function.
    // onMarkerClick(){
    //     console.log("clicked");
    //     this.setState({
    //         selectedPlace: props,
    //         activeMarker: marker,
    //         showingInfoWindow: true
    //     });
    // }

    renderChildren(){
        return (
            
                // create markers automatically somehow... this is just a dummy marker var for reference
                <Marker
                    name={'Location Name'}
                    position={{lat: 42.291325, lng: -83.717495}}
                    icon={{
                        url: "/static/img/eatdwell.png",
                        anchor: new google.maps.Point(20,15),
                        scaledSize: new google.maps.Size(60,60)
                    }} 
                    

                    // note: tried to make it into one function but it didn't work so pls help condense
                    onClick={(props, marker, e) => {console.log("clicked");
                    this.setState({
                        selectedPlace: props,
                        activeMarker: marker,
                        showingInfoWindow: true
                    });}}
                       
                /> //end of marker

                // <InfoWindow
                //     // create a popup infoWindow when clicking marker (just an example)
                //     onOpen={this.windowHasOpened} // use to keep track of window states
                //     onClose={this.windowHasClosed} 
                //     visible={this.state.showingInfoWindow}
                //     marker={this.state.activeMarker}>

                //     <div>
                //     <h1>{this.state.selectedPlace.name}</h1>
                //     </div>
                // </InfoWindow>

            

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

                <InfoWindow
                // create a popup infoWindow when clicking marker (just an example)
                    onOpen={this.windowHasOpened} // use to keep track of window states
                    onClose={this.windowHasClosed} 
                    visible={this.state.showingInfoWindow}
                    marker={this.state.activeMarker} //only get's one at a time
                    //content="<img className='info' src='/static/img/eatdwell.png'></img>"
                >
                    
                    <div id="infoWindow"> 
                        <div>{this.state.selectedPlace.name}</div>
                        <div><img className='info' src='static/img/test.png'></img></div>
                    
                    </div>
                    
                </InfoWindow>
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