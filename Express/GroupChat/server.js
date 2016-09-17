//import dependencies
var express = require('express');
var path = require('path');

//set port to use
var port = 8000;

//create express app
var app = express();

//set path for static and views
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join('./views'));

//set template engine to use
app.set('view engine', 'ejs');

//define routes
app.get('/', function (req, res){
	res.render('index');
});


//build server
server = app.listen(port, function (){
	console.log('listening on port ', port);
});

var all_messages = [];

//establish socket
var io = require('socket.io').listen(server);


//listen for connection
io.sockets.on('connection', function (socket){
	console.log('socket enabled');
	//get the user id and strip off leading /#
	var user_id = (socket.id).slice(2);

	//listen for new user
	socket.on('user_joined', function (username){
		socket.user = username;
		//send all previous messages to new user
		socket.emit('all_messages', all_messages);
		//new user joined message
		var msg = username + ' has joined the chat!'
		//send new user joined message to all users		
		io.emit('update_msg', msg);
		//add new user joined message to all_messages		
		all_messages.push({user: username, msg: msg});
		
	});

	//listen for new message from view
	socket.on('send_msg', function (msg, name){
		//broadcast msg to all users
		io.emit('new_msg', {user: name, msg: msg})
		//add msg to array
		all_messages.push({user: name, msg: msg});
	});

	//listen for disconnect event
	socket.on('disconnect', function(){
		//send message to all users
		var msg = socket.user + ' has left the building!'
		socket.broadcast.emit('update_msg', msg);
		//add the message to all_messages
		all_messages.push({user: socket.user, msg: msg});
	});
}); 