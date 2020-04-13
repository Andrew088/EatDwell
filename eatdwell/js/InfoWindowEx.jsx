import React, { Component } from "react";
import ReactDOM from "react-dom";
import { InfoWindow } from "google-maps-react";

export default class InfoWindowEx extends Component {
  constructor(props) {
    super(props);
    this.infoWindowRef = React.createRef();
    this.contentElement = document.createElement(`div`);
  }

  componentDidUpdate(prevProps) {
    if (this.props.children !== prevProps.children) {
      ReactDOM.render(
        React.Children.only(this.props.children),
        this.contentElement
      );
      this.infoWindowRef.current.infowindow.setContent(this.contentElement);
    }
  }

  render() {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <InfoWindow ref={this.infoWindowRef} {...this.props} />;
  }
}