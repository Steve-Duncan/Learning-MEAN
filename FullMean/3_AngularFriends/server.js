//import dependencies
var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),

	//set up listening port
	port = 8000,

	//create express app
	app = express();

//set up static path
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'client')));


// set up body parser to allow parsing html
app.set(bodyParser.urlencoded({ extended: true }));
app.set(bodyParser.json());

//import mongoose
require("./server/config/mongoose");

//import the router
// var route_setter = require("./server/config/routes");
// route_setter(app);
require("./server/config/routes.js")(app);



//set up server
app.listen(port, function(){
	console.log('Listening on port', port)
});