import React from 'react';
import UserChart from './UserChart.jsx';
import UserFriend from './UserFriend.jsx';
import UserEvent from './UserEvent.jsx';
import axios from 'axios';

///////////////////////////////////////////////////////////
////////////DUMMY DATA FOR NO INTERNET ACCESS//////////////
import  dummyData from '../../../userProfileDummyData.js';
///////////////////////////////////////////////////////////


class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userDisplayedData: ''
    }
    this.handleFriendClicked = this.handleFriendClicked.bind(this);
    this.getUserDisplayedData = this.getUserDisplayedData.bind(this)
  }
  
  getUserDisplayedData(user_id) {
    axios.get(`/profile/data/${user_id}`)
    .then((results) => {
      this.setState({userDisplayedData: results.data})
    })
  }

  handleFriendClicked(id) {
    getUserDisplayedData(id)
  }

  componentDidMount() {
    this.getUserDisplayedData(this.props.match.params.id)
  }

  render() {
      if(!this.state.userDisplayedData) {
        return(
          <div className="profile_container">
            <img className="profile_loading" src="https://hiretual.com/assets/img/loading.gif" alt=""/>
          </div> 
        ) 
      } else {
      return (
        <div className="profile_container">
          <div className="profile">
            <div className="profile_data">
            {/* catagories={this.props.userDisplayedData.catagories} */}
              {/* <UserChart /> */}
            </div>
            <div className="profile_image">
              <img src="https://images.onlinelabels.com/images/clip-art/dagobert83/dagobert83_female_user_icon.png" alt=""/>
            </div>
            <div className="profile_bio">
              { this.state.userDisplayedData.bio}
              <hr/>
              {
                this.state.userDisplayedData.gender + '\n' +
                this.state.userDisplayedData.email
              }
            </div>
            <div className="profile_username">
              <p> {this.state.userDisplayedData.username} </p>
            </div>
            <div className="profile_events">
              <div className="profile_events_container">
                {
                  Boolean(this.state.userDisplayedData.events.length) && this.state.userDisplayedData.events.map(event => <UserEvent key={event.eventID} event={event}/>)
                }
              </div>
            </div>
            <div className="profile_friends">
              <div className="profile_friends_container">
              {
                Boolean(this.state.userDisplayedData.friends.length) && this.state.userDisplayedData.friends.map(friend => <UserFriend handleFriendClicked={this.handleFriendClicked} key={friend.userID} friend={friend}/>)
              }
              </div>
            </div>
          </div>  
        </div>
      );
    }
  }
}

export default Profile;

