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
// app.get('/', (req, res) => {console.log('hi'); res.sendFile(path.join(__dirname, '../client/dist/index.html'))})

app.use(session({
	secret: 'friends are the best',
	resave: false,
	saveUninitialized: true
}));

app.get('/checkLogin', function(req, res) {
  if (req.session.userID) {
  	console.log(req.session.userID)
  	res.send(JSON.stringify(req.session.userID))
  } else {
  	console.log('no data')
  	res.send('no data')
  }
})

app.post('/signup', (req, res) => {
	var username = req.body.username;
	db.Users.findOne({where: {username: username}}).then( async (result) => {
		if (!result) {
			var password = await bcrypt.hash(req.body.password, 4)
			db.Users.findCreateFind({where: {username: username, passHash: password, email: req.body.email}})
			.spread((user, created) => {
				res.redirect(301, '/login')	
			})
		} else {
			res.redirect('/signup')
		}
	})
})

app.post('/login', (req, res) => {
	var username = req.body.username
	var password = req.body.password
	db.Users.findOne({where: {username: username}})
	.then((user) => {
		if (!user) {
			res.redirect(301, '/login')
		} else {
			user.comparePassword(req.body.password, (isMatch) => {
				if (!isMatch) {
					res.redirect(301, '/login')
				} else {
					let userID = user.dataValues.userID
          // res.userID = userID
					util.createSession(req, res, userID, username)
					// console.log(req.session)
          // res.send({userID: userID})
				}
			})
		}
	})
})

app.get('/profile', util.checkUser, (req, res) => {
	let userID = req.session.userID
	db.Users.findOne({where: {userID: userID}}).then((user) => {
		// console.log(user)
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



app.listen(1337, function() {
  console.log('listening on port 1337!');
})