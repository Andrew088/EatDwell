import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // container 


// eslint-disable-next-line react/prefer-stateless-function
class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
  }

  close(e) {
    e.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    console.log(this.props.eventInfo.eventName);
    //this.props.handleClose(this.props.eventInfo.eventName);
    this.props.show = 0;
  }

  save() {
    this.props.save(this.props.eventInfo.eventId);
  }

  render() {
    const { show, eventInfo } = this.props;
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
          <h2>{eventInfo.eventName}</h2> 
          <span className="modal-button" >
            <button id="bkmark" className="btn btn-outline-primary btn-sm" onClick={this.save}><FontAwesomeIcon icon="snowflake"/> Bookmark</button> 
            <button id= "close" className= "btn btn-danger btn-sm" onClick={this.close}><FontAwesomeIcon icon="times" color="white"/></button></span>
            
          <h4>Start Time: {eventInfo.startTime}</h4>
          <h4>End Time: {eventInfo.endTime}</h4>
          <h4>Food Type: {foodTypes} </h4>
          <p>{eventInfo.description}</p>
          <img className="eventImage" src={eventInfo.cover} alt="profile" />
        </section>
      </div>
    );
  }
}

EventPage.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  eventInfo: PropTypes.object.isRequired,
  save: PropTypes.func.isRequired,
};

export default EventPage;
