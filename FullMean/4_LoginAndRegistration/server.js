//import dependencies
var express = require('express'),
	bodyParser = require('body-parser'),
	bcrypt = require('bcrypt-nodejs/bCrypt.js'),
	path = require('path'),

	//set the listening port
	port = 8000,

	//create the express app
	app = express();

//set path for static
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'client')));

//configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// require mongoose config
require('./server/config/mongoose');

// require routes and invoke it
require('./server/config/routesServer')(app);

app.listen(port, function() {
  console.log('listening on port', port);
});
