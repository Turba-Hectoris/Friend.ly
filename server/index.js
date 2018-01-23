var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.post('/', function(req, res) {
  
})

app.listen(1337, function() {
  console.log('listening on port 1337!');
})