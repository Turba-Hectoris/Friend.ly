import React from 'react';

class Profile extends React.Component {
  render() {
    return (
      <div className="lt
        lt-xs-x-1
        lt-xs-y-1
        lt-xs-w-1
        lt-xs-h-1
        lt-sm-x-0
        lt-sm-y-1
        lt-sm-w-2
        lt-sm-h-2
        lt-md-x-0
        lt-md-y-1
        lt-md-w-4
        lt-md-h-2
        lt-lg-x-0
        lt-lg-y-0
        lt-lg-w-5
        lt-lg-h-5">
        <div className="lt-body">
          <div className="profile-body">  
            <div className="lt
              lt-xs-x-1
              lt-xs-y-1
              lt-xs-w-1
              lt-xs-h-1
              lt-sm-x-0
              lt-sm-y-1
              lt-sm-w-2
              lt-sm-h-2
              lt-md-x-0
              lt-md-y-1
              lt-md-w-4
              lt-md-h-2
              lt-lg-x-1
              lt-lg-y-1
              lt-lg-w-1
              lt-lg-h-1">
                <div className="lt-body">
                  <div className="profile-image-div">
                    <img src="stock-user-profile.jpg" alt="" className="profile-image"/>
                  </div>  
                </div> 
            </div>   
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

/**
 * 1) Profile Photo
 *  a) User can update profile
 * 2) serve up active events 
 * 3) Catagories of Interest
 *  a) User can edit/update their catagories
 * 4) visual analytics of past events participated in 
 */
