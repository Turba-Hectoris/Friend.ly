const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');
const db = require('../db/index.js');
const util = require('./utils.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client/dist'));

app.use(session({
	secret: 'friends are the best',
	resave: false,
	saveUninitialized: true
}));


app.get('/checkLogin', function(req, res) {
	console.log('session: ', req.session)
  if (req.session.userID) {
  	console.log('something', req.session.userID)
  	res.send({userId: req.session.userID})
  } else {
		console.log('no data')
		//Conditional rendering depends on/ 
		//axios request from front-end/////
		//to be a falsey value/////////////
		///// REFACTOR ////////////////////
		//res.send('no data') => res.end()/
  	res.end()
  }
})

app.post('/signup', (req, res) => {
	var username = req.body.username;
	db.Users.findOne({where: {username: username}}).then( async (result) => {
		if (!result) {
			var password = await bcrypt.hash(req.body.password, 4)
			db.Users.findCreateFind({where: {username: username, passHash: password, email: req.body.email}})
			.spread((user, created) => {
				res.status(200).send('New memeber created');
			})
		} else {
			res.status(200).send('Already a memeber');
		}
	})
})

app.post('/login', (req, res) => {
	var username = req.body.username
	var password = req.body.password
	db.Users.findOne({where: {username: username}})
	.then((user) => {
		if (!user) {
			res.status(200).send('member not found');
			// res.redirect(301, '/login')
		} else {
			user.comparePassword(req.body.password, (isMatch) => {
				if (!isMatch) {
					res.send(200, 'wrong password')
					// res.redirect(301, '/login')
				} else {
					let userID = user.dataValues.userID
          // res.userID = userID
					util.createSession(req, res, userID, username)
				}
			})
		}
	})
})


// app.get('/profile', util.checkUser, (req, res) => {
// 	let userID = req.session.userID
// 	db.Users.findOne({where: {userID: userID}}).then((user) => {
// 		console.log(user)
// 	})
// })

app.get('/profile/data/:userId', (req, res) => {
	let userID = req.params.userId;
	console.log('FROM FONTEND: ...', userID)
	db.Users.findOne({where: {userID: userID}}).then((user) => {
		let userClientSideData = {
			userID: user.dataValues.userID,
			username: user.dataValues.username,
			categories: user.dataValues.catagories,
			bio: user.dataValues.bio,
			email: user.dataValues.email,
			gender: user.dataValues.gender,
			createdAt: user.dataValues.createdAt,
			updatedAt: user.dataValues.updatedAt,
		};

		res.status(200).send(userClientSideData);
	})
})

///////////////////////////////
//// Don't delete dis brada////
///////////////////////////////

app.post('/createEvent', (req, res) => {
	let eventName = req.body.eventName;
	let capacity = req.body.capacity;
	let creatorID = req.body.creatorID;
	let category = req.body.category;
	let eventDesc = req.body.eventDesc;
	db.Events.findCreateFind({where: {eventName: eventName, capacity: capacity, eventDesc: eventDesc, category: category, creatorID: creatorID}}).spread((event, created) => {
		res.send(event.dataValues)
	})
})

app.get('/profile/events', (req, res) => {
  let userID = req.query.userID
  console.log(userID)
  db.Events.findAll({where: {creatorID: userID }}).then((events) => {
    res.send(events)
  })
  // res.end()
})

app.use('/*', express.static(__dirname + '/../client/dist'));

app.listen(1337, function() {
  console.log('listening on port 1337!');
})