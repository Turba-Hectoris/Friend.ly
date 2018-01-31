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
            error: null
        };
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
    let username = document.querySelector('#username').value
    let password = document.querySelector('#password').value
    axios.post('/login', {
        username: username,
        password: password
    }).then(() => {console.log('hi')})
  }
  
  onLoginSuccess(method, response) {
    console.log(response)
    console.log('logged successfully with ' + method);
  }

  onLoginFail(method, response) {
    console.log('hi')
    console.log(response)
    console.log('logging failed with ' + method);
    this.setState({
      error: response
    })
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
        <li><Link to="/profile" style={{color: '#ffffff', textDecoration: 'none'}}>Profile</Link></li>
        {' '}
        <li>

        <Link to="/"
          onClick={() => this.openModal()}
        >
          Open Modal
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
                label: 'login'
            },
            loginInputs: [
            {
                id: 'username',
                type: 'text',
                placeholder: 'username'
            },
            {
                id: 'password',
                type: 'text',
                placeholder: 'password'
            } 
            ]
          }}
        /></li>


        {/*<li><Link to="/signup">Signup</Link></li>
        {' '}*/}
        {
          this.props.isLogin? (<li><Link to="/logout" style={{color: '#ffffff', textDecoration: 'none'}}>Logout</Link></li>) 
          : (<li><Link to="/" style={{color: '#ffffff', textDecoration: 'none'}}>Login</Link></li>)
        }    
        </ul>  
        </header>
    )
    }
}
export default Header;