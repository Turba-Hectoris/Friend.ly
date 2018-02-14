import React from 'react';
import axios from 'axios';
import 'react-dates/initialize'; 
import { DateRangePicker, DayPickerRangeController } from 'react-dates';
import {
    Form,
    StyledText,
    StyledTextArea,
    StyledRadio,
    StyledRadioGroup,
    StyledSelect,
    StyledCheckbox
  } from 'react-form';
import CreateMap from './CreateMap.jsx';

    let categories = [ //Categories that the user can choose when creating an event
      {
        label: 'Movies',
        value: 'movies'
      },
      {
        label: 'Outdoors',
        value: 'outdoors'
      },
      {
        label: 'Food/Dining',
        value: 'food'
      },
      {
        label: 'Live Music',
        value: 'music'
      },
      {
        label: 'Exercise',
        value: 'exercise'
      },
      {
        label: 'Gaming',
        value: 'gaming'
      },
      {
        label: 'Drinks',
        value: 'drinks'
      },
      {
        label: 'Arts & Culture',
        value: 'arts'
      }
    ]

  let capacity = [
    {
      label: '2',
      value: '2'
    },
    {
      label: '3',
      value: '3'
    },
    {
      label: '4',
      value: '4'
    },
    {
      label: '5',
      value: '5'
    },
    {
      label: '6',
      value: '6'
    }
  ]

class CreateEvent extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      submittedValues: {},
      locale: '',
      location: ''
    }
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.setLocale = this.setLocale.bind(this);
  }

  handleLocationChange (location) {
    this.setState({
      location: location
    });
  }

  setLocale(locale) {
    this.setState({
      locale: locale
    })
  }

  render() {
    return(
      <div className="event_container">
        <div className="event_create">
          <Form
            onSubmit={submittedValues => this.setState({submittedValues: submittedValues}, () => {
              // console.log('locale in submit: ', this.state.locale, ' location in submit: ', this.state.location)
              axios.post('/createEvent', {
              eventName: this.state.submittedValues.eventName,
              eventDesc: this.state.submittedValues.eventDesc,
              capacity: this.state.submittedValues.capacity,
              category: this.state.submittedValues.category,
              creatorID: this.props.userID,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              locationName: this.state.locale,
              locationGeo: this.state.location
              })})
            .then((response) => {console.log('hi')})}>
            { formApi => (
              <form onSubmit={formApi.submitForm} id="form2">
                <label htmlFor="eventName">Event name</label>
                <StyledText field="eventName" id="eventName" />
                <label htmlFor="eventDesc">Event description</label>
                <StyledTextArea field="eventDesc" id="eventDesc" />
                <label>How many people?</label>
                <StyledSelect field="capacity" id="capacity" options={capacity} />
                <label htmlFor="category" className="d-block">Event category</label>
                <StyledSelect field="category" id="category" options={categories} />
                <StyledCheckbox field="authorize" id="authorize" label="Authorize" className="d-inline-block" />
                <DateRangePicker
                  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                  onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                  onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />
                <br/>
                <button type="submit" className="mb-4 btn btn-primary">Submit</button>
              </form>
            )}
          </Form>
          <CreateMap getEventCoordinate={this.handleLocationChange} setLocale={this.setLocale}/>
        </div>
      </div>
      )
  }
}

export default CreateEvent