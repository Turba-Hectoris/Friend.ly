import React from 'react';
import { Link } from 'react-router-dom';

export const UserFriend = ({ getUserDisplayedData, friend, handleAddFriend }) => {
	return (
			<div className="profile_friend">
			<Link className="profile_friend_image" onClick={() => {getUserDisplayedData(friend.userID)}} to={`/profile/${friend.userID}`}>
					<img className="" src={`${friend.profilePic}`} alt=""/>
          <button className="btn add_friend_button" type='button' onClick={() => {handleAddFriend(friend.userID)}} > Add Friend </button>
          <div className="profile_friend_username">{friend.username}</div>
			</Link>
        <div className="profile_friend_info_container" >
          <p className="profile_friend_bio">{friend.bio}</p>
          <hr/>
          <div className="profile_friend_email">{friend.email}</div>
          <div className="profile_friend_gender">{friend.gender || 'undecided'}</div>
        </div>
			</div>
	);
}

export default UserFriend;