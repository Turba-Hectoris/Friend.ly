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
    this.sortBy = this.sortBy.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleOptionChange (e) {  
    this.setState({selectedOption: e.target.value}, () => {
      if(this.state.selectedOption === 'all') {
        this.getEvents();
      }
    });
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
    axios.get('/search/events', {params: {term: this.state.term, searchBy: this.state.selectedOption}})
    .then((response) => {
      this.setState({events: response.data}, () => this.sortBy())
    })
  }

  reformatDate (str) {
    const date = new Date(str);
    return (date.getMonth()+1) + '-' + date.getDate() + '-' + date.getFullYear() ;
  }

  sortBy (e) {
    const events = this.state.events;
    const key = e? e.target.id : 'startDate';
    events.sort((a, b) => {
      return (a[key] > b[key])? 1 : (a[key] < b[key])? -1 : 0;
    });
    this.setState({events: events});
  }

  handleSelectChange (e) {
    e.preventDefault();
    if(e.target.value !== 'category') {
      this.setState({term: e.target.value, selectedOption: 'category'}, () => {
        this.handleSubmit();
      })
    }
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
                  <input type="radio" name="search" value="all" checked={this.state.selectedOption === 'all'} onChange={(e) => this.handleOptionChange(e)} />
                  All                
                </label>
                <label className="search_label">
                  <input type="radio" name="search" value="name"  checked={this.state.selectedOption === 'name'} onChange={(e) => this.handleOptionChange(e)} />
                  Name                 
                </label>       
                <label className="search_label">
                  <input type="radio" name="search" value="date" checked={this.state.selectedOption === 'date'} onChange={(e) => this.handleOptionChange(e)} />
                  Date                 
                </label>
                <label className="search_label">
                  <input type="radio" name="search" value="category" checked={this.state.selectedOption === 'category'} onChange={(e) => this.handleOptionChange(e)} />
                   <span><SelectC handleSelectChange={this.handleSelectChange}/></span>               
                </label>
              </form>
            </div>
            <div className="search_events">
              <h4>Search result: {this.state.events.length} found</h4>
              <br/>
              <table>
                <tbody>
                  <tr><td>Event</td>
                  <td>Description</td>
                  <td><span id="category" onClick={(e) => this.sortBy(e)}>Category</span></td>
                  <td><span id="startDate" onClick={(e) => this.sortBy(e)}>Start Date</span></td>
                  <td><span id="endDate" onClick={(e) => this.sortBy(e)}>End Date</span></td>
                  <td><span id="creatorName" onClick={(e) => this.sortBy(e)}>Creator</span></td>
                  <td>Join</td></tr>
                    {this.state.events.map((event, index) => <ListItem key={index} event={event} handleEventJoin={this.handleEventJoin} reformatDate={this.reformatDate}/>)}
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
    <td>{props.event.eventDesc}</td>
    <td>{props.event.category}</td>
    <td>{props.reformatDate(props.event.startDate)}</td>
    <td>{props.reformatDate(props.event.endDate)}</td>
    <td>{props.event.creatorName}</td>
    <td><button onClick={() => props.handleEventJoin(props.event)}>Join</button></td>
  </tr>
)

const SelectC = (props) => (
  <select onChange={(e) => props.handleSelectChange(e)}>
  <option value="category">Category</option>
  <option value="movies">Movies</option>
  <option value="outdoors">Outdoors</option>
  <option value="food">Food/Dining</option>
  <option value="music">Live Music</option>
  <option value="exercise">Exercise</option>
  <option value="gaming">Gaming</option>
  <option value="drinks">Drinks</option>
  <option value="arts">Arts & Culture</option>
</select>
)

export default Search