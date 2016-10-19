var mongoose = require('mongoose');
var users = require('./../controllers/userControllerServer');

module.exports = function(app) {
	//call login function in server user controller
	console.log('In server routes, pointing to login method of server users controller')
	app.post('/users/login', users.login );
	app.post('/users/register', users.register);
	app.get('/users/:id', users.show);
}