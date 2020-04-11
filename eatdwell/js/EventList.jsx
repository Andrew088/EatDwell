import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import EventPage from './EventPage';
import update from 'immutability-helper';

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: [],
      listType: "Events",
      dropDownTitle: "☰ Sort By",
      options: [
        {
          title:'Time',
          selected: true
        },
        {
          title: 'Distance',
          selected: false
        }
      ],
    };
    if (this.props.listType === "bookmarked") {
      this.state.listType = "Bookmarked";
    }
    this.handleSelectSort = this.handleSelectSort.bind(this);
    this.changeModal = this.changeModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.events !== this.props.events) {
      console.log("should come here after bookmark")
      const ress = [];
      const { events } = this.props;
      for (let i = 0; i < events.length; ++i) {
        ress.push({
          eventName: events[i].eventName,
          dist: 100 * (i + 1),
          isShown: "yes",
          eventInfo: events[i],
          clicks: 0
        });
      }
      this.setState({
        res: ress,
      });
    }
  }

  handleSelectSort(sortBy) {
    // eslint-disable-next-line react/no-unused-state
    console.log(sortBy);
    let temp = this.state.options;
    for (var i = 0; i < temp.length; i++) {
      if (temp[i].title === sortBy) {
        console.log("changing " + temp[i].title);
        temp[i].selected = !temp[i].selected;
        console.log(temp[i].title + " set to " + temp[i].selected);
        if (temp[i].selected) {
          this.setState({
            dropDownTitle: temp[i].title
          });
        }
        else {
          this.setState({
            dropDownTitle: "☰ Sort By"
          });
        }
      }
      else {
        temp[i].selected = false;
        console.log(temp[i].title + " set to false");
      }
    }
    this.setState({
      options: temp
    });
    console.log(this.state.options)
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
    // console.log(ress);
    // ress[0].isShown = !ress[0].isShown;
    // ress[0].eventName = "farts and stuff";
    // console.log(ress);
    // console.log('aftersss: ' + ress[0].eventName);
    // console.log('aftersss: ' + ress[0].isShown);
    // console.log(ress);
    for (let i = 0; i < ress.length; i++) {
      if (ress[i].eventName === name) {
        console.log("reaches here!")
        // ress[i].eventName = "butts";
        console.log('beforesss: ' + ress[i].isShown);
        console.log('beforesss: ' + ress[i].clicks);
        ress[i].clicks = 0;
        ress[i].isShown = "";
        console.log(ress);
        console.log('afterrrrr: ' + ress[i].isShown);
        console.log('afterrrrr: ' + ress[i].clicks);
        console.log(this.state.res);
        this.setState({
          res: ress
        });
      }
      console.log("REEEEEEsE")
      // console.log("ress during", ress);
      // this.setState({
      //   res: ress
      // });
      // console.log("res during: ", this.state.res);
    }
    console.log('after after: ' + ress);
    
    console.log('finally: ' + this.state.res);
    /*console.log("enters close modal")
    var results = JSON.parse(JSON.stringify(this.state.res))
    console.log(results);
    var ressss = []
    for (var i = 0; i < results.length; i++) {
      if (results[i].eventName === name) {
        /*results[i].isShown = false;
        console.log(results[i].isShown);
        
        console.log(results);
        console.log(results[i].isShown);
        this.setState((prevState) => ({
          res: [...prevState.res, ressss],
        }), () => {
          console.log("....")
          console.log(this.state.res);
        });
        this.setState((prevState) => update(prevState, {res: {[i]: {isShown: {$set: false}}}}));
        break;
      }
    }*/
    // const results = this.state.res.slice();
    // for (var i = 0; i < results.length; i++) {
    //   if (results[i].eventName === name) {
    //     results[i].isShown = "";
    //     this.setState({
    //       res: results,
    //     });
    //     break;
    //   }
    // }
  }

  save(id) {
    this.props.bookmark(id);
  }

  render() {
    console.log("render")
    const { options, res, isShown } = this.state;
    const list = res.map((dict) => (
      <div id={dict.eventName} onClick={() => this.changeModal(dict.eventName)}>
        <li className="list-group-item" key={dict.eventName}>
          { dict.eventName }
          <span className="distance">
            { dict.dist } feet</span>
        </li>
        <EventPage show={dict.clicks} handleClose={this.changeModal} eventInfo={dict.eventInfo} save={this.save} />
      </div>
    ));
    return (
      <div>
        <nav className="navbar navbar-light bg-light">
        <h4 className="list-title">{this.state.listType}</h4>
        
          <span> <Dropdown title={this.state.dropDownTitle} res={options} toggle={this.handleSelectSort}/></span>
        
        </nav>

        <div className={`overflow-auto ${this.props.listType}-list`}>
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
};

export default EventList;


