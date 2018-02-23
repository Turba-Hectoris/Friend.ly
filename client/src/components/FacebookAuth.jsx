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
      picture: res.picture.data.url,
      gender: res.gender,
      link: res.link 
    }
    axios.post('/facebookLogin', newObj).then((response) => {
    	let userID, username
    	({userID, username} = response.data)
      this.props.toggleLogin(userID, username)    
    })
  }

  render() {
    return (
      <FacebookLogin
        appId="574210012929596"
        autoLoad={false}
        fields="name,email,picture,website,gender,verified,link,locale"
        scope="public_profile,user_friends"
        callback={this.responseFacebook}
        size='small'
        version='v2.3'
        xfbml='true'
        style={{color: '#4c69ba', textDecoration: 'none', fontFamily: 'inherit'}}
      />
    )
  }
}

export default FacebookAuth;