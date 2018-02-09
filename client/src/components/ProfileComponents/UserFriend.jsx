import React from 'react';
import { Link } from 'react-router-dom';

export const UserFriend = (props) => {
	return (
			<div className="profile_friend">
			<Link onClick={() => {props. getUserDisplayedData(props.friend.userID)}} to={`/profile/${props.friend.userID}`}>
					<img className="" src="https://images.onlinelabels.com/images/clip-art/dagobert83/dagobert83_female_user_icon.png" alt=""/>
			</Link>
      <div className="profile_friend_info" >
        <p className="profile_friend_username">{props.friend.username}</p>
        <p className="profile_friend_email">{props.friend.email}</p>
        <p className="profile_friend_gender">{props.friend.gender}</p>
        <p className="profile_friend_bio">{props.friend.bio}</p>
      </div>
        <button className="btn add_friend_button" type='button' onClick={() => {props.handleAddFriend(props.friend.userID)}} > Add Friend </button>
			</div>
	);
}

export default UserFriend;