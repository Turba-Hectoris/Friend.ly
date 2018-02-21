import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import Homepage from './components/Homepage.jsx';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import userProfileDummyData from '../../userProfileDummyData.js';
import {roomsRef} from '../../firebaseConfig.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      userData: '',
      username: ''
    }
    this.toggleLogin = this.toggleLogin.bind(this)
    this.registerServiceWorker = this.registerServiceWorker.bind(this);

  }

  toggleLogin(userID, username) {
    if (!userID) {
      this.setState({
        isLogin:false,
        userData: '',
        username: ''
      })
    } else {
      this.setState({
        isLogin: true,
        userData: userID,
        username: username
      })
    }
  }

  registerServiceWorker() {
    return navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
      return registration;
    })
    .catch((err) => {
      console.error('Unable to register service worker.', err);
    });
  }

  componentWillMount () {
    this.registerServiceWorker();
    axios.get('/checklogin').then((results) => {
      if(results.data.userID) {
        let userID, username;
        ({userID, username} = results.data);
        this.toggleLogin(userID, username);
      } else {
        this.toggleLogin(null, null);
      }
    })
  }

  createNewRoom (roomId) {
    //after create an event, get the eventId as roomId to create a new room
    roomId.messages = [];
    roomsRef.push(roomId);
  }

  deleteRoom (roomId) {
    // when event expired, delete the chatroom as well, if so desired
    roomsRef.child(roomId).remove();
  }

  render () {
    return (
      <div style={{height:'100%'}}>
        <Header isLogin={this.state.isLogin} toggleLogin={this.toggleLogin} userData={this.state.userData}/>
        <Main isLogin={this.state.isLogin} userData={this.state.userData} username={this.state.username}/>
      </div>
    );
  }
}

ReactDOM.render((
  <Router>
    <App />
  </Router>
), document.getElementById('app'));

