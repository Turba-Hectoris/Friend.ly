import React from 'react';
import { Link } from 'react-router-dom';

export const UserEvent = ({ event, handleJoinEvent, displayedUser, loggedInUserID }) => {

  const toDateFormat = (dateStr) => {
    let dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString();
  }

  return (
    <div className="profile_event">
      <div className="profile_event_info" >
        <img src={`${event.imgLink}`} />
        {
          !displayedUser ? loggedInUserID == event.creatorID ? <button className="btn event_details_button" type='button' onClick={() => {handleEventDetails(event.eventID)}} > Event Details </button> :
          <input type="text" style={{display: "none"}}/> :
          <button className="btn join_event_button" type='button' onClick={() => {handleJoinEvent(event.eventID)}} > Join Event </button>
        }
        <span className="profile_event_name">{event.eventName}</span>
        {/* <span className="profile_event_status">{event.status}</span> */}
        <span className="profile_event_creator">{event.creatorName}</span>
        <span className="profile_event_date_range">{toDateFormat(event.startDate)} - {toDateFormat(event.endDate)}</span> 
        {/* <span className="profile_event_category">{event.category}</span> */}
        <span className="profile_event_capacity">{event.current} out of {event.capacity}</span>
        <span className="profile_event_location">{event.locationname || 'undecided'}</span>
        <div className="profile_event_description"><p>{event.eventDesc}</p></div>
      </div>   
    </div>
  );
}

export default UserEvent;