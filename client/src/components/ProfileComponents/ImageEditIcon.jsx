import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import FormData from 'form-data';

export class ImageEditIcon extends React.Component {
	constructor(props) {
    super(props)
    this.handleDrop.bind(this);
	}
    // get's called from react dropzone when file is dropped
    handleDrop (files){
      // Push all the axios request promise into a single array
      const image = files[0];
      
      // console.log(image)
      // Initial FormData
      const formData = new FormData();
      formData.append("file", image);
      formData.append("userID", this.props.loggedInUserID);
      // formData.append('public_id', `${this.props.loggedInUserID}`);
      // formData.append("tags", `Friend.ly, profile picture`);
      // formData.append("upload_preset", cloudinary_cloud_upload_presets); // Replace the preset name with your own
      // formData.append("api_key", cloudinary_API); // Replace API key with your own Cloudinary key
      // formData.append("timestamp", (Date.now() / 1000) | 0);
      
      // // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      axios.post('/profile_update', formData)
    }
	render() {
		return (
      <Dropzone 
        loggedInUserID={this.props.loggedInUserID}
        onDrop={this.handleDrop}
        style={{gridColumn: "1 / 2", gridRow: "1 / 2"}} 
      >
        <img style={{width: "100%", height: "auto"}} src="http://www.iconninja.com/files/9/26/395/instagram-insta-photo-social-media-camera-icon.svg" alt=""/>
      </Dropzone >
		)
	}
}