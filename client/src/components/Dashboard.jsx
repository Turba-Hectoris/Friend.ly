import React from 'react';
import $ from 'jquery';
import ChatRoom from './ChatRoom.js';
import Chatroom from './Chatroom.jsx'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'Aaron',
      events : [ 'Hiking in the mountains', 'Making memes', 'Making memes', 'Making memes', 'Making memes', 'Making memes', 'Making memes', 'Making memes', 'Making memes', 'Making memes', 'Making memes', 'Making memes', 12, 13, 14, 15, 16, 17, 18, 19, 20 ],
      select_event_id: 2,
      currentRoom: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (div, item) {
    // div.target.style.backgroundColor = 'red'
    this.setState({
      currentRoom: item
    })
  }

  componentWillMount() {
    
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
                <h3 style={{padding:'0',margin:'auto'}}>Create Event</h3>
            </div>
          </div>

          <Chatroom roomId={this.state.select_event_id} currentRoom={this.state.currentRoom} roomName={this.state.events[this.state.currentRoom]} username={this.state.username}/>
          
          <div className="db_panel_3">
            <div className="db_detail">

              <h3>Event Detail--Box6</h3>
            </div>
          </div>

      </div>
    </div>
    )
  }
}

const EventListItem = (props) => (
  props.selected ? (<li style={{backgroundColor: 'rgba(136, 136, 136, .25)'}}><div className="eventListItem" onClick={(e) => props.handleClick(e, props.roomNumber)}><div style={{display: 'inline-block', height: '100%', alignItems: 'center'}}><img className="eventListPhoto"height="50px" width="50px"src="http://johnsonlegalpc.com/wp-content/uploads/2016/09/person.png"/></div><span className="eventListName">{props.item}</span></div></li>)
  : (<li><div className="eventListItem" onClick={(e) => props.handleClick(e, props.roomNumber)}><div style={{display: 'inline-block', height: '100%', alignItems: 'center'}}><img className="eventListPhoto"height="50px" width="50px"src="http://johnsonlegalpc.com/wp-content/uploads/2016/09/person.png"/></div><span className="eventListName">{props.item}</span></div></li>)
)

export default Dashboard