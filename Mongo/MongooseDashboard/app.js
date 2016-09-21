//import dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var port = 8000;

app = express();

app.use(bodyParser.urlencoded({extended: true}));

//set path for views & static
app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));

//set template engine to use
app.set('view engine', 'ejs');

//connect to database
mongoose.connect('mongodb://localhost/animals');

//create schema for animals
var AnimalSchema = new mongoose.Schema({
	type: {type: String},
	color: {type: String},
	weight: {type: Number},
	range: {type: String}
}, {timestamps: true});

//name the schema 'Animal'
mongoose.model('Animal', AnimalSchema);
//store schema in variable
var Animal = mongoose.model('Animal');

//define routes
var route = require('./routes/route_index')(app, Animal);

//create the server
app.listen(port, function (){
	console.log('listening on port: ', port);
});


