import React from 'react';
import {Link} from 'react-router-dom';


const Header = (props) => (
    <header className="nav">
        <span className="logo" style={{marginLeft:'10%'}}><Link to="/" style={{color: '#ffffff', textDecoration: 'none'}}>Friend.ly</Link></span>
        {' '}
        <ul>
        <li><Link to="/search" style={{color: '#ffffff', textDecoration: 'none'}}>Search</Link></li>
        {' '}
        <li><Link to="/profile" style={{color: '#ffffff', textDecoration: 'none'}}>Profile</Link></li>
        {' '}
        {/*<li><Link to="/signup">Signup</Link></li>
        {' '}*/}
        {
          props.isLogin? (<li><Link to="/logout" style={{color: '#ffffff', textDecoration: 'none'}}>Logout</Link></li>) 
          : (<li><Link to="/" style={{color: '#ffffff', textDecoration: 'none'}}>Login</Link></li>)
        }    
        </ul>  
    </header>
)

export default Header;