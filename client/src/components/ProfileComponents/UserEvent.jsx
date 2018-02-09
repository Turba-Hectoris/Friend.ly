import React from 'react';
import { Link } from 'react-router-dom';

export const UserEvent = (props) => {
  return (
    <div className="profile_event">
      <img src={`${props.event.imgLink}`} />
      <div className="profile_event_info" >
        <p className="profile_event_name">{props.event.eventName}</p>
        <p className="profile_event_status">{props.event.status}</p>
        <p className="profile_event_creator">{props.event.creatorID}</p>
        <p className="profile_event_date_range">{props.event.startDate} - {props.event.endDate}</p> 
        <p className="profile_event_category">{props.event.category}</p>
        <p className="profile_event_description">{props.event.eventDesc}</p>
      </div>
        <button className="btn join_event_button" type='button' onClick={() => {props.handleJoinEvent(props.event.eventID)}} > Join Event </button>  
    </div>
  );
}

export default UserEvent;