import React from 'react';
import axios from 'axios';
import { UserChart, UserFriend, UserEvent, ImageEditIcon } from './ProfileComponents/components.jsx';

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
    this.getUserDisplayedData = this.getUserDisplayedData.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.id !== nextProps.match.params.id) {
      this.getUserDisplayedData(nextProps.match.params.id)
    } else {
      this.getUserDisplayedData(this.props.match.params.id)
    }
  }

  getUserDisplayedData(user_id) {
    axios.get(`/profile/data/${user_id}`)
    .then((results) => {
      this.setState({userDisplayedData: results.data})
    })
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
              <UserChart catagories={this.state.userDisplayedData.catagories}/>
            </div>
            <div className="profile_image">
                <img src="https://images.onlinelabels.com/images/clip-art/dagobert83/dagobert83_female_user_icon.png" alt=""/>
            </div>
              {/* <ImageEditIcon /> */}
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
                  !!this.state.userDisplayedData.events.length && this.state.userDisplayedData.events.map(event => <UserEvent key={event.eventID} event={event}/>)
                }
              </div>
            </div>
            <div className="profile_friends">
              <div className="profile_friends_container">
                {
                  !!this.state.userDisplayedData.friends.length && this.state.userDisplayedData.friends.map(friend => <UserFriend  getUserDisplayedData={this.getUserDisplayedData} key={friend.userID} friend={friend}/>)
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

