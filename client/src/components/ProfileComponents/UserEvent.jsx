import React from 'react';
import { Link } from 'react-router-dom';

export const UserEvent = ({ event, handleJoinEvent }) => {
  return (
    <div className="profile_event">
      <img src={`${event.imgLink}`} />
      <div className="profile_event_info" >
        <p className="profile_event_name">{event.eventName}</p>
        <p className="profile_event_status">{event.status}</p>
        <p className="profile_event_creator">{event.creatorID}</p>
        <p className="profile_event_date_range">{event.startDate} - {event.endDate}</p> 
        <p className="profile_event_category">{event.category}</p>
        <p className="profile_event_description">{event.eventDesc}</p>
        <button className="btn join_event_button" type='button' onClick={() => {handleJoinEvent(event.eventID)}} > Join Event </button> 
      </div>   
    </div>
  );
}

export default UserEvent;