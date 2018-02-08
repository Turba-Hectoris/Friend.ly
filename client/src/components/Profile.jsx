import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import UserChart from './ProfileComponents/UserChart.jsx';
import UserFriend from './ProfileComponents/UserFriend.jsx';
import UserEvent from './ProfileComponents/UserEvent.jsx';
import UserUpdateForm from './ProfileComponents/UserUpdateForm.jsx';
import LoggedUserInfo from './ProfileComponents/LoggedUserInfo.jsx';
import DisplayedUserInfo from './ProfileComponents/DisplayedUserInfo.jsx';




///////////////////////////////////////////////////////////
////////////DUMMY DATA FOR NO INTERNET ACCESS//////////////
import  dummyData from '../../../userProfileDummyData.js';
///////////////////////////////////////////////////////////

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userDisplayedData: dummyData || '',
      edit: false
    }
    this.getUserDisplayedData = this.getUserDisplayedData.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.handleJoinEvent = this.handleJoinEvent.bind(this);
  }
  
  // componentWillReceiveProps(nextProps) {
  //   if(this.props.match.params.id !== nextProps.match.params.id) {
  //     this.getUserDisplayedData(nextProps.match.params.id)
  //   } else {
  //     this.getUserDisplayedData(this.props.match.params.id)
  //   }
  // }

  // componentWillUpdate(nextProps, nextState) {
  //   if(this.state.edit === true && String(nextState.edit) === 'false') {
      
  //     let queryString = $('#profile_form').serialize().replace('%20', '');
      
  //     axios.post(`/profile_update?${queryString}`, {userID: this.props.loggedInUserID})
  //     .then(() => { 
  //       this.getUserDisplayedData(this.props.loggedInUserID)
  //      })
  //   }
  // }


  // componentDidMount() {
  //   this.getUserDisplayedData(this.props.match.params.id)    
  // }

  getUserDisplayedData(user_id) {
    axios.get(`/profile/data/${user_id}`)
    .then((results) => {
      this.setState({userDisplayedData: results.data})
    })
  }

  handleEditClick(e) {
    e.preventDefault()
    this.setState({edit: !this.state.edit})
  }

  handleAddFriend(friendID) {
    axios.post('/friendship_update', {userID: this.props.loggedInUserID,friendID})
    .then((response) => {

    })
    .catch(err => console.log(err));
  }

  handleJoinEvent(eventID) {
    axios.post('/event_attendance_update', {userID: this.props.loggedInUserID, eventID})
    .then((response) => {

    })
    .catch(err => console.log(err));
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
              {/* <UserChart catagories={this.state.userDisplayedData.catagories}/> */}
            </div>
            {
              this.props.match.params.id === this.props.loggedInUserID ? <LoggedInUserInfo userDisplayedData={this.state.userDisplayedData}/> : <DisplayedUserInfo userDisplayedData={this.state.userDisplayedData}/>
            }
            {/* <div className="profile_image">
            {
              this.state.edit ? <ImageEditIcon loggedInUserID={this.props.loggedInUserID}/> : <img src={`http://res.cloudinary.com/${cloudinary_cloud_name}/image/upload/v1517679389/${this.state.userDisplayedData.userID}.jpg`} />
            }
            </div>
            {
            this.state.edit ? <UserUpdateForm loggedInUserID={this.state.userDisplayedData}/>
            :
              <div className="profile_info_container">
                <div className="profile_bio">
                  <p>
                    { 
                      this.state.userDisplayedData.bio
                    }
                  </p>
                  <hr/>
                  <p>
                    {
                      `${this.state.userDisplayedData.gender}${'\n'}${this.state.userDisplayedData.email}`
                    }
                  </p>
                </div>
                <div className="profile_username">
                  <p> {this.state.userDisplayedData.username} </p>
                </div>
              </div>
            }
            <div className="profile_edit_button">
              <button onClick={this.handleEditClick} > {this.state.edit ? "Save" : "Edit Profile"} </button>
            </div> */}
            <div className="profile_events">
              <div className="profile_events_container">
                {
                  // !!this.state.userDisplayedData.events.length && this.state.userDisplayedData.events.map(event => <UserEvent key={event.eventID} event={event} handleJoinEvent={this.handleJoinEvent}/>)
                }
              </div>
            </div>
            <div className="profile_friends">
              <div className="profile_friends_container">
                {
                  // !!this.state.userDisplayedData.friends.length && this.state.userDisplayedData.friends.map(friend => <UserFriend  getUserDisplayedData={this.getUserDisplayedData} key={friend.userID} friend={friend} handleAddFriend={this.handleAddFriend} />)
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

