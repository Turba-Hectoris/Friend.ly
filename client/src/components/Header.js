import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import {Login} from './Login';
import {Search} from './Search';
import {Profile} from './Profile';

export const Header = (props) => (
  <Router>
    <div>
        <span><Link to="/">Home</Link></span>
        {' '}
        <span><Link to="/search">Search</Link></span>
        {' '}
        <span><Link to="/profile">Profile</Link></span>
        {' '}
        {
          props.isLogin? (<span><Link to="/logout">Logout</Link></span>) 
          : (<span><Link to="/login">Login</Link></span>)
        }      

      <hr/>
      <Route path="/" component={Login}/>
      <Route path="/search" component={Search}/>
      <Route path="/profile" component={Profile}/>
    </div>
  </Router>
)