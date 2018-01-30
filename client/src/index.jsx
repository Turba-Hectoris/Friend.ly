import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import $ from 'jquery';

import Homepage from './components/Homepage.jsx';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import userProfileDummyData from '../../userProfileDummyData.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: true,
      userData: userProfileDummyData
    }
    this.toggleLogin = this.toggleLogin.bind(this)
  }
  toggleLogin () {
    this.setState({
      isLogin: !this.state.isLogin
    })
  }

  componentDidMount() {
    if(this.state.isLogin) {
      axios.get('/userData').then((results) => {

      })
    }
  }

  componentWillMount () {
    this.connectFirebase()
  }

  connectFirebase () {
    const config = {
      apiKey: "AIzaSyBMGuFn8bHzGvsh86e9gKaAN1-RGF15wko",
      authDomain: "friendly-af05e.firebaseapp.com",
      databaseURL: "https://friendly-af05e.firebaseio.com",
      projectId: "friendly-af05e",
      storageBucket: "friendly-af05e.appspot.com",
      messagingSenderId: "122713429777"
    };
    firebase.initializeApp(config);
  }

  createNewRoom (roomId) {
    //after create an event, get the eventId as roomId to create a new room
    let dbConnection = firebase.database().ref('/rooms');
    roomId.messages = [];
    dbConnection.push(roomId);
  }

  deleteRoom (roomId) {
    // when event expired, delete the chatroom as well, if so desired
    firebase.database().ref('/rooms/' + roomId).remove();
  }

  render () {
    return (
      <div style={{height:'100%'}}>
        <Header isLogin={this.state.isLogin} toggleLogin={this.toggleLogin}/>
        <Main isLogin={this.state.isLogin} userData={this.state.userData}/>
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

