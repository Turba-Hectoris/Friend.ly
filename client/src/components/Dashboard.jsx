import React from 'react';
import $ from 'jquery';
import ChatRoom from './ChatRoom.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'you',
      events : [ 'Hiking in the mountains', 'Making memes', 'Making memes', 'Making memes', 'Making memes', 'Making memes', 'Making memes', 'Making memes', 'Making memes', 'Making memes', 'Making memes', 'Making memes', 12, 13, 14, 15, 16, 17, 18, 19, 20 ],
      select_event_id: 2
    }
    // firebase.auth().signInAnonymously().catch(function(error) {
    //   console.error('Error signing on to firebase!', error.message);
    // });
    
    // firebase.auth().onAuthStateChanged(function(user) {
    //   if (user) {
    //     // console.log('User signed in', user);
    //     var isAnonymous = user.isAnonymous;
    //     var uid = user.uid;
    //   }
    // });
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (div, item) {
    // div.target.style.backgroundColor = 'red'
    this.setState({
      currentRoom: item
    })
  }

  render () {
    return (
      <div className="db_container">
        <div className="dashboard">

          <div className="db_panel_1">
          <div className="db_eventsHeader">
                <h3>Events</h3>
            </div>
            <div className="db_events">
              <ul>
              {this.state.events.map((item, idx) => idx === this.state.currentRoom ? <EventListItem selected={true} handleClick={this.handleClick} item={item} key={idx} roomNumber={idx}/> : <EventListItem selected={false} handleClick={this.handleClick} item={item} key={idx} roomNumber={idx}/> )}
              </ul>      
            </div>
            <div className="db_create">    
                <h3 style={{padding:'0',margin:'auto'}}>Create Event</h3>
            </div>
          </div>

          <Chatroom roomId={this.state.select_event_id} currentRoom={this.state.currentRoom} roomName={this.state.events[this.state.currentRoom]} username={this.state.username}/>
          
          <div className="db_panel_3">
            <div className="db_detail">

              <h3>Event Detail--Box6</h3>
            </div>
          </div>

      </div>
    </div>
    )
  }
}

const EventListItem = (props) => (
  props.selected ? (<li style={{backgroundColor: 'rgba(136, 136, 136, .1)'}}><div className="eventListItem" onClick={(e) => props.handleClick(e, props.roomNumber)}><div style={{display: 'inline-block', height: '100%', alignItems: 'center'}}><img className="eventListPhoto"height="50px" width="50px"src="http://johnsonlegalpc.com/wp-content/uploads/2016/09/person.png"/></div><span className="eventListName">{props.item}</span></div></li>)
  : (<li><div className="eventListItem" onClick={(e) => props.handleClick(e, props.roomNumber)}><div style={{display: 'inline-block', height: '100%', alignItems: 'center'}}><img className="eventListPhoto"height="50px" width="50px"src="http://johnsonlegalpc.com/wp-content/uploads/2016/09/person.png"/></div><span className="eventListName">{props.item}</span></div></li>)
)


