import React from 'react';
import UserChart from './UserChart.jsx';
import UserFriend from './UserFriend.jsx';
import UserEvent from './UserEvent.jsx';


class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="profile_container">
        <div className="profile">
          <div className="profile_data">
            <UserChart catagories={this.props.userData[0].catagories}/>
          </div>
          <div className="profile_image"> 
            {this.props.userData[0].username}
            <img src="stock-user-profile.jpg" alt=""/>
            {this.props.userData[0].gender + ' '}
            {this.props.userData[0].email}
          </div>
          <div className="profile_bio">
            { this.props.userData[0].bio}
          </div>
          <div className="profile_events">
            <div className="profile_events_container">
              {
                this.props.userData[0].events.map(event => <UserEvent key={event.eventId}/>)
              }
            </div>
          </div>
          <div className="profile_friends">
            <div className="profile_friends_container">
            {
              this.props.userData[0].friends.map(friend => <UserFriend key={friend.userId}/>)
            }
            </div>
          </div>
        </div>  
      </div>
    );
  }
}

//changed: from export @ class... 
export default Profile;

/**
 * 1) Profile Photo
 *  a) User can update profile
 * 2) serve up active events 
 * 3) Catagories of Interest
 *  a) User can edit/update their catagories
 * 4) visual analytics of past events participated in 
 */
