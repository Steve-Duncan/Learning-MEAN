//import dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//set listening port
var port = 8000;

//create express application
app = express();

//set up bodyParser so we can get data from view form
app.use(bodyParser.urlencoded({extended: true}));

//set path for views & static
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './client/views'));

//set template engine to use
app.set('view engine', 'ejs');

//set up database connection
require('./server/config/mongoose_setup.js')

//define routes
var route = require('./server/config/routes')(app);

//create the server
app.listen(port, function (){
	console.log('listening on port: ', port);
});


