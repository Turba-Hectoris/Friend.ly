import React from 'react';
import { Link } from 'react-router-dom';

export const UserEvent = ({ event, handleJoinEvent, displayedUser, loggedInUserID }) => {
  return (
    <div className="profile_event">
      <div className="profile_event_info" >
        <img src={`${event.imgLink}`} />
        {
          !displayedUser ? loggedInUserID == event.creatorID ? <button className="btn event_details_button" type='button' onClick={() => {handleEventDetails(event.eventID)}} > Event Details </button> :
          <input type="text" style={{display: "none"}}/> :
          <button className="btn join_event_button" type='button' onClick={() => {handleJoinEvent(event.eventID)}} > Join Event </button>
        }
        <p className="profile_event_name">{event.eventName}</p>
        <p className="profile_event_status">{event.status}</p>
        <p className="profile_event_creator">{event.creatorID}</p>
        <p className="profile_event_date_range">{event.startDate} - {event.endDate}</p> 
        <p className="profile_event_category">{event.category}</p>
        <p className="profile_event_description">{event.eventDesc}</p>
      </div>   
    </div>
  );
}

export default UserEvent;