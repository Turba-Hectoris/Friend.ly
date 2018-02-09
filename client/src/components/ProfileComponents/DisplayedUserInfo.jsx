import React from 'react';

export const DisplayedUserInfo = ({ userDisplayedData, edit, handleEditClick }) => {
  return (
    <div className="profile_info_container" >
      <div className="profile_image">
        <img src={`${userDisplayedData.profilePic}`} />
      </div>
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
      <div className="profile_add_friend">
        <button className="btn profile_friend_button" onClick={handleEditClick}> { edit ? "Friend" : "Unfriend"} </button>
      </div>
    </div>  
  )
}

export default DisplayedUserInfo;