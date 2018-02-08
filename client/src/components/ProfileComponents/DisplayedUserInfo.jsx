import React from 'react';
import ImageEditIcon from './ProfileComponents/ImageEditIcon.jsx';

export const DisplayedUserInfo = (props) => {
  return (
    <div>
      <div className="profile_image">
      <img src={`${props.imgUrl}`} />
      </div>
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
    </div>  
  )
}