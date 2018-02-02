import React from 'react';
import axios from 'axios';
import {
    Form,
    StyledText,
    StyledTextArea,
    StyledRadio,
    StyledRadioGroup,
    StyledSelect,
    StyledCheckbox
  } from 'react-form';

    let categories = [
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
  		label: '1',
  		value: '1'
  	},
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
  	}
  ]

class CreateEvent extends React.Component{
	constructor(props) {
    super(props)
    this.state = {
      submittedValues: {}
    }
  }

  componentDidMount() {
    console.log(this.props)
  }

    // errorValidator( values ){
    //   const validateEventName = ( eventName ) => {
    //     return !eventName ? 'Please name your event' : null;
    //   };
    //   const validateEventDesc = ( eventDesc ) => {
    //     return !eventDesc ? 'Event description required.' : null;
    //   };
    //   const validateGender = ( gender ) => {
    //     return !gender ? 'Gender is required.' : null;
    //   };
    //   const validateBio = ( bio ) => {
    //     return !bio ? 'Bio is required.' : null;
    //   };
    //   const validateAuthorize = ( authorize ) => {
    //     return !authorize ? 'Please check authorize.' : null;
    //   };
    //   const validateStatus = ( category ) => {
    //     return !category ? 'Please choose an event category.' : null;
    //   };
    //   return {
    //     eventName: validateEventName( values.eventName ),
    //     eventDesc: validateEventDesc( values.eventDesc ),
    //     gender: validateGender( values.gender ),
    //     bio: validateBio( values.bio ),
    //     authorize: validateAuthorize( values.authorize ),
    //     category: validateStatus( values.category )
    //   };
    // }

    // warningValidator( values ) {
    //   const validateEventName = ( eventName ) => {
    //     return eventName && eventName.length < 2 ? 'Event name must be longer than 2 characters.' : null;
    //   };
    //   const validateEventDesc = ( eventDesc ) => {
    //     return eventDesc && eventDesc.length < 40 ? 'Event description must be at least 40 characters long.' : null;
    //   };
    //   const validateBio = ( bio ) => {
    //     return bio && bio.replace(/s+/g, ' ').trim().split(' ').length < 5 ? 'Bio should have more than 5 words.' : null;
    //   };
    //   return {
    //     eventName: validateEventName( values.eventName ),
    //     eventDesc: validateEventDesc( values.eventDesc ),
    //     gender: null,
    //     bio: validateBio( values.bio ),
    //     authorize: null,
    //     category: null
    //   };
    // }

    // successValidator( values, errors ) {
    //   const validateEventName = ( ) => {
    //     return !errors.eventName ? 'Nice name!' : null;
    //   };
    //   const validateEventDesc = ( ) => {
    //     return !errors.eventDesc ? 'Sounds like a great time!' : null;
    //   };
    //   const validateGender = ( ) => {
    //     return !errors.gender ? 'Thanks for entering your gender.' : null;
    //   };
    //   const validateBio = ( ) => {
    //     return !errors.bio ? 'Cool Bio!' : null;
    //   };
    //   const validateAuthorize = ( ) => {
    //     return !errors.authorize ? 'You are now authorized.' : null;
    //   };
    //   const validateStatus = ( ) => {
    //     return !errors.category ? null : null;
    //   };
    //   return {
    //     eventName: validateEventName( values.eventName ),
    //     eventDesc: validateEventDesc( values.eventDesc ),
    //     gender: validateGender( values.gender ),
    //     bio: validateBio( values.bio ),
    //     authorize: validateAuthorize( values.authorize ),
    //     category: validateStatus( values.category )
    //   };
    // }


  render() {

  	return(    
  		<Form
      // validateError={this.errorValidator}
      // validateWarning={this.warningValidator}
      // validateSuccess={this.successValidator}
      onSubmit={submittedValues => this.setState({submittedValues: submittedValues}, () => {axios.post('/createEvent', {
      	eventName: this.state.submittedValues.eventName,
      	eventDesc: this.state.submittedValues.eventDesc,
      	capacity: this.state.submittedValues.capacity,
      	category: this.state.submittedValues.category,
        creatorID: this.props.userID
      	})})
      .then((response) => {console.log(response)})}>
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
          <button type="submit" className="mb-4 btn btn-primary">Submit</button>
        </form>
      )}
    </Form>
  		)
  }
}

export default CreateEvent