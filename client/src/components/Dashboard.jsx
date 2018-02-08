import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';
import Chatroom from './Chatroom.jsx';
import axios from 'axios'
import { GoogleMap, Marker } from "react-google-maps"
import CreateMap from './CreateMap.jsx';


class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: this.props.username,
      events : [{roomName: 'Loading...'}],
      select_event_id: 0,
      currentRoom: 0,
      roomName: 'asd',
      location: '',
      locale: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.setLocale = this.setLocale.bind(this);
  }
  
  handleClick (div, item) {
      // div.target.style.backgroundColor = 'red'
    // console.log(item)
    this.setState( prevState => ({
      currentRoom: item.roomNumber,
      roomName: item.eventName,
      select_event_id: item.item.eventID
    }))
    $('.db_panel_2').css("z-index", "1")
  }

  componentWillMount() {
    axios.get('/profile/events', {params: {userID: this.props.userData}})
    .then((res) => {
      console.log('events in dashboard: ', res.data)
      this.setState({
        events: res.data,
        select_event_id: res.data[0].eventID
      })
    })
  }

handleLocationChange (location) {
    this.setState({
      location: location
    });
  }

  setLocale(locale) {
    this.setState({
      locale: locale
    })
  }
  render () {
    return (
      <div className="db_container">
        <div className="dashboard">

          <div className="db_panel_1">
          <div className="db_eventsHeader">
                <span style={{padding:'0', margin:'auto', fontWeight: '400'}}>Events</span>
            </div>
            <div className="db_events">
              <ul>
              {this.state.events.map((item, idx) => idx === this.state.currentRoom ? <EventListItem selected={true} handleClick={this.handleClick} item={item} key={idx} roomNumber={idx}/> : <EventListItem selected={false} handleClick={this.handleClick} item={item} key={idx} roomNumber={idx}/> )}
              </ul>      
            </div>
            <div className="db_create">    
                <h3 style={{margin: "auto"}}>
                <Link to="/createEvent" style={{padding:'0',margin:'auto',color:"#fff"}}>Create Event</Link>
                </h3>
            </div>
          </div>

          <Chatroom roomId={this.state.select_event_id} roomName={(this.state.events[this.state.currentRoom]).eventName} username={this.state.username}/>
          
          <EventDetails currentRoom={this.state.events[this.state.currentRoom]} handleLocationChange={this.handleLocationChange} setLocale={this.setLocale}/>

      </div>
    </div>
    )
  }
}

const EventListItem = (props) => (
  props.selected ? (<li style={{backgroundColor: 'rgba(136, 136, 136, .25)'}}><div className="eventListItem" onClick={(e) => props.handleClick(e, props)}><div style={{display: 'inline-block', height: '100%', alignItems: 'center'}}><img className="eventListPhoto"height="50px" width="50px"src="http://johnsonlegalpc.com/wp-content/uploads/2016/09/person.png"/></div><span className="eventListName">{props.item.eventName}</span></div></li>)
  : (<li><div className="eventListItem" onClick={(e) => props.handleClick(e, props)}><div style={{display: 'inline-block', height: '100%', alignItems: 'center'}}><img className="eventListPhoto"height="50px" width="50px"src="http://johnsonlegalpc.com/wp-content/uploads/2016/09/person.png"/></div><span className="eventListName">{props.item.eventName}</span></div></li>)
)

const EventDetails = (props) => (
  <div className="db_panel_3">
    <div className="db_detail">
    <span className="db_detail_swap" onClick={() => {$('.db_panel_3').css("z-index", "-2"); $('.db_panel_2').css("z-index", "2")}}>Back<hr/></span>
      <h1>Description:</h1>
      <div className="db_detail_description">{props.currentRoom.eventDesc}</div>
      <h1>Members:</h1>
      <div className="db_detail_members">{props.currentRoom.capacity + ' maximum attendees'}</div>
      <h1>Start Date:</h1>
      <div className="db_detail_startDate">{new Date(props.currentRoom.startDate).toLocaleTimeString()}</div>
      <h1>End Date:</h1>
      <div className="db_detail_endDate">{new Date(props.currentRoom.endDate).toLocaleTimeString()}</div>
      <div className="db_detail_map"><CreateMap getEventCoordinate={props.handleLocationChange} setLocale={props.setLocale}/></div>
    </div>
  </div>
)

export default Dashboard