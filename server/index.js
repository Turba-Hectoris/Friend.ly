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
  if (req.session.userID) {
  	console.log('something', req.session.userID)
  	res.send(JSON.stringify(req.session.userID))
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
					util.createSession(req, res, userID)
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

app.get('/profile/:userId', (req, res) => {
	let userID = req.params.id;
	db.Users.findOne({where: {userID: userID}}).then((user) => {
		res.send(200, user);
	})
})

///////////////////////////////
//// Don't delete dis brada////
///////////////////////////////
app.get('/*', (req, res) => { res.sendFile(path.join(__dirname, '../client/dist/index.html'))})



app.listen(1337, function() {
  console.log('listening on port 1337!');
})