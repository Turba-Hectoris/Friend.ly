import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

class GoogleAuth extends React.Component {
  constructor(props) {
    super(props)
    this.responseGoogle = this.responseGoogle.bind(this)
  }

  responseGoogle(res) {
    let newObj = {
      userID: this.props.userID,
      googleID: res.El,
      token: res.Zi.access_token
    };
    axios.post('/googleAuth', newObj).then((response) => {
      console.log('successfully add token!')
      //maybe turn the authorization button into opaque or smaller after adding token?
    });
  }

  render() {
    return (
      <GoogleLogin
        clientId="122713429777-nbioralfsboud2u8igdcptv3csag3ki2.apps.googleusercontent.com"
        buttonText="Calendar Authorization"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      />
    )
  }
}

export default GoogleAuth;