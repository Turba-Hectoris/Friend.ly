import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Homepage from './Homepage.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Search from './Search.jsx';
import Profile from './Profile.jsx';

const Main = () => (
    <Switch>
      <Route exact path="/" component={Homepage}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/search" component={Search}/>
      <Route path="/profile" component={Profile}/>
    </Switch>
)

export default Main