import React from 'react';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import $ from 'jquery';
import { CloudinaryContext, Image, Transformation, Video } from 'cloudinary-react';
import { cloudinary_API, cloudinary_SECRET, cloudinary_cloud_name, cloudinary_cloud_upload_presets } from '../../../../config.js';
import cloudinary from 'cloudinary-core';

const sha1Encrypt = require('sha1');
const cloud_name = cloudinary_cloud_name;
const url = `https://api.cloudinary.com/v1_1${cloud_name}/image/upload`;
const timestamp = Date.now()/1000;
const upload_preset = cloudinary_cloud_upload_presets;
const cloudinaryCore = new cloudinary.Cloudinary({
    cloud_name,
    api_key: cloudinary_API,
    api_secret: cloudinary_SECRET,
    upload_preset,
});



export class UserChart extends React.Component {
  constructor(props) {
    super(props)
    this.makeGraph.bind(this);
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
			<Link onClick={() => {props. getUserDisplayedData(props.friend.userID)}} to={`/profile/${props.friend.userID}`}>
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

export class ImageEditIcon extends React.Component {
	constructor(props) {
		super(props)
	}

	onDrop(files) {
        const image = files[0];
	}

	render() {
		return (
				// <img src="http://www.iconninja.com/files/9/26/395/instagram-insta-photo-social-media-camera-icon.svg" alt=""/>
				<Dropzone onDrop={this.onDrop.bind(this)} >
					<p>{"Drop in here"}</p>
				</Dropzone >
		)
	}
}


