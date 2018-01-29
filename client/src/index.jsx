import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Homepage from './components/Homepage.jsx';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: true,
    }
  }

  componentWillMount () {
    this.connectFirebase()
  }

  connectFirebase () {
    // axios.get('/firebaseConfig').then((response) => {
    //   firebase.initializeApp(response.data);
    // })
    firebase.initializeApp({
    apiKey: "AIzaSyBMGuFn8bHzGvsh86e9gKaAN1-RGF15wko",
    authDomain: "friendly-af05e.firebaseapp.com",
    databaseURL: "https://friendly-af05e.firebaseio.com",
    projectId: "friendly-af05e",
    storageBucket: "friendly-af05e.appspot.com",
    messagingSenderId: "122713429777"
  });
  }

  render () {
    return (
      <div style={{height:'100%'}}>
        <Header isLogin={this.state.isLogin}/>
        <Main isLogin={this.state.isLogin} />
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

