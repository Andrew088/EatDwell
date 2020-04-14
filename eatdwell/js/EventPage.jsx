import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // container 


// eslint-disable-next-line react/prefer-stateless-function
class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verified: 0,
      unverified: 0,
      verifyDisabled: false,
    };
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
    this.unbookmark = this.unbookmark.bind(this);
  }

  close(e) {
    e.preventDefault();
    document.getElementById(this.props.eventInfo.eventId).classList.remove("display-block");
    document.getElementById(this.props.eventInfo.eventId).classList.add("display-none");
    // eslint-disable-next-line react/destructuring-assignment
    console.log(this.props.eventInfo.eventName);
    //this.props.handleClose(this.props.eventInfo.eventName);
    this.props.show = 0;
  }

  unbookmark() {
    this.props.unbookmark(this.props.eventInfo.eventId);
  }

  save() {
    this.props.save(this.props.eventInfo.eventId);
  }

  onClickVerify() {
    
    if(this.state.verifyDisabled){
      return;
    }
    this.setState({verifyDisabled: true}, () => { console.log('verify disabled') });
  }

  

  render() {
    const { show, eventInfo, distance } = this.props;
    // const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    let showHideClassName = "";
    if (show == 0) {
      showHideClassName = "modal display-none";
    }
    if (show == 1) {
      showHideClassName = "modal display-block";
    }
    let foodTypes = '';
    for (let i = 0; i < eventInfo.foodType.length; i++) {
      foodTypes += (eventInfo.foodType[i]);
      foodTypes += (', ');
    }
    return (
      <div className={showHideClassName} id={eventInfo.eventId}>
        <section className="modal-main">
          <h2>
            <a href={eventInfo.link}>{eventInfo.eventName}</a>
            <span className="modal-button">
              <button type="button" id="bkmark" className="btn btn-outline-primary btn-sm" onClick={this.props.bookmark ? this.unbookmark : this.save}>
                <FontAwesomeIcon icon="snowflake"/>
                {this.props.bookmark ? ' Unbookmark' : ' Bookmark'}
              </button>
              <button type="button" id="close" className="btn btn-danger btn-sm" onClick={this.close}><FontAwesomeIcon icon="times" color="white"/></button>
            </span>
          </h2>
          <h4 id="start">Start Time: {eventInfo.startTime}</h4>
          <h4>End Time: {eventInfo.endTime}</h4>
          <h4>Distance: {distance}</h4>
          <h4>Food Type: {foodTypes.slice(0, -2)} </h4>
          <p>{eventInfo.description}</p>
          <img className="eventImage" src={eventInfo.cover} alt="profile" />
        </section>
      </div>
    );
  }
}

EventPage.propTypes = {
  show: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  eventInfo: PropTypes.object.isRequired,
  save: PropTypes.func.isRequired,
  distance: PropTypes.string.isRequired,
  unbookmark: PropTypes.func.isRequired,
  bookmark: PropTypes.bool.isRequired,
};

export default EventPage;
