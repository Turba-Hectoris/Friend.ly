import React from 'react';
import ImageEditIcon from './ImageEditIcon.jsx';
import UserUpdateForm from './UserUpdateForm.jsx';

export const LoggedInUserInfo = ({ userDisplayedData, edit, handleEditClick, toggleFriendRequestList, toggleFriendRequest, handleToggleGraph, toggleGraphRequest }) => {
  return (
    <div className="profile_info_container">
      <div className="profile_image">
      {
        edit ? <ImageEditIcon loggedInUserID={userDisplayedData.userID}/> : <img src={`${userDisplayedData.profilePic}`} />
      }
      </div>
      {
      edit ? <UserUpdateForm userDisplayedData={userDisplayedData}/>
      :
        <div className="profile_info">
          <div className="profile_bio">
            <p>{userDisplayedData.bio}</p>
          </div>
            <hr/>
            <div className="profile_gender">{`${userDisplayedData.gender}` || 'undecided'}</div>
            <div className="profile_email">{userDisplayedData.email}</div>
            <a>  </a>
            <div className="profile_username"> {userDisplayedData.username}</div>
        </div>  
      }
      <div className="profile_edit">
        <button className="btn profile_edit_button" onClick={handleEditClick}> {edit ? "Save" : "Edit Profile"} </button>
      </div>
      <div className="profile_queue">
        <button className="btn profile_queue_button" onClick={toggleFriendRequestList}> {toggleFriendRequest ? "Categories" : "Friend Request"} </button>
      </div>
      <div className="profile_graph">
        <button className="btn profile_graph_button" onClick={handleToggleGraph}> {toggleGraphRequest ? "Bar Graph" : "Pie Graph"} </button>
      </div>
    </div>  
  )
}

export default LoggedInUserInfo;