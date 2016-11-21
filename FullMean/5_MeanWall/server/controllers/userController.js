var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs/bCrypt.js');
var User = mongoose.model('User');

function UsersController() {
	// controller login method
	this.login = function(req, res) {
		console.log('In server user controller login', req.body)
		var username = req.body.username;
		console.log('Did we get a username?', username)
		var password = req.body.password;
		User.findOne({ username }, function(err, user) {
		// 	// no user found in database
			if (user == null) {
				console.log("No matching user found!");
				res.json({errors: "No valid user found."})
				//send to register

			}
			else { // compare the passwords
				if (bcrypt.compareSync(password, user.password) == false) {
					console.log("Invalid password!");
					res.json({errors: "Password is not valid."})
				}
				else {
					console.log("Login successful!");
		  			res.json( user );
				}
			}
		});
	};

	// controller register method
	this.register = function(req, res) {
		console.log('In server user controller register', req.body)
		var user = new User ({
						username: req.body.username,
						email: req.body.email,
						first_name: req.body.first_name,
						last_name: req.body.last_name,
						birthday: req.body.birthday,
						password: req.body.password
					});

		user.save( function(err, user) {
			if (err) {
				console.log("Registration failed: ", err);
				res.json({ errors: err.errors });
			}
			else {
				console.log("Registration successful")
				res.json( user );
			}
		});

	}

	this.show = function(req, res) {

		User.findOne({ _id: req.params.id }, function(err, user) {
			if (err) {
				console.log("No user found")
				res.json({errors: "No user found"});
			}
			else {
				console.log("User information found")
				res.json( user );
			}
		});

	}

}

module.exports = new UsersController();