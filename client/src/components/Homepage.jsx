import React from 'react';
import $ from 'jquery';
class Homepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      make: 'friends',
      options: ['friends', 'memories  ', 'connections', 'plans      ', 'experiences'],
      counter: Math.floor(Math.random()*6)
    }
  }
  componentDidMount() {
    var interval = setInterval(() => {
      this.setState({
        make: this.state.options[this.state.counter % 5],
        counter: this.state.counter + 1
      })
      $('.makeWhat').text(this.state.make)
    }, 2000)
  }

  render () {
    return (<div className="homepage"><div className="homepageHero"><span className="carousel">Make </span><span className="carousel makeWhat">friends</span></div>
      <div className="homepageContent">
      <br/><br/>
      <div className="container">
        <div className="item"><h1>Create groups</h1><p>Organize a group for your next hangout at the click of a button</p><img style={{objectFit:'contain'}} src="https://placeit.net/uploads/stage/stage_image/11392/default_watermarked_17152base.png"/></div>
        <div className="item"><h1>Join events</h1><p>View what people around you are doing and join them</p><img style={{objectFit:'contain'}} src="https://placeit.net/uploads/stage/stage_image/11392/default_watermarked_17152base.png"/></div>
        <div className="item"><h1>Make new friends</h1><p>A new way to social network<br/>No more missed dates or dropped plans</p><img style={{objectFit:'contain'}} src="https://placeit.net/uploads/stage/stage_image/11392/default_watermarked_17152base.png"/></div>
      </div>
      </div>
      <div className="homepageHeroSecondary"><span className="carouselSecondary">What we do</span></div>
      </div>)
  }
}

export default Homepage