import React from 'react';
import axios from 'axios';
import Dashboard from './Dashboard.jsx';

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
    this.handleEventJoin = this.handleEventJoin.bind(this);
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

  handleEventJoin (event) {
    const eventID = event.eventID;
    console.log('event in handler: ', event)
    const creatorID = event.creatorID;
    const userID = this.props.userID;

    if(this.props.isLogin) {
      if(userID === creatorID) {window.alert('You\'ve already been in this event as a creator')} 
      else {
        axios.get('/userevents', {params: {eventID, userID}})
        .then(response => {
          console.log('response for get', response)
          if(response.data) {
            window.alert('You\'ve already been in this event');
          } else {
            axios.post('/userevents/add', {userID, eventID}).then((response) => {
              console.log('event added to user ', response.data);
              // this.setState({redirect: true});
              console.log('history is: ', this.props.history);
               this.props.history.push('/');
            })
          }
        })
      }
    }
  }

  getEvents () {
    axios.get('/search/events', {params: {term: this.state.term}})
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
                  <tr><td>Event</td><td>Date</td><td>Description</td><td>Creator</td><td>Join</td></tr>
                    {this.state.events.map((activity, index) => <ListItem key={index} event={activity} handleEventJoin={this.handleEventJoin}/>)}
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
    <td>{props.event.eventID}</td>
    <td>{props.event.date}</td>
    <td>{props.event.description}</td>
    <td>{props.event.creator}</td>
    <td><button onClick={() => props.handleEventJoin(props.event)}>Join</button></td>
  </tr>
)

export default Search