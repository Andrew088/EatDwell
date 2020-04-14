import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // container 


// eslint-disable-next-line react/prefer-stateless-function
class EventPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmark: false,
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
    // eslint-disable-next-line react/destructuring-assignment
    console.log(this.props.eventInfo.eventName);
    //this.props.handleClose(this.props.eventInfo.eventName);
    this.props.show = 0;
  }

  unbookmark() {
    console.log("unbookmarked");
    this.props.unbookmark(this.props.eventInfo.eventId);
    this.setState({
      bookmark: false,
    });
  }

  save() {
    this.setState({
      bookmark: true,
    });
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
          <h2><a href={eventInfo.link}>{eventInfo.eventName}</a>
          <span className="modal-button" >
            <button id="bkmark" className="btn btn-outline-primary btn-sm" onClick={this.state.bookmark ? this.unbookmark : this.save}><FontAwesomeIcon icon="snowflake"/>{this.state.bookmark ? ' Unbookmark' : ' Bookmark'}</button>
            <button id= "close" className= "btn btn-danger btn-sm" onClick={this.close}><FontAwesomeIcon icon="times" color="white"/></button></span></h2>
          
          <button id="verified" className="btn btn-success btn-med mr-1" onClick={this.onClickVerify} disabled={this.state.verifyDisabled}> <FontAwesomeIcon icon="check-circle"/>
          {this.state.verifyDisabled ?  'Verified!': 'Verify'} </button>
          <button id="unverified" className="btn btn-outline-warning btn-med"> <FontAwesomeIcon icon="question-circle"/> Not Sure</button>

          

          <h4 id="start">Start Time: {eventInfo.startTime}</h4>
          <h4>End Time: {eventInfo.endTime}</h4>
          <h4>Distance: {distance}</h4>
          <h4>Food Type: {foodTypes} </h4>
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
};

export default EventPage;
