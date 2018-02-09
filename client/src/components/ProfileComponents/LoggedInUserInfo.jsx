import React from 'react';
import ImageEditIcon from './ImageEditIcon.jsx';
import UserUpdateForm from './UserUpdateForm.jsx';

export const LoggedInUserInfo = ({ userDisplayedData, edit, handleEditClick }) => {
  console.log('userData', userDisplayedData)
  console.log('edit: ', edit)
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
            <p>
              { 
                userDisplayedData.bio
              }
            </p>
            <hr/>
            <p>
              {
                `${userDisplayedData.gender || 'undecided'}${'\n'}${userDisplayedData.email}`
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