const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');
const db = require('../db/index.js');


app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client/dist'));
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
			res.send('noooo')
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
		bcrypt.compare(password, user.dataValues.passHash)
			.then((answer) => {
				if (answer === false) {
					res.redirect(301, '/login')
				}
				if (answer === true) {
					res.send('right password!')
				}
			}
	)}
})})

app.get('/login', (req, res) => {
	res.send('poopies')
})

app.listen(1337, function() {
  console.log('listening on port 1337!');
})