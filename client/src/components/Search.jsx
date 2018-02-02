import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      events: [{eventName: 'hiking',
                date: '02-14-2018',
                description: 'Anyone want to go hiking around that weekend in tristates?',
                creator: 'jackie'}, 

                {eventName: 'BBQ',
                 date: '03-18-2018',
                description: 'Advanced JS coding in downtown Manhattan',
                creator: 'Aaron'}]
    }
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getEvents = this.getEvents.bind(this);
  }

  handleTermChange (e) {
    this.setState({term: e.target.value});
  }

  handleSubmit () {
    if(this.state.term.length) {
      this.getEvents();
      this.setState({term: ''});
    }
  }

  handleKeyPress (e) {
    if(e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  getEvents () {
    axios.get('/events', {params: {term: this.state.term}})
    .then((response) => {
      console.log('response data from getEvents: ', response.data);
      this.setState({events: response.data});
    })
  }

  render() {
    return (
      <div className="search_container">
        <div className="search">
          <div className="search_bar">
            <input value={this.state.term} onChange={(e) => this.handleTermChange(e)} onKeyPress={(e) => this.handleKeyPress(e)} placeholder="what do you want to do"/>
            <button onClick={this.handleSubmit}>Search</button>
          </div>
          <div className="search_events">
            <h4>Search result: {this.state.events.length} found</h4>
            <br/>
            <table>
              <tbody>
                <tr><td>Event</td><td>Date</td><td>Description</td><td>Creator</td></tr>
                  {this.state.events.map((event, index) => <ListItem key={index} event={event} />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const ListItem = (props) => (
  <tr>
    <td>{props.event.eventName}</td>
    <td>{props.event.date}</td>
    <td>{props.event.description}</td>
    <td>{props.event.creator}</td>
  </tr>
)

export default Search