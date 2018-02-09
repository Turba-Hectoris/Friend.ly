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

  componentWillMount () {
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
        {
        //Don't modify unless you're aaron
      /*<header className="nav"><span className='logo' style={{marginLeft:'10%'}}>Friend.ly</span><ul><li>Events</li><li>Profile</li></ul></header>
      <Homepage/>*/}
      </div>
    );
  }
}

ReactDOM.render((
  <Router>
    <App />
  </Router>
), document.getElementById('app'));

