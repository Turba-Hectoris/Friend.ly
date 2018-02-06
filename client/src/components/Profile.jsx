import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { UserChart, UserFriend, UserEvent, ImageEditIcon, UserUpdateForm } from './ProfileComponents/components.jsx';
import { cloudinary_API, cloudinary_SECRET, cloudinary_cloud_name, cloudinary_cloud_upload_presets } from '../../../config.js';
import cloudinary from 'cloudinary-core';
///////////////////////////////////////////////////////////
////////////DUMMY DATA FOR NO INTERNET ACCESS//////////////
import  dummyData from '../../../userProfileDummyData.js';
///////////////////////////////////////////////////////////

const cloudinaryCore = new cloudinary.Cloudinary({
    cloud_name: cloudinary_cloud_name,
    api_key: cloudinary_API,
    api_secret: cloudinary_SECRET,
    upload_preset: cloudinary_cloud_upload_presets,
});


class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userDisplayedData: '',
      edit: false
    }
    this.getUserDisplayedData = this.getUserDisplayedData.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.id !== nextProps.match.params.id) {
      this.getUserDisplayedData(nextProps.match.params.id)
    } else {
      this.getUserDisplayedData(this.props.match.params.id)
    }
  }

  componentDidMount() {
    this.getUserDisplayedData(this.props.match.params.id)    
  }

  getUserDisplayedData(user_id) {
    axios.get(`/profile/data/${user_id}`)
    .then((results) => {
      this.setState({userDisplayedData: results.data})
    })
  }

  handleEditClick() {
    this.setState({edit: !this.state.edit})
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
            {
              this.state.edit ? <ImageEditIcon loggedInUserID={this.props.loggedInUserID}/> : <img src={`http://res.cloudinary.com/${cloudinary_cloud_name}/image/upload/v1517679389/${this.state.userDisplayedData.userID}.jpg`} />
            }
            </div>
            {
            this.state.edit ? <UserUpdateForm />
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

