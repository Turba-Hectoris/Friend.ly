import React from 'react';


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
    this.withdrawMessage = this.withdrawMessage.bind(this);
  }

  componentDidMount () {
    this.state.ref.on('child_added', 
      snapshot => {
        this.handleNewMessage(snapshot.val(), snapshot.key)
      });
  }

  sendMessage () {
    this.state.ref.push({
      username: this.props.username,
      // profilePictureUrl: this.props.profilePictureUrl,
      message: this.state.message,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    });
  }

  withdrawMessage (message, index) {
    const now = new Date().getTime();
    const inOneMinute = (now - message.timestamp) < 60000 ? true : false;
    const intention = window.confirm('Are you sure you want to withdraw this message?');
    console.log(inOneMinute);
    if( intention && inOneMinute) {
      const messageRef = firebase.database().ref('/rooms/' + this.props.roomId + '/messages/' + message.key)
      messageRef.set(null)
      .then((data) => {
        const messagesAfter = this.state.messages.slice(0);
        messagesAfter.splice(index, 1);
        this.setState({
          messages: messagesAfter
        });
      })    
    } else if(intention) {
      window.alert('Sorry, too late to withdraw your message!')
    }
  }

  handleNewMessage (newMessage, key) {
    newMessage.createdAt = new Date(newMessage.timestamp).toLocaleTimeString();
    newMessage.key = key;
    this.setState({messages: [...this.state.messages, newMessage]})
  }

  handleMessageChange (e) {
    this.setState({message: e.target.value})
  }

  handleKeyPress (e) {
    if(e.key === 'Enter' && this.state.message.length) {
      this.sendMessage();
      this.setState ({message: ''});
    }
  }

  handleSendButton (e) {
    if(this.state.message.length) {
      this.sendMessage();
      this.setState({message: ''});
    }
  }

  render() {
    return (
      <div className="db_chatroom">
        <div className="db_messages">
          <h1>ChatRoom Messages </h1>
          <p>{'user: ' + this.props.username + '; roomId: ' + this.props.roomId}</p>
          <ul>
            {this.state.messages.map((message, index) => {
              return (
                <li key={index} onClick={() => this.withdrawMessage(message, index)}>
                {message.username + ': ' + message.message + ' at ' + message.createdAt}
                </li>
              );
            })}
          </ul>
        </div>       
        <div className="db_typing">
            <input  value={this.state.message} onChange={this.handleMessageChange} onKeyPress={this.handleKeyPress} placeholder="Start chatting"/>
            <button  onClick={this.handleSendButton}>Send</button>
        </div>
      </div>
    );
  }
}


export default ChatRoom