import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
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
      <Route path="/search" render={ ({ match, history }) => <Search match={match} history={history} isLogin={props.isLogin} userID={props.userData} username={props.username}/> }/>
      <Route path="/createEvent" render={ ({ match }) => <CreateEvent userID={props.userData} match={match}/> }/>
      <Route path="/profile/:id" render={ ({ match }) => <Profile match={match} loggedInUserID={props.userData.userID}/> }/>
    </Switch>
  </div>
)

export default Main