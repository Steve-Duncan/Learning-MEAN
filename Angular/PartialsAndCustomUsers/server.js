//import dependencies
var express = require('express'),
	path = require('path'),

	//set up listening port
	port = 8000,

	//create express application
	app = express();

//set path for static
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));



//set up server
app.listen(port, function(){
	console.log('Listening on port', port)
});