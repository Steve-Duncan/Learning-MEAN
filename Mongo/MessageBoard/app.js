//import dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var port = 8000;

//create express app
var app = express();

//set path for static and views
app.use(express.static(path.join(__dirname, 'static')));
app.set('views', path.join(__dirname, 'views'));

// view engine setup
app.set('view engine', 'ejs');

//set up body parser to parse form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to database
mongoose.connect('mongodb://localhost/messages');

//create schema variable so we can use associations, tying the comments to the posts
var Schema = mongoose.Schema;
//create schema for posts
var PostSchema = new mongoose.Schema({
  author: {type: String, required: [true, "Name field cannot be empty!"], minlength: [4, "Name must be longer than 4 characters!"]},
  text: {type: String, required: [true, "Message field cannot be empty!"]},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true});

//create schema for comments
var CommentSchema = new mongoose.Schema({
  _post: {type: Schema.Types.ObjectId, ref: 'Post'},
  author: {type: String, required: [true, "Name field cannot be empty!"], minlength: [4, "Name must be longer than 4 characters!"]},
  text: {type: String, required: [true, "Message field cannot be empty!"]},
}, {timestamps: true});

//name the schema
mongoose.model('Post', PostSchema);
mongoose.model('Comment', CommentSchema);

//store schema in variable
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

//Define routes 
var routes = require('./routes/routes_index')(app, Post, Comment);

//create the server
app.listen(port, function (){
  console.log('listening on port: ', port);
});
