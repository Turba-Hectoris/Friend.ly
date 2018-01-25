import React from 'react';
import {Link} from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Search from './Search';
import Profile from './Profile';

const Header = (props) => (
    <div>
        <span><Link to="/">Home</Link></span>
        {' '}
        <span><Link to="/search">Search</Link></span>
        {' '}
        <span><Link to="/profile">Profile</Link></span>
        {' '}
        <span><Link to="/signup">Signup</Link></span>
        {' '}
        {
          props.isLogin? (<span><Link to="/logout">Logout</Link></span>) 
          : (<span><Link to="/">Login</Link></span>)
        }      
    </div>
)

export default Header;