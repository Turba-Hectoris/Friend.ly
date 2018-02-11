import { Component } from 'react';
import { Link } from 'react-router-dom';

class FriendRequestList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestClicked: false
    }
    this.handleAddFriend = this.props.handleAddFriend.bind(this)
    this.getUserDisplayedData = this.props.getUserDisplayedData.bind(this)
  }

render(){
    return (
      <div>
          {this.props.fetchedFriendRequest.map((request) => {
            <FriendRequestListItem 
              key={request.id}
              request={request}
              handleAddFriend={this.handleAddFriend}
              getUserDisplayedData={this.getUserDisplayedData}
            />
          })}
      </div>
    )
  }
}

export const FriendRequestListItem = ({ request, handleAddFriend, getUserDisplayedData }) => {
  return (
    <div className="friend_request_modal">
    	<Link className="friend_request_image" onClick={() => {getUserDisplayedData(request.userID)}} to={`/profile/${request.userID}`}>
        <img src={`${request.profilePic}`} alt=""/>
      </Link>  
      <div className="friend_request_username" >{request.username}</div>
      <button onClick={() => {handleAddFriend(request.userID)}} >Accept</button>
    </div>
  );
}

export default UserEvent;