import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import EventPage from './EventPage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // container 

// #5ce1e6 is pin color
// #0275d8 is btn primary color


class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: [],
      listType: "Events",
      dropDownTitle: "☰ Sort By",
      options: [
        {
          title: 'Time',
          selected: true,
        },
        {
          title: 'Distance',
          selected: false,
        },
      ],
    };
    if (this.props.listType === "bookmarked") {
      this.state.listType = "Bookmarked";
    }
    this.handleSelectSort = this.handleSelectSort.bind(this);
    this.changeModal = this.changeModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.save = this.save.bind(this);
    this.sortRes = this.sortRes.bind(this);
    this.merge = this.merge.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.events !== this.props.events) {
      const ress = [];
      const { events, zipcode } = this.props;
      let count = 0;
      const distance = new google.maps.DistanceMatrixService();
      for (let i = 0; i < events.length; i += 1) {
        const eventLoc = events[i].location;
        distance.getDistanceMatrix({
          origins: [zipcode],
          destinations: [eventLoc],
          travelMode: 'WALKING',
          unitSystem: google.maps.UnitSystem.IMPERIAL,
        // eslint-disable-next-line no-loop-func
        }, (response, status) => {
          if (status == 'OK') {
            ress.push({
              eventName: events[i].eventName,
              dist: response.rows[0].elements[0].distance.text,
              startTime: events[i].startTime,
              isShown: 'yes',
              eventInfo: events[i],
              clicks: 0,
            });
            count += 1;

            if (count === events.length) {
              // new Promise(() => this.sortRes(ress)).then((sortedRes) => {
              //   this.setState({
              //     res: sortedRes,
              //   });
              // });
              const sortedRes = this.sortRes(ress);
              this.setState({
                res: sortedRes,
              });
            }
          }
        });
      }
    }
  }

  sortRes(results) {
    if (results.length <= 1) {
      return results;
    }

    const middle = Math.floor(results.length / 2);
    const left = results.slice(0, middle);
    const right = results.slice(middle);

    return this.merge(this.sortRes(left), this.sortRes(right));
  }

  merge(left, right) {
    let res = [], leftIndex = 0, rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
      if (this.state.dropDownTitle == "Distance") {
        if (left[leftIndex].dist < right[rightIndex].dist) {
          res.push(left[leftIndex]);
          leftIndex++;
        } else {
          res.push(right[rightIndex]);
          rightIndex++;
        }
      } else {
        if (left[leftIndex].startTime < right[rightIndex].startTime) {
          res.push(left[leftIndex]);
          leftIndex++;
        } else {
          res.push(right[rightIndex]);
          rightIndex++;
        }
      }
    }

    return res.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  handleSelectSort(sortBy) {
    // eslint-disable-next-line react/no-unused-state
    let temp = this.state.options;
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].title === sortBy) {
        temp[i].selected = !temp[i].selected;
        if (temp[i].selected) {
          this.setState({
            dropDownTitle: temp[i].title
          }, () => {
            const sortedRes = this.sortRes(this.state.res);
            this.setState({
              res: sortedRes,
            });
          });
        }
        else {
          this.setState({
            dropDownTitle: "☰ Sort By"
          });
        }
      } else {
        temp[i].selected = false;
      }
    }
    this.setState({
      options: temp,
    });
  }

  // showModal(event) {
  //   event.preventDefault();
  //   const name = event.currentTarget.id;
  //   const results = this.state.res.slice();
  //   for (var i = 0; i < results.length; i++) {
  //     if (results[i].eventName === name) {
  //       // results[i].isShown = "yes";
  //       results[i].clicks = 1;
  //       this.setState({
  //         res: results
  //       });
  //       break;
  //     }
  //   }
  // }

  changeModal(targetName) {
    // event.preventDefault();
    const name = targetName;
    const results = this.state.res;
    for (var i = 0; i < results.length; i++) {
      if (results[i].eventName === name) {
        if (results[i].clicks === 0) {
          results[i].clicks = 1;
        } else {
          results[i].clicks = 0;
        }
        break;
      }
    }
    this.setState({
      res: results
    });
  }

  closeModal(name) {
    let ress = this.state.res;
    for (let i = 0; i < ress.length; i++) {
      if (ress[i].eventName === name) {
        ress[i].clicks = 0;
        ress[i].isShown = "";
        this.setState({
          res: ress,
        });
      }
    }
  }

  save(id) {
    this.props.bookmark(id);
  }

  render() {
    const { options, res, isShown } = this.state;
    let empty_list = ""
    let list = res.map((dict) => (
      <div id={dict.eventName} onClick={() => this.changeModal(dict.eventName)}>
        <li className="list-group-item" key={dict.eventName}>
          { dict.eventName }
          <span className="distance">
            { this.state.dropDownTitle === "Distance" ? dict.dist : dict.startTime }</span>
        </li>
        <EventPage
          show={dict.clicks}
          handleClose={this.changeModal}
          eventInfo={dict.eventInfo}
          save={this.save} 
          distance={dict.dist}
          unbookmark={this.props.unbookmark}
        />
      </div>
    ));
    if (this.props.events.length === 0) {
      let comment = ""
      let icon = <FontAwesomeIcon icon="igloo" color="#0275d8"/>
      let sf = <FontAwesomeIcon icon="snowflake" color="aquamarine"/>
      if (this.props.listType === "bookmarked") {
      
        comment = "You have no bookmarked items "
        empty_list = "empty-list"
      }
      else {
        comment = "There are no events at this time"
        empty_list = "empty-list"
      }
      list = (
        <h5 style={{color: "#0275d8", fontStyle: "italic"}} className={`no-${this.props.listType}-items`}>{ comment } {icon}</h5>
      )
    }
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
        <h4 className="list-title">{this.state.listType}</h4>
          <span> <Dropdown title={this.state.dropDownTitle} res={options} toggle={this.handleSelectSort}/></span>
        </nav>

        <div className={`overflow-auto ${this.props.listType}-list ${empty_list}`}>
          <ul className="list-group">
            { list }
          </ul>
        </div>
      </div>
    );
  }
}

EventList.propTypes = {
  events: PropTypes.array.isRequired,
  bookmark: PropTypes.func.isRequired,
  zipcode: PropTypes.string.isRequired,
  listType: PropTypes.string.isRequired,
  unbookmark: PropTypes.func.isRequired,
};

export default EventList;
