import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Search from './Search.jsx';
import Profile from './Profile.jsx';
import Homepage from './Homepage.jsx';
import Dashboard from './Dashboard.jsx';

const Main = (props) => (
  <div style={{height:'100%'}}>
    <Switch>
      <Route exact path="/" render={() => {
        return props.isLogin? <Dashboard /> 
        : <Homepage />
        }
      }/>
      <Route path="/signup" component={Signup}/>
      <Route path="/search" component={Search}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/login" component={Login}/>
    </Switch>
  </div>
)

export default Main