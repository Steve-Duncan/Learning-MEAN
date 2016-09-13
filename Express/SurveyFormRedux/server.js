//require dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')

// create the express app
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// set path for static content and views
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
//set the templating engine to use
app.set('view engine', 'ejs');

//define routes
app.get('/', function(request, response){
	response.render('index');
});

// defining result as global; need to figure out how to pass as argument
var result;
app.post('/process', function(request, response){
	result = request.body;
	console.log(result);
	//redirect to result route
	response.redirect('/result');

});
app.get('/result', function(request, response){
	// render the results view, passing result (request object)
	response.render('results', {result: result});
});


var server = app.listen(8000, function(){
	console.log('listening on port 8000');
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket){
	console.log('sockets enabled');
	console.log(socket.id);

	//all socket code goes here
	//this comes from the view
	socket.on('button_clicked', function (data){
		
		var luckNum
		//build object to return to view
		var retVal = {
			name: data.name,
			location: data.location,
			language: data.language,
			comment: data.comment,
			luckyNum: (Math.floor(Math.random()*1000)+1)
			}

		//send object to the view
		socket.emit('server_response', retVal);

	});
})



