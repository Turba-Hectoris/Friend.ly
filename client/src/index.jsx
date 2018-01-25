import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'

import Header from './components/Header.js';
import Main from './components/Main.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false
    }
  }

  render () {
    return (
      <div>
        <Header isLogin={this.state.isLogin}/>
        <Main />
      </div>
    );
  }
}

ReactDOM.render((
  <Router>
    <App />
  </Router>
), document.getElementById('app'));

