var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var path = require('path');
var app = express();
var bcrypt = require('bcrypt');
var db = require('../db/index.js');


app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client/dist'));
app.post('/', function(req, res) {
  
})
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../client/dist/index.html')))
app.post('/signup', (req, res) => {
	const username = req.body.username;
	const password = bcrypt.hash(req.body.password
	db.Users.findOrCreate({where: {username: username}})
}



app.listen(1337, function() {
  console.log('listening on port 1337!');
})