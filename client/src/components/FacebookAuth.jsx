import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

class FacebookAuth extends React.Component {
	    constructor(props) {
        super(props)
        this.responseFacebook = this.responseFacebook.bind(this)
	}

  	responseFacebook(res) {
  	let newObj = {
  		username: res.name,
  		email: res.email,
  		id: res.id,
  		picture: res.picture.data.url
  	}
    axios.post('/facebookLogin', newObj).then((response) => {
    	let userID, username
    	({userID, username} = response.data)
      //this was passing a single object before refactor
      this.props.toggleLogin(userID, username)    

    })
  }

  render() {
    return (
      <FacebookLogin
        appId="574210012929596"
        autoLoad={false}
        fields="name,email,picture"
        callback={this.responseFacebook}
      />
    )
  }
}

export default FacebookAuth;