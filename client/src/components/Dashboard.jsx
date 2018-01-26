import React from 'react';
import $ from 'jquery';

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <div className="dashboard">
        <div className="eventsBox">
          <div className="events_one">
            <div className="eventsList" >
              <div id="event">
                <p>This is an event list</p>
              </div>
            </div>
          </div>
          <div className="toCreate">
            <div id="toCreate">
              <button>Create Event</button>
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="chat_one">
            <div id="eventInfo">
              <span id="eventName">Event name</span>
              <span id="eventDetail"><button>View Details</button></span>
            </div>
          </div>
          <div className="chat_two">
            <h2>Chatroom</h2>
          </div>
          <div className="chat_three">
            <h3>Chat Typing</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard