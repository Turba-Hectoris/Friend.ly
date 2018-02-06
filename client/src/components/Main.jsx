import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Search from './Search.jsx';
import Profile from './Profile.jsx';
import Homepage from './Homepage.jsx';
import Dashboard from './Dashboard.jsx';
import CreateEvent from './CreateEvent.jsx';

const Main = (props) => (
  <div style={{height:'100%'}}>
    <Switch>
      <Route exact path="/" render={() => {
        return props.isLogin? <Dashboard userData={props.userData} username={props.username}/> 
        : <Homepage />
        }
      }/>
      <Route path="/search" render={ ({ match }) => <Search match={match}/> }/>
      <Route path="/createEvent" render={ ({ match }) => <CreateEvent userID={props.userData} match={match}/> }/>
      <Route path="/profile/:id" render={ ({ match }) => <Profile match={match} loggedInUser={{username: props.username, userID: props.userData}}/> }/>
    </Switch>
  </div>
)

export default Main