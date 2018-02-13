import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

class GoogleAuth extends React.Component {
  constructor(props) {
    super(props)
    // will refactor to event = this.props.event && this.props.emails(for attendees); remove the state
    this.state = {
      event: {
        'summary': 'Google I/O 2015',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
          'dateTime': '2018-02-15T09:00:00-07:00',
          'timeZone': 'America/Los_Angeles'
        },
        'end': {
          'dateTime': '2018-02-17T17:00:00-07:00',
          'timeZone': 'America/Los_Angeles'
        },
        'attendees': [
          {'email': 'abc@gmail.com'},
          {'email': 'cba@gmail.com'}
        ],
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10}
          ]
        }
      }
    };

    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseGoogle(res) {
    console.log('in google res: ', res)
    const event = this.state.event;
    console.log('event is: ', event)
    function makeApiCall () {
      var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
      });
      request.execute(function(resp) {       
        if (resp.id){
          alert("Event was successfully added to the calendar!");
          console.log('Event created: ' + resp.htmlLink);
        } else{
          alert("An error occurred. Please try again later.")
        }
      });
    };
    gapi.client.load('calendar', 'v3', makeApiCall);
  }

  render() {
    return (
      <GoogleLogin
        clientId="122713429777-nbioralfsboud2u8igdcptv3csag3ki2.apps.googleusercontent.com"
        scope="https://www.googleapis.com/auth/calendar"
        discoveryDocs={["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]}
        buttonText="Calendar Authorization"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      />
    )
  }
}

export default GoogleAuth;