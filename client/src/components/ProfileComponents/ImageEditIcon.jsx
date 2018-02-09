import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import FormData from 'form-data';

export class ImageEditIcon extends React.Component {
	constructor(props) {
    super(props)
    this.handleDrop.bind(this);
  }
  
  handleDrop (files){
    const image = files[0];
    const url = '/profile_update';
    //module to populate forms {replaces form HTML}
    const formData = new FormData();
    //file is a attr on form element, and second parameter is it's value
    formData.append('file', image)

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    return axios.post(url, formData, config, { userID: props.loggedInUserID })
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

export default ImageEditIcon;