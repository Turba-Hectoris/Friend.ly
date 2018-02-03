import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';


export class UserChart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.makeGraph();
  }

  makeGraph(){
    var chart = AmCharts.makeChart( "chartdiv", {
      "theme": "light",
      "type": "serial",
      "startDuration": 2,
      "dataProvider": [{
          "category": "Movies",
          "attended": 5,
          "color": "#FF0F00"
      }, {
          "category": "Outdoors",
          "attended": 2,
          "color": "#FF6600"
      }, {
          "category": "Food/Dining",
          "attended": 9,
          "color": "#FF9E01"
      }, {
          "category": "Live Music",
          "attended": 2,
          "color": "#FCD202"
      }, {
          "category": "Exercise",
          "attended": 2,
          "color": "#F8FF01"
      }, {
          "category": "Gaming",
          "attended": 4,
          "color": "#B0DE09"
      }, {
          "category": "Drinks",
          "attended": 4,
          "color": "#04D215"
      }, {
          "category": "Arts & Culture",
          "attended": 8,
          "color": "#04D215"
	    }],
      "valueAxes": [{
          "position": "left",
          "axisAlpha":0,
          "gridAlpha":0
      }],
      "graphs": [{
          "balloonText": "[[category]]: <b>[[value]]</b>",
          "colorField": "color",
          "fillAlphas": 0.85,
          "lineAlpha": 0.1,
          "type": "column",
          "topRadius":1,
          "valueField": "attended"
      }],
      "depth3D": 40,
    "angle": 30,
      "chartCursor": {
          "categoryBalloonEnabled": false,
          "cursorAlpha": 0,
          "zoomable": false
      },
      "categoryField": "category",
      "categoryAxis": {
          "gridPosition": "start",
          "axisAlpha":0,
          "gridAlpha":0
    
      },
      "export": {
        "enabled": true
       }
    
    }, 0);
    console.log(chart);
  }

  render() {
    return(
      <div id="chartdiv"> </div>
    )
  }
}

export const UserFriend = (props) => {
	return (
			<div className="profile_friend">
			<Link onClick={() => {props.handleFriendClicked(props.friend.userID)}} to={`/profile/${props.friend.userID}`}>
					<img className="" src="https://images.onlinelabels.com/images/clip-art/dagobert83/dagobert83_female_user_icon.png" alt=""/>
			</Link>
					<hr/>
			{props.friend.username + '\n' + props.friend.email + '\n' + props.friend.gender} 
			</div>
	);
}

export const UserEvent = (props) => {
  return (
    <div className="profile_event">
      <img src="https://d.wildapricot.net/images/newsblog/bigstock-events-7444309.jpg" alt=""/>
      <hr/>
      {props.event.eventName + '\n' + props.event.status + '\n' + props.event.date} 
    </div>
  );
}


