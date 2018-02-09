import React from 'react';
import ImageEditIcon from './ImageEditIcon.jsx';
import UserUpdateForm from './UserUpdateForm.jsx';

export const LoggedInUserInfo = (props) => {
  return (
    <div className="profile_info_container">
      <div className="profile_image">
      {
        props.edit ? <ImageEditIcon loggedInUserID={props.userDisplayedData.userID}/> : <img src={`${props.userDisplayedData.profilePic || 'https://previews.123rf.com/images/diddleman/diddleman1204/diddleman120400002/13058158-no-user-profile-picture-hand-drawn-.jpg'}`} />
      }
      </div>
      {
      props.edit ? <UserUpdateForm loggedInUserID={props.userDisplayedData}/>
      :
        <div className="profile_info">
          <div className="profile_bio">
            <p>
              { 
                props.userDisplayedData.bio
              }
            </p>
            <hr/>
            <p>
              {
                `${props.userDisplayedData.gender}${'\n'}${props.userDisplayedData.email}`
              }
            </p>
          </div>
          <div className="profile_username">
            <p> {props.userDisplayedData.username} </p>
          </div>
        </div>
      }
      <div className="profile_edit">
        <button className="btn profile_edit_button" onClick={props.handleEditClick}> {props.edit ? "Save" : "Edit Profile"} </button>
      </div>
    </div>  
  )
}

export default LoggedInUserInfo;