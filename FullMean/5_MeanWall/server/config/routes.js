//var mongoose = require('mongoose');
var users = require('./../controllers/userController'),
	posts = require('./../controllers/postsController'),
	comments = require('./../controllers/commentController');

module.exports = function(app) {
	//call login function in server user controller
	console.log('In server routes, pointing to login method of server users controller')
	app.post('/users/login', users.login );
	app.post('/users/register', users.register);
	// app.get('/users/:id', users.show);

	//route for all posts
	app.get('/posts', posts.index);

	// route for new posts
	app.post('/posts', posts.create_post);

	//route for new comment
	app.post('/comments/:id', comments.create_comment); 

}


	