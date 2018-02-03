import React from 'react';

const UserEvent = (props) => {
  return (
    <div className="profile_event">
      <img src="https://d.wildapricot.net/images/newsblog/bigstock-events-7444309.jpg" alt=""/>
      <hr/>
      {props.event.eventName + '\n' + props.event.status + '\n' + props.event.date} 
    </div>
  );
}

export default UserEvent;