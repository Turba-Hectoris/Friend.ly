import React from 'react';

export const DisplayedUserInfo = ({ userDisplayedData, handleToggleGraph, toggleGraphRequest }) => {
  return (
    <div className="profile_info_container" >
      <div className="profile_image">
        <img src={`${userDisplayedData.profilePic}`} />
      </div>
        <div className="profile_info">
          <div className="profile_bio">
            <p>{userDisplayedData.bio}</p>
          </div>  
            <hr/>
            <div className="profile_gender" >{`${userDisplayedData.gender}` || 'undecided'}</div>
            <div className="profile_email" >{userDisplayedData.email}</div>
            <div className="profile_username">{userDisplayedData.username}</div> 
        </div>
        <div className="profile_graph">
          <button className="btn profile_graph_button" onClick={handleToggleGraph}> {toggleGraphRequest ? "Bar Graph" : "Pie Graph"} </button>
        </div>
    </div>  
  )
}

export default DisplayedUserInfo;