import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'

import {Header} from './components/Header';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: 'false'
    }
  }

  render () {
    return (
      <div>
        <Header isLogin={this.state.isLogin}/>
      </div>  
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));