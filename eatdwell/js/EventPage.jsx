import React from 'react';
import PropTypes from 'prop-types';

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
    this.props.handleClose(this.props.eventInfo.eventName);
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
      <div className={showHideClassName}>
        <section className="modal-main">
          <h2>{eventInfo.eventName}
          <span>
            <button type="button" onClick={this.save}>Bookmark</button>
            <button type="button" onClick={this.close}>X</button></span></h2>
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
