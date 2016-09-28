//import dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//set listening port
var port = 8000;

//create express application
var app = express();

//set up body parser
//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//set up database connection
require('./server/config/mongoose_setup.js');

//define routes
var route = require('./server/config/routes')(app);

//create the server
app.listen(port, function(){
	console.log('listening on port ' + port);
});