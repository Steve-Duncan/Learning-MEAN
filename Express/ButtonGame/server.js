//require dependencies
var express = require('express');
var path = require('path');

// create the express app
var app = express();

// set path for static content and views
app.use(express.static(path.join(__dirname,'./static')));
app.set('views', path.join('./views'));
//set the templating engine to use
app.set('view engine', 'ejs');

//define routes
app.get('/', function (reqest, response){
	response.render('index');
});

var server = app.listen(8000, function (){
	console.log('listening on port 8000');
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket){
	console.log('sockets enabled');
	console.log(socket.id);
	var num_clicked=0;
	//emitter for button click
	socket.on('epic_clicked', function (data){
		num_clicked += 1;
		//build object to return to view
		var num = {number: num_clicked};
		//send object to the view
		socket.emit('epic_response', num);
	});
	//emitter for button click
	socket.on('reset_clicked', function (data){
		num_clicked=0;
		//build object to return to view
		var num = {number: num_clicked};
		//send object to the view
		socket.emit('reset_response', num);
	});
});



