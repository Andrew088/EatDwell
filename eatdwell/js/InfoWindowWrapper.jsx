import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { InfoWindow } from 'google-maps-react';

export default class InfoWindowWrapper extends React.component {
  constructor(props) {
    super(props);
    this.openWindow = this.openWindow.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.renderChildren = this.renderChildren.bind(this);
    this.renderInfoWindow = this.renderInfoWindow.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.infoWindowRef = React.createRef();
    this.contentElement = document.createElement(`div`);
  }

  componentDidUpdate(prevProps) {
    if (this.props.map !== prevProps.map) {
      this.renderInfoWindow();
    }

    if (this.props.children !== prevProps.children) {
      this.updateContent();
      // ReactDOM.render(
      //   React.Children.only(this.props.children),
      //   this.contentElement
      // );
      // this.infoWindowRef.current.infowindow.setContent(this.contentElement);
    }

    if ((this.props.visible !== prevProps.visible)
        || (this.props.marker !== prevProps.marker)) {
      // eslint-disable-next-line no-unused-expressions
      this.props.visible ? this.openWindow() : this.closeWindow();
    }
  }

  openWindow() {
    this.infowindow
      .open(this.props.map, this.props.marker);
  }

  closeWindow() {
    this.infowindow.close();
  }

  updateContent() {
    const content = this.renderChildren();
    this.infowindow.setContent(content);
  }

  renderChildren() {
    const {children} = this.props;
    return ReactDOMServer.renderToString(children);
  }

  renderInfoWindow() {
    let {map, google, mapCenter} = this.props;
    this.infowindow = new google.maps.InfoWindow({content: '<h1>pls work</h1>'});
    const iw = this.infowindow;

    google.maps.event
      .addListener(iw, 'closeclick', this.onClose.bind(this));
    google.maps.event
      .addListener(iw, 'domready', this.onOpen.bind(this));
  }

  onOpen() {
    if (this.props.onOpen) this.props.onOpen();
  }

  onClose() {
    if (this.props.onClose) this.props.onClose();
  }

  render() {
    return <InfoWindow ref={this.infoWindowRef} />;
  }
}
