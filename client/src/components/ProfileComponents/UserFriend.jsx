import React from 'react';
import { Link } from 'react-router-dom';

export const UserFriend = ({ getUserDisplayedData, friend, handleAddFriend }) => {
	return (
			<div className="profile_friend">
			<Link onClick={() => {getUserDisplayedData(friend.userID)}} to={`/profile/${friend.userID}`}>
					<img className="" src={`${friend.profilePic || 'https://previews.123rf.com/images/diddleman/diddleman1204/diddleman120400002/13058158-no-user-profile-picture-hand-drawn-.jpg'}`} alt=""/>
			</Link>
      <div className="profile_friend_info" >
        <p className="profile_friend_username">{friend.username}</p>
        <p className="profile_friend_email">{friend.email}</p>
        <p className="profile_friend_gender">{friend.gender}</p>
        <p className="profile_friend_bio">{friend.bio}</p>
      </div>
        <button className="btn add_friend_button" type='button' onClick={() => {handleAddFriend(friend.userID)}} > Add Friend </button>
			</div>
	);
}

export default UserFriend;