import React from 'react';
import $ from 'jquery';
import ChatRoom from './ChatRoom.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'Jackie',
      events: [],
      select_event_id: 2
    }
    // firebase.auth().signInAnonymously().catch(function(error) {
    //   console.error('Error signing on to firebase!', error.message);
    // });
    
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     // console.log('User signed in', user);
    //     var isAnonymous = user.isAnonymous;
    //     var uid = user.uid;
    //   }
    // });
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
            <div >
              <ChatRoom username={this.state.username} roomId={this.state.select_event_id} />
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