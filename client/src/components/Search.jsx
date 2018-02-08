import React from 'react';
import axios from 'axios';
import Dashboard from './Dashboard.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      selectedOption: 'name',
      events: []
    }
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.handleEventJoin = this.handleEventJoin.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange (e) {  
    this.setState({selectedOption: e.target.value}, () => console.log('searchBy ', this.state.selectedOption));
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
    console.log('event click to join: ', event)
    const eventID = event.eventID;
    const creatorID = event.creatorID;
    const userID = this.props.userID;

    if(this.props.isLogin) {
      if(userID === creatorID) {
        window.alert('You\'ve already been in this event as a creator')
      } 
      else {
        axios.get('/search/userevents', {params: {eventID, userID}})
        .then(response => {
          if(response.data) {
            window.alert('You\'ve already been in this event');
          } else {
            axios.post('/search/userevents/add', {userID, eventID}).then((response) => {
              this.props.history.push('/');
            })
          }
        })
      }
    } else {
      window.alert('Please log in');
    }
  }

  getEvents () {
    axios.get('/search/events', {params: {term: this.state.term, searchBy: this.state.searchBy}})
    .then((response) => {
      this.setState({events: response.data});
    })
  }

  render() {
      return (
        <div className="search_container">
          <div className="search">
            <div className="search_bar">
              <input name="name" value={this.state.term} onChange={(e) => this.handleTermChange(e)} onKeyPress={(e) => this.handleKeyPress(e)} placeholder="what do you want to do"/>
              <button onClick={this.handleSubmit}>Search</button>

              <form>
                <label className="search_label">
                  <input type="radio" name="search" value="name"  checked={this.state.selectedOption === 'name'} onChange={(e) => this.handleOptionChange(e)} />
                  Name                 
                </label>
                <label className="search_label">
                  <input type="radio" name="search" value="category" checked={this.state.selectedOption === 'category'} onChange={(e) => this.handleOptionChange(e)} />
                  Category                 
                </label>       
                <label className="search_label">
                  <input type="radio" name="search" value="date" checked={this.state.selectedOption === 'date'} onChange={(e) => this.handleOptionChange(e)} />
                  Date                 
                </label>
                <label className="search_label">
                  <input type="radio" name="search" value="all" checked={this.state.selectedOption === 'all'} onChange={(e) => this.handleOptionChange(e)} />
                  All                 
                </label>
            </form>
            </div>
            <div className="search_events">
              <h4>Search result: {this.state.events.length} found</h4>
              <br/>
              <table>
                <tbody>
                  <tr><td>Event</td><td>Date</td><td>Description</td><td>Creator</td><td>Join</td></tr>
                    {this.state.events.map((event, index) => <ListItem key={index} event={event} handleEventJoin={this.handleEventJoin}/>)}
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
    <td><button onClick={() => props.handleEventJoin(props.event)}>Join</button></td>
  </tr>
)

export default Search