import React from 'react';
import {Link} from 'react-router-dom';


const UserFriend = (props) => {
  return (
    <div className="profile_friend">
      <Link onClick={props.handleFriendClicked} to={`/profile/${props.friend.userID}`}>
        <img className="" src="https://images.onlinelabels.com/images/clip-art/dagobert83/dagobert83_female_user_icon.png" alt=""/>
      </Link>
        <hr/>
      {props.friend.username + '\n' + props.friend.email + '\n' + props.friend.gender} 
    </div>
  );
}

export default UserFriend;

