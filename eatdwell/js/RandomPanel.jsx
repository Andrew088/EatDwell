import React from 'react';
import ReactDOM from 'react-dom';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userIn : "",
        };
    }
    handleKeyPress(event){
        query=event.target.value;

    }

    //--------
    /*function initMap() {
      var myLatLng = {lat: -25.363, lng: 131.044};
    
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatLng
      });
    
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
      });
    }*/
    //--------
    
    render() {
		return (
			<div>
                <form >
				    <input type="text" id="searchBar" className="input" onKeyPress={this.handleKeyPress} placeholder="Search..." />
                </form>
			</div>
		)
	}
}

class Eddy extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.hello)
    }
}