import React from 'react';
// import Paper from 'material-ui/Paper';
// import TextField from 'material-ui/TextField';
// import {List, ListItem} from 'material-ui/List';
// import Avatar from 'material-ui/Avatar';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
      ref: firebase.database().ref('/rooms/' + this.props.roomId + '/messages/')
    }

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSendButton = this.handleSendButton.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.getLastMessages = this.getLastMessages.bind(this);
  }

  componentDidMount () {
    // get last messages initially? 
    // this.getLastMessages();

    this.state.ref.on('child_added', snapshot => this.handleNewMessage((snapshot.val())));
  }

  sendMessage () {
    this.state.ref.push({
      username: this.props.username,
      // profilePictureUrl: this.props.profilePictureUrl,
      message: this.state.message
    });
  }

  handleNewMessage (newMessage) {
    console.log('newMessage is: ', newMessage);
    this.setState({messages: [...this.state.messages, newMessage]})
  }

  handleMessageChange (e, message) {
    this.setState({message})
  }

  handleKeyPress (e) {
    if(e.key === 'Enter' && this.state.message.length) {
      this.sendMessage();
      this.setState ({message: ''});
    }
  }

  // handle send button 
  handleSendButton (e) {
    if(this.state.message.length) {
      this.sendMessage();
      this.setState({message: ''});
    }
  }
  
  getLastMessages () {
    this.state.ref.on('value', snapshot => {
      console.log('snapshot.val on Value is: ', snapshot.val());
      this.setState({
        messages: snapshot.val()
      })
    });
  }

  createNewRoom (roomId) {
    //after create an event, get the eventId as roomId to create a new room
    let dbConnection = firebase.database().ref('/rooms');
    roomId.messages = [];
    dbConnection.push(roomId);
  }

  deleteRoom (roomId) {
    firebase.database().ref('/rooms/' + roomId).remove();
  }

  render() {
    return (
      <div className="db_chatroom">
        <div className="db_messages">
          <h1>ChatRoom Messages </h1>
          <p>{'user: ' + this.props.username + '; roomId: ' + this.props.roomId}</p>
        </div>       
        <div className="db_typing">
          <h3>Chat Typing</h3>
        </div>
      </div>
    );
  }
}
 {/*       <Paper>
          <List>
            { this.state.messages.map((message) => {
              return (
                <ListItem 
                primaryText={message.username + ': ' + message.text}
                leftAvatar={<Avatar src={message.profilePictureUrl} />}
                />
              );
            })}
          </List>
 {/*       <div ref={el => {this.el = el}} />      
        </Paper>
        <TextField 
          type="text"
          value={this.state.message}
          onChange={this.handleMessageChange}
          onKeyPress={this.handleKeyPress}
          hintText="Start your chat"
        />
*/}

export default ChatRoom