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


app.get('/checklogin', util.checkUser, (req, res) => {
	res.end()
})

app.post('/logout', util.expireSession, (req, res) => {
	res.end()
})

app.post('/signup', (req, res) => {
	var username = req.body.username;
	db.Users.findOne({where: {username: username}}).then( async (foundUser) => {
		if (!foundUser) {
			var password = await bcrypt.hash(req.body.password, 4)
			///Creating filler data and merging them with default with Object.assign
			let fillerdata = {
				bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium possimus blanditiis, facilis eligendi ea vero asperiores ipsa! Itaque exercitationem rerum veniam consequatur vitae earum error voluptatum ullam saepe. Fugit, ullam.",
				gender: 'M'
			}

			db.Users.findCreateFind({where: Object.assign({username: username, passHash: password, email: req.body.email}, fillerdata)})
			.spread((user, created) => {
				({userID, username} = user.dataValues)
				res.status(200).send({userID, username});
			})
		} else {
			({userID, username} = foundUser.dataValues)
			res.status(200).send({response: 'Already a memeber', userID, username});
		}
	})
})

app.post('/login', (req, res) => {
	var username = req.body.username
	var password = req.body.password
	db.Users.findOne({where: {username: username}})
	.then((user) => {
		if (!user) {
			res.status(200).send({response: 'member not found'});
		} else {
			user.comparePassword(req.body.password, (isMatch) => {
				if (!isMatch) {
					res.status(200).send({response: 'invalid password'})
				} else {
					let userID = user.dataValues.userID
					util.createSession(req, res, userID)
				}
			})
		}
	})
})



app.get('/profile/data/:userId', (req, res) => {
	let userID = req.params.userId;
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

/////////////////////////////////////////////////////////////////
/////Route creates a event and associate it with a UserEvents////
/////                                                        ////
/////////////////////////////////////////////////////////////////

app.post('/createEvent', (req, res) => {
	let eventName = req.body.eventName;
	let capacity = req.body.capacity;
	let creatorID = req.body.creatorID;
	let category = req.body.category;
	let eventDesc = req.body.eventDesc;
	let date = new Date();
	let imgLink = "http://winthehumanrace.ca/wp-content/uploads/2014/04/Pink-event.jpg"
	db.Events.findCreateFind({where: {imgLink: imgLink, date: date, eventName: eventName, capacity: capacity, eventDesc: eventDesc, category: category, creatorID: creatorID}}).spread((event, created) => {
		db.UserEvents.findCreateFind({where: {userID: creatorID, eventID: event.dataValues.eventID}}).spread((userevent, created) => {
			res.send(userevent.dataValues)
		})
	})
})

app.post('/createUser', (req, res) => {
	let username = req.body.username;
	let bio = req.body.bio;
	let email = req.body.email;
	let gender = req.body.gender;
	let profileImg = "https://i.annihil.us/u/prod/marvel//universe3zx/images/f/f5/IronMan_Head.jpg"
	db.Events.findCreateFind({where: {profile: profileImg, username: username, bio: bio, email: email, gender: gender}}).spread((event, created) => {
		res.send(event.dataValues)
	})
})

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


app.get('/profile/events', (req, res) => {
  let userID = req.query.userID
  console.log(userID)
  db.Events.findAll({where: {creatorID: userID }}).then((events) => {
    res.send(events)
  })
  // res.end()
})

app.get('/events', (req, res) => {
  let term = req.query.term
  db.Events.findAll({where: {eventName: {
  	[db.Op.iLike]: '%' + term + '%'
  }}}).then((events) => {
    res.send(events)
  })
})

app.use('/*', express.static(__dirname + '/../client/dist'));

app.listen(1337, function() {
  console.log('listening on port 1337!');
})






















