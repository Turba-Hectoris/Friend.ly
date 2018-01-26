import React from 'react';
import $ from 'jquery';

class Homepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      make: 'friends',
      options: ['friends', 'memories', 'connections', 'plans', 'experiences'],
      counter: 1
    }
  }

  componentWillMount() {
    setInterval(() => {
      this.setState({
        make: this.state.options[this.state.counter % 5],
        counter: this.state.counter + 1
      })
    }, 2501)
  }

  componentDidMount() {
    // console.log($('#infoColumns').ltGrid())
    // $('#infoColumns')[0].ltGrid('option', 'params', {lg: {cols: 3}});
  }

  render () {
    return (<div className="homepage"><div className="homepageHero"><span className="carousel">Make </span><span className="carousel makeWhat">{this.state.make}</span></div>
      <div className="homepageContent">
      <br/>
      <div id="infoColumns" className="lt-container lt-xs-h-3 lt-sm-h-3 lt-md-h-3 lt-lg-h-4">
      <div className="column1 lt
            lt-xs-x-0
            lt-xs-y-0
            lt-xs-w-1
            lt-xs-h-1
            lt-sm-x-0
            lt-sm-y-0
            lt-sm-w-1
            lt-sm-h-1
            lt-md-x-0
            lt-md-y-0
            lt-md-w-2.5
            lt-md-h-2
            lt-lg-x-0
            lt-lg-y-0
            lt-lg-w-2
            lt-lg-h-2"><div className="lt-body note">What is this app</div></div>

      <div className="column2 lt
            lt-xs-x-0
            lt-xs-y-0
            lt-xs-w-1
            lt-xs-h-1
            lt-sm-x-0
            lt-sm-y-0
            lt-sm-w-1
            lt-sm-h-1
            lt-md-x-0
            lt-md-y-0
            lt-md-w-1
            lt-md-h-1
            lt-lg-x-2
            lt-lg-y-0
            lt-lg-w-2
            lt-lg-h-2"><div className="lt-body note">What is this app</div></div>   

      <div className="column3 lt
            lt-xs-x-0
            lt-xs-y-0
            lt-xs-w-1
            lt-xs-h-1
            lt-sm-x-0
            lt-sm-y-0
            lt-sm-w-1
            lt-sm-h-1
            lt-md-x-0
            lt-md-y-2
            lt-md-w-1
            lt-md-h-1
            lt-lg-x-0
            lt-lg-y-2
            lt-lg-w-4
            lt-lg-h-2"><div className="lt-body note" id="team">Team Hector</div></div>    

      </div>
      </div>
      </div>)
  }
}

export default Homepage