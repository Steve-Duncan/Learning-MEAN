//import dependencies
var express = require('express');
var path = require('path');

//create express app
var app = express();

//set path for static and views
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join('./views'));

//set template engine to use
app.set('view engine', 'ejs');

//define routes
app.get('/', function (request, response){
	response.render('index'); 
});

app.get('/chat', function (request, response){
	response.render('chat');
});

//build server
var server = app.listen(8000, function (){
	console.log('listening on port 8000');
});

var io = require('socket.io').listen(server);

var activeUsers=[];

io.sockets.on('connection', function (socket, username){
	console.log('socket enabled');
	var user_id = (socket.id).slice(2);
	console.log(user_id)
	//socket.emit('active_users', activeUsers);

	socket.on('user_joined', function (username){
		//receive from view
		//get user name
		var user = username;
		console.log('OK button clicked for user ' + user);
		console.log('Socket id: ' + user_id);

		//add new user to activeUsers
		activeUsers.push({user_id: user_id, name: user});
		
		//emit all users to new user
		socket.emit('active_users', activeUsers);

		//broadcast new user to all other users
		socket.broadcast.emit('update_user', {user_id: user_id, name: user});
		console.log(activeUsers);

	});


	socket.on('disconnect', function (data){
		console.log('User id ' + user_id + ' disconnected')
		//remove disconnected user from activeUsers
		
		for (var i=0; i<activeUsers.length; i++){
			if (activeUsers[i].user_id == user_id){
				activeUsers.splice(i,1);
			};
			
			//console.log('Index: ', i, 'ID: ', user_id)
		};
		//console.log('index of object to delete: ', index)
		console.log(activeUsers);
		//broadcast id to all other users
		console.log('Before splice: ' + user_id);
		
		socket.broadcast.emit('remove_user', user_id);

	});



	console.log('Active users: ', activeUsers)

	socket.on('cancel_clicked', function (data){
		console.log('Cancel button clicked');
	});
});
