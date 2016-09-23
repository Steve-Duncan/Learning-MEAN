//import dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/routes_index');
var port = 8000;

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set path for static folder
app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.urlencoded({ extended: false }));


//connect to database
mongoose.connect('mongodb://localhost/quotes');

//create schema for quotes
var QuoteSchema = new mongoose.Schema({
  name: {type: String},
  quote: {type: String},
}, {timestamps: true});

//add error messages
QuoteSchema.path('quote').required(true, 'Quote is a required field');
QuoteSchema.path('name').required(true, 'Name is a required field');

//name the schema 'Quote'
mongoose.model('Quote', QuoteSchema);
//store schema in variable
var Quote = mongoose.model('Quote');

//define routes
var route = require('./routes/routes_index')(app, Quote);

//create the server
app.listen(port, function (){
  console.log('listening on port: ', port);
});

