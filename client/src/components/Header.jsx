import React from 'react';
import {Link} from 'react-router-dom';
import ReactModalLogin from 'react-modal-login';
import axios from 'axios';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            loading: false,
            error: null,
            redirect: false,

        };
        this.closeModal = this.closeModal.bind(this)
    } 

  openModal() {
    this.setState({
      showModal: true,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
      error: null
    });
  }

  onLogin() {
    let username = document.querySelector('#loginUsername').value
    let password = document.querySelector('#loginPassword').value
    axios.post('/login', {
        username: username,
        password: password
    }).then((response) => {
        if (response.data) {
          console.log(response.data.userID)
          this.closeModal()
          this.props.toggleLogin(response.data.userID, response.data.username)
        } else {
          console.log('bad login')    
        }
        // location.replace(location.href + 'profile')})
    })}
  
  onLoginSuccess(method, response) {
    console.log(response)
    console.log('logged successfully with ' + method);
  }

  onLoginFail(method, response) {
    console.log('logging failed with ' + method);
    this.setState({
      error: response
    })
  }

  onRegister() {
    let email = document.querySelector('#registerEmail').value
    let username = document.querySelector('#registerUsername').value
    let password = document.querySelector('#registerPassword').value
    axios.post('/signup', {
        email: email,
        username: username,
        password: password
    }).then((response) => {console.log(history)})
  }

  startLoading() {
    this.setState({
      loading: true
    })
  }

  finishLoading() {
    this.setState({
      loading: false
    })
  }

  onTabsChange() {
    this.setState({
      error: null
    });
  }


    render() {
        return (
    <header className="nav">
    {/* //////
    ///////Removed inline styling here cause it overwrites mobile veiw styling
    //////Derrick */}
        <span className="logo" ><Link to="/" style={{color: '#ffffff', textDecoration: 'none'}}>Friend.ly</Link></span>
        {' '}
        <ul id="nav">
        <li><Link to="/search" style={{color: '#ffffff', textDecoration: 'none'}}>Search</Link></li>
        {' '}
        <li><Link to="/profile/1" style={{color: '#ffffff', textDecoration: 'none'}}>Profile</Link></li>
        {' '}
        <li>

        <Link to="/" style={{color: '#ffffff', textDecoration: 'none'}}
          onClick={() => this.openModal()}
        >
        {/*DELETED EXTRA LOGIN HERE*/}
          login
        </Link>

        <ReactModalLogin
          visible={this.state.showModal}
          onCloseModal={this.closeModal.bind(this)}
          loading={this.state.loading}
          error={this.state.error}
          tabs={{
            onChange: this.onTabsChange.bind(this)
          }}
          loginError={{
            label: "Couldn't sign in, please try again."
          }}
          registerError={{
            label: "Couldn't sign up, please try again."
          }}
          startLoading={this.startLoading.bind(this)}
          finishLoading={this.finishLoading.bind(this)}
          form = {{
            onLogin: this.onLogin.bind(this),
            loginBtn: {
                label: 'Login'
            },
            loginInputs: [
            {
                id: 'loginUsername',
                type: 'text',
                placeholder: 'username'
            },
            {
                id: 'loginPassword',
                type: 'password',
                placeholder: 'password'
            } 
            ],
            onRegister: this.onRegister.bind(this),
            registerBtn: {
                label: 'Register'
            },
            registerInputs: [
            {
                id: 'registerEmail',
                type: 'text',
                placeholder: 'email'
            },
            {
                id: 'registerUsername',
                type: 'text',
                placeholder: 'username'
            },
            {
                id: 'registerPassword',
                type: 'password',
                placeholder: 'password'
            }
            ]
          }}
        /></li>

        
        {/*<li><Link to="/signup">Signup</Link></li>
        {' '}*/}
        {/* 
        //////////////////////////////////
        //We don't need dis anymor brada//
        //////////////////////////////////
          {
            this.props.isLogin? (<li><Link to="/logout" style={{color: '#ffffff', textDecoration: 'none'}}>Logout</Link></li>) 
            : (<li><Link to="/" style={{color: '#ffffff', textDecoration: 'none'}}>Login</Link></li>)
          }     
        */}
        </ul>  
        </header>
    )
    }
}
export default Header;