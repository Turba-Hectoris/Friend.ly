import React from 'react';
import ImageEditIcon from './ProfileComponents/ImageEditIcon.jsx';

export const LoggedUserInfo = (props) => {
  return (
    <div>
      <div className="profile_image">
      {
        props.edit ? <ImageEditIcon loggedInUserID={props.loggedInUserID}/> : <img src={`${props.imgUrl}`} />
      }
      </div>
      {
      props.edit ? <UserUpdateForm loggedInUserID={props.userDisplayedData}/>
      :
        <div className="profile_info_container">
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
      <div className="profile_edit_button">
        <button onClick={props.handleEditClick}> {props.edit ? "Save" : "Edit Profile"} </button>
      </div>
    </div>  
  )
}