class Chatroom extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      input: '',
      messages: [{username: 'anonymous', message: 'Yo wassup, whens the event?', time: '12:31'}, 
                {username: 'Knuckles', message: 'do you know de wey? asdasvghjbafhjabd fasvdgdhgavhdgasvdsavdhasvdavhabjhfavbjfabjhda vbjdavbghjdvasghdvasghdvagh dvasghdvsaghfvajhbgakjfnafbajbajhdnbasjkndjkabfjhaj', time: '12:37'},
                {username: 'jeff', message: 'my name jeff lmaoaooooooo', time: '12:39'},
                {username: 'you', message: 'stop', time: '12:41'},
                {username: 'anonymous', message: 'Yo wassup, whens the event?', time: '12:31'}, 
                {username: 'Knuckles', message: 'do you know de wey? asdasvghjbafhjabd fasvdgdhgavhdgasvdsavdhasvdavhabjhfavbjfabjhda vbjdavbghjdvasghdvasghdvagh dvasghdvsaghfvajhbgakjfnafbajbajhdnbasjkndjkabfjhaj', time: '12:37'},
                {username: 'jeff', message: 'my name jeff', time: '12:39'},
                {username: 'you', message: 'stop', time: '12:41'},
                {username: 'anonymous', message: 'Yo wassup, whens the event?', time: '12:31'}, 
                {username: 'Knuckles', message: 'do you know de wey? asdasvghjbafhjabd fasvdgdhgavhdgasvdsavdhasvdavhabjhfavbjfabjhda vbjdavbghjdvasghdvasghdvagh dvasghdvsaghfvajhbgakjfnafbajbajhdnbasjkndjkabfjhaj', time: '12:37'},
                {username: 'jeff', message: 'my name jeff', time: '12:39'},
                {username: 'you', message: 'stop', time: '12:41'},
                {username: 'anonymous', message: 'Yo wassup, whens the event?', time: '12:31'}, 
                {username: 'Knuckles', message: 'do you know de wey? asdasvghjbafhjabd fasvdgdhgavhdgasvdsavdhasvdavhabjhfavbjfabjhda vbjdavbghjdvasghdvasghdvagh dvasghdvsaghfvajhbgakjfnafbajbajhdnbasjkndjkabfjhaj', time: '12:37'},
                {username: 'jeff', message: 'my name jeff', time: '12:39'},
                {username: 'you', message: 'stopaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', time: '12:41'},
                {username: 'anonymous', message: 'Yo wassup, whens the event?', time: '12:31'}, 
                {username: 'Knuckles', message: 'do you know de wey? asdasvghjbafhjabd fasvdgdhgavhdgasvdsavdhasvdavhabjhfavbjfabjhda vbjdavbghjdvasghdvasghdvagh dvasghdvsaghfvajhbgakjfnafbajbajhdnbasjkndjkabfjhaj', time: '12:37'},
                {username: 'jeff', message: 'my name jeff lemaoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo', time: '12:39'},
                {username: 'you', message: 'stop', time: '12:41'}]
    }
    this.handleSubmit.bind(this)
  }

  //This component should have access to the currently logged in user, and the currentRoom passed down as props. We will then use the current room 
  // ID to communicate with the firebase server. 
  componentDidMount() {
    $('.db_typingText').html('Type a message...')

    $('.db_typingText').on('focus', () => {
      // console.log($('.db_typingText').html())
      let text = $('.db_typingText').html()
      if (text === 'Type a message...') {
        $('.db_typingText').html('')
      }
    })
    $('.db_typingText').on('keyup', () => {
      let text = $('.db_typingText').text()
      // console.log(text)
      this.setState({
        input: text
      })
    })
    $('.db_typingText').on('focusout', () => {
      // console.log(this.state.input)
      let text = $('.db_typingText').html()
      // console.log('text is' , text.length)
      if (!text.length) {
        $('.db_typingText').html('Type a message...')
      }
    })

    $('.db_chatroom').scrollTop($('.db_chatroom')[0].scrollHeight)

    $('.db_typingText').on('keypress', (e) => {
      let shift = e.shiftKey
      if (!shift && e.keyCode == 13) {
        e.preventDefault()
        this.handleSubmit()
      }
    })
  }
  handleSubmit() {
    if (this.state.input.length) {
    this.setState({
      input: '',
      messages: [...this.state.messages, {message: this.state.input, username: 'you'}]
    }, () => {
      $('.db_chatroom').scrollTop($('.db_chatroom')[0].scrollHeight)
    })
     $('.db_typingText').html('')  
    // $('.db_typingText').html('Type a message...')  
    }

  }
  render() {
    return (<div className="db_panel_2">
            <div className="db_info">
              <span id="eventName"><h3>{this.props.roomName}</h3></span>
            </div>
            <div className="db_chatroom">
              {/*<h2>{'Chatroom ' + this.props.currentRoom}</h2>*/}
              <ul style={{listStyle: 'none', margin: '10px', paddingLeft:'0', fontSize: '16px'}}>
                {this.state.messages.map((item, idx) => {
                  return <ChatroomMessage sentByUser={item.username === this.props.currentUser} message={item} key={idx}/>
                })}
              </ul>
            </div>
            <div className="db_typing">
              <span className="db_typingText" contentEditable='true'></span><button className="db_chatSend" onClick={() => {this.handleSubmit()}}>Send</button>
            </div>
          </div>)
  }
}

const ChatroomMessage = (props) => (
  props.sentByUser ? <li style={{textAlign:'right', marginBottom:'10px', width:'100%'}}><span style={{color: '#fff',backgroundColor: 'rgba(0, 132, 255, 1)', borderRadius: '1em', whiteSpace: 'pre-wrap', padding:'10px', display: 'inline-block', wordBreak: 'break-word', maxWidth:'50%'}}>{ '' + props.message.message}</span></li> 
  : <li style={{textAlign:'left', marginBottom:'10px', width:'auto', maxWidth: '80%'}}><div>{props.message.username}</div><span style={{backgroundColor: '#eee', borderRadius: '1em', whiteSpace: 'pre-wrap', padding:'10px', display: 'inline-block', wordBreak: 'break-all'}}><div>{props.message.message}</div></span></li>
)

export default Dashboard