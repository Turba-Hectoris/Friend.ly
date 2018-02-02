import React from 'react';

const UserEvent = (props) => {
  return (
    <div className="profile_event">
      <img src="event-pic.jpg" alt=""/>
      <hr/>
      {props.event.eventName + '\n' + props.event.status + '\n' + props.event.date} 
    </div>
  );
}

export default UserEvent;