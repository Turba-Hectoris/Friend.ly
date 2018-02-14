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

  let pubKey = 'BPiwireF6caAoVpDjfv49II350Ad-JnZpC-1M4F5jV1RkXrowLEn0YikrSwUIVB83cf465FKw8rIFVoeusM8ewQ';


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
    this.askPermission = this.askPermission.bind(this);
    this.sendSubscriptionToServer = this.sendSubscriptionToServer.bind(this);
    this.subscribeUser = this.subscribeUser.bind(this);
  }

  urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

 sendSubscriptionToServer(endpoint, key, auth) {
    let encodedKey = btoa(String.fromCharCode.apply(null, new Uint8Array(key)));
    let encodedAuth = btoa(String.fromCharCode.apply(null, new Uint8Array(auth)));
    axios.post('/subscribeNotifs', {
      publicKey: encodedKey,
      auth: encodedAuth,
      notificationEndPoint: endpoint,
      id: this.props.userID
    }).then((res) => console.log(JSON.stringify(res)))
  }


  subscribeUser() {
    navigator.serviceWorker.ready.then((reg) => {
    let subscribeParams = {userVisibleOnly: true};
    //Setting the public key of our VAPID key pair.
    let applicationServerKey = this.urlB64ToUint8Array(pubKey);
    subscribeParams.applicationServerKey = applicationServerKey;
    reg.pushManager.subscribe(subscribeParams)
        .then((subscription) => {

            // Update status to subscribe current user on server, and to let
            // other users know this user has subscribed
            let endpoint = subscription.endpoint;
            let key = subscription.getKey('p256dh');
            let auth = subscription.getKey('auth');
            this.sendSubscriptionToServer(endpoint, key, auth);
        })
        .catch((err) => {
            // A problem occurred with the subscription.
            console.log('Unable to subscribe to push.', err);
        });
    });

  }

 askPermission() {
  return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission(function(result) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
  .then( (permissionResult) => {
    if (permissionResult !== 'granted') {
      throw new Error('We weren\'t granted permission.');
    } else {
      console.log('hi')
      this.subscribeUser()
    }
  });
}

  componentWillMount() {
    this.askPermission()
  }

  handleLocationChange (location) {
    this.setState({
      location: location
    });
  }

  setLocale(locale) {
    this.setState({
      locale: locale
    }, () => {console.log(this.state)})
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
      <div className="event_container">
        <div className="event_create">
          <Form
      // validateError={this.errorValidator}
      // validateWarning={this.warningValidator}
      // validateSuccess={this.successValidator}

            onSubmit={submittedValues => this.setState({submittedValues: submittedValues}, () => {axios.post('/createEvent', {
              eventName: this.state.submittedValues.eventName,
              eventDesc: this.state.submittedValues.eventDesc,
              capacity: this.state.submittedValues.capacity,
              category: this.state.submittedValues.category,
              creatorID: this.props.userID,
              startDate: this.state.startDate,
              endDate: this.state.endDate,
              location: this.state.locale
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