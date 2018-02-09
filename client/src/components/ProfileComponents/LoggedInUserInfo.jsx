import React from 'react';
import ImageEditIcon from './ImageEditIcon.jsx';
import UserUpdateForm from './UserUpdateForm.jsx';

export const LoggedInUserInfo = ({ userDisplayedData, edit, handleEditClick }) => {
  return (
    <div className="profile_info_container">
      <div className="profile_image">
      {
        edit ? <ImageEditIcon loggedInUserID={userDisplayedData.userID}/> : <img src={`${userDisplayedData.profilePic || 'https://previews.123rf.com/images/diddleman/diddleman1204/diddleman120400002/13058158-no-user-profile-picture-hand-drawn-.jpg'}`} />
      }
      </div>
      {
      edit ? <UserUpdateForm userDisplayedData={userDisplayedData}/>
      :
        <div className="profile_info">
          <div className="profile_bio">
            <p>
              { 
                userDisplayedData.bio
              }
            </p>
            <hr/>
            <p>
              {
                `${userDisplayedData.gender}${'\n'}${userDisplayedData.email}`
              }
            </p>
          </div>
          <div className="profile_username">
            <p> 
              {
                userDisplayedData.username
              } 
            </p>
          </div>
        </div>
      }
      <div className="profile_edit">
        <button className="btn profile_edit_button" onClick={handleEditClick}> {edit ? "Save" : "Edit Profile"} </button>
      </div>
    </div>  
  )
}

export default LoggedInUserInfo;