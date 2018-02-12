import React from 'react';
import { Link } from 'react-router-dom';

class FriendRequestList extends React.Component {
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
      <div className="friend_request_list">
          {this.props.fetchedFriendRequest.map((request) => {
            return <FriendRequestListItem 
              key={request[1].friendID}
              ID={request[1].friendID}
              requestObj={request[2]}
              handleAddFriend={this.handleAddFriend}
              getUserDisplayedData={this.getUserDisplayedData}
            />
          })}
      </div>
    )
  }
}

export const FriendRequestListItem = ({ ID, requestObj, handleAddFriend, getUserDisplayedData }) => {
  return (
    <div className="friend_request_listitem">
    	{
        requestObj.access ? 
        <Link className="friend_request_image" onClick={() => {getUserDisplayedData(ID)}} to={`/profile/${ID}`}>
          <img src={`${requestObj.profilePic}`} alt=""/>
        </Link> :
        <img src={`${requestObj.profilePic}`} alt=""/>
      }  
      <div className="friend_request_username">{requestObj.username}</div>
      <button onClick={() => {handleAddFriend(requestObj.friendID)}}>Accept</button>
    </div>
  );
}

export default FriendRequestList;