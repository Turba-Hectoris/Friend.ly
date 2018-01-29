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

app.post('/', function(req, res) {
  
})

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../client/dist/index.html')))

app.post('/signup', (req, res) => {
	var username = req.body.username;
	db.Users.findOne({where: {username: username}}).then( async (result) => {
		if (!result) {
			var password = await bcrypt.hash(req.body.password, 4)
			db.Users.findCreateFind({where: {username: username, passHash: password, email: req.body.email, gender: req.body.gender}})
			.spread((user, created) => {
				res.redirect(301, '/login')	
			})
		} else {
			res.redirect('/signup')
		}
	})
})

app.post('/login', (req, res) => {
	var username = req.body.username;
	var password = req.body.password
	db.Users.findOne({where: {username: username}})
	.then((user) => {
		if (!user) {
			res.send('no user with that name found!')
		} else {
			user.comparePassword(req.body.password, (isMatch) => {
				if (!isMatch) {
					res.redirect(301, 'login')
				} else {
					res.send('right password!')
				}
			})
		}
	})
})

app.get('/login', (req, res) => {
	res.send('poopies')
})

app.listen(1337, function() {
  console.log('listening on port 1337!');
})