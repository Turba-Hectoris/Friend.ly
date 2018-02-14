import React from 'react';
import axios from 'axios';
import Dashboard from './Dashboard.jsx';
import 'react-dates/initialize'; 
import { DateRangePicker, DayPickerRangeController } from 'react-dates';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      term: '',
      selectedOption: 'all',
      events: [],
      startDate: null,
      endDate: null,
      focusedInput: null,
      calendarShow: false
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

  componentDidMount() {
    this.getEvents();
  }

  handleOptionChange (e) {  
    e.preventDefault();
    this.setState({selectedOption: e.target.value}, () => {
      if(this.state.selectedOption === 'date') {
        this.setState({calendarShow: true});
      } else {
        this.setState({calendarShow: false});
      }

      if(this.state.selectedOption === 'all') {
        this.getEvents();
      }
    });
  }

  handleTermChange (e) {
    this.setState({term: e.target.value});
  }

  handleSubmit (e) {
    e.preventDefault();
    if(this.state.term.length || this.state.selectedOption === 'date') {
      this.getEvents(() => {
        console.log('in getEvents callback now')
        this.setState({term: '', startDate: null, endDate: null}, () => console.log('in first reset'));
        if(this.state.selectedOption === 'date') {
          this.setState({calendarShow: true}, () => console.log('in calendarshow reset'));
        } 
      });     
    }
  }

  handleKeyPress (e) {
    if(e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  handleSelectChange (e) {
    e.preventDefault();
    if(e.target.value !== 'category') {
      this.setState({term: e.target.value, selectedOption: 'category'}, () => {
        this.handleSubmit();
      })
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

  getEvents (callback) {
    let params;
    if(this.state.selectedOption !== 'date') {
      params = {term: this.state.term, searchBy: this.state.selectedOption};
    } else {
      params = {startDate: this.state.startDate, endDate: this.state.endDate, searchBy: 'date'};
    }
    axios.get('/search/events', {params: params})
    .then((response) => {
      this.setState({events: response.data}, () => {
        this.sortBy();
        if(callback) callback();
      })
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

  render() {
    const show = this.state.calendarShow;
      return (
        <div className="search_container">
          <div className="search">
            <div className="search_bar">
            <span className="search_bar_content">
              <input name="name" value={this.state.term} onChange={(e) => this.handleTermChange(e)} onKeyPress={(e) => this.handleKeyPress(e)} placeholder="category, name, events..."/>
              <button onClick={(e) => this.handleSubmit(e)}>Search</button>
              {/*<form className="search_bar_content_categories">
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
                  <span>Date
                    { show ?
                    <DateRangePicker 
                      startDate={this.state.startDate} 
                      startDateId="your_unique_start_date_id" 
                      endDate={this.state.endDate} 
                      endDateId="your_unique_end_date_id" 
                      onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} 
                      focusedInput={this.state.focusedInput} 
                      onFocusChange={focusedInput => this.setState({ focusedInput })} 
                    /> : null}
                  </span>                 
                </label>
                <label className="search_label">
                  <input type="radio" name="search" value="category" checked={this.state.selectedOption === 'category'} onChange={(e) => this.handleOptionChange(e)} />
                   <span><SelectC handleSelectChange={this.handleSelectChange}/></span>               
                </label>
              </form>*/}
              </span>
            </div>
            <div className="search_events">
              {/*<h4>{this.state.events.length} events</h4>           
              <br/>*/}
              <table className="search_events_results">
              <tbody>
                  <tr>
                  <th>Event</th>
                  <th>Description</th>
                  <th><span id="category" onClick={(e) => this.sortBy(e)}>Category</span></th>
                  <th><span id="startDate" onClick={(e) => this.sortBy(e)}>Start Date</span></th>
                  <th><span id="endDate" onClick={(e) => this.sortBy(e)}>End Date</span></th>
                  <th><span id="creatorName" onClick={(e) => this.sortBy(e)}>Creator</span></th>
                  <th></th>
                  </tr>
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