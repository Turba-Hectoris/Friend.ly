import React from 'react';
import {Link} from 'react-router-dom';


const UserFriend = (props) => {
  return (
    <div className="profile_friend">
      <div className="profile_image">
        <img className="" src="stock-user-profile.jpg" alt=""/>
      </div> 
      <hr/>
      {props.friend.username + '\n' + props.friend.email + '\n' + props.friend.gender} 
    </div>
  );
}

export default UserFriend;

