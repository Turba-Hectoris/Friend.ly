import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Search from './Search';
import Profile from './Profile';

const Main = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/search" component={Search}/>
      <Route path="/profile" component={Profile}/>
    </Switch>
  </div>
)

export default Main