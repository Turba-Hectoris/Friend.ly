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
      <div className="db_container">
        <div className="dashboard">

          <div className="db_panel_1">
            <div className="db_events">
              <h3>Event list--Box1</h3>         
            </div>
            <div className="db_create">
              <div id="toCreate">
                <button><h2>Create Event--Box3</h2></button>
              </div>
            </div>
          </div>

          <div className="db_panel_2">
            <div className="db_info">
              <span id="eventName"><h3>Event name--Box2</h3></span>
            </div>
            <div className="db_chatroom">
              <h2>Chatroom--Box4</h2>
            </div>
            <div className="db_typing">
              <h3>Chat Typing--Box5</h3>
            </div>
          </div>

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

export default Dashboard