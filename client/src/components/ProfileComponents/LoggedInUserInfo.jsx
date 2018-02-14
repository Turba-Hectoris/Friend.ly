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
      <div className="profile_username"> {userDisplayedData.username}</div>
      {
      edit ? <UserUpdateForm userDisplayedData={userDisplayedData}/>
      :
        <div className="profile_info">
          <div className="profile_bio">
            <p>{userDisplayedData.bio}</p>
          </div>
            <div className="profile_gender">{`${userDisplayedData.gender}` || 'undecided'}</div>
            <div className="profile_email">{userDisplayedData.email}</div>
            <div className="profile_social_media">
              <div className="profile_social_media_icon" > <a> <img src="https://www.seeklogo.net/wp-content/uploads/2016/09/facebook-icon-preview-400x400.png" alt=""/> </a> </div>
              <div className="profile_social_media_icon" > <a className="profile_social_media_icon"> <img src="https://images.vexels.com/media/users/3/137283/isolated/preview/8ca486faebd822ddf4baf00321b16df1-google-icon-logo-by-vexels.png" alt=""/> </a> </div>
            </div>  
        </div>  
      }
        <div className="profile_action_buttons">
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
    </div>  
  )
}

export default LoggedInUserInfo;