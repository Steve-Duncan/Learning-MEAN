//userFactory
app.factory("userFactory", ['$http', function($http) {

	function UserFactory() {

		// call to login method of server user controller
		this.login = function(loginUser, callback) {
			console.log('In userFactory login, posting for server routes')
			$http.post('/users/login', loginUser).then(
				function success(response) {

					// if login not successful
					if (typeof(response.data.errors) != 'undefined') {
						callback(false, response.data.errors);
					}
					else { // else login successful
						console.log( loginUser.username,'is logged in.')
						console.log('response.data:', response.data)
						callback(true, response.data);
						
					};

				},
				function error(response) {
					console.log('Login failed: ' + response);
				}
			);
		}

		// call to register method of server user controller
		this.register = function(newUser, callback) {
			console.log('In userFactory register, posting for server routes')
			$http.post('/users/register', newUser).then(
				function success(response) {

					if (typeof(response.data.errors) != 'undefined') {
						//errors
						callback(false, response.data.errors);
					}
					else {
						// registration successful
						callback(true, response.data);
					}

				},
				function error(response) {
					console.log('Registration failed: ' + response);
				}
			);
		};

		// get user info when they login or register
		this.show = function(user_id, callback) {
			$http.get('/users/' + user_id).then(
				function success(response) {
					callback(response.data);
				},
				function error(response) {
					console.log('[Show: ERROR] failed to retrieve users information: ' + response);
				}
			);
		}
	}

	return new UserFactory();
}]);




// //userFactory
// app.factory("userFactory", ['$http', function($http) {

// 	function UserFactory() {

// 		// call to login method of server user controller
// 		this.login = function(loginUser, callback) {
			
// 			console.log('In userFactory login, posting for server routes')
// 			$http.post('/users/login', loginUser).then(
// 				function success(response) {

// 					// if login not successful
// 					if (typeof(response.data.errors) != 'undefined') {
// 						callback(false, response.data.errors);
// 					}
// 					else { // else login successful
// 				 		callback(true, response.data);
// 				 		console.log("Login OK:", response.data)
// 					}

// 				},
// 				function error(response) {
// 					console.log('Login failed: ' + response);
// 				}
// 			);
				
			
// 		}

// 		// call to register method of server user controller
// 		this.register = function(newUser, callback) {
// 			console.log('In userFactory register, posting for server routes')
// 			$http.post('/users/register', newUser).then(
// 				function success(response) {

// 					if (typeof(response.data.errors) != 'undefined') {
// 						//errors
// 						callback(false, response.data.errors);
// 					}
// 					else {
// 						// registration successful
// 						callback(true, response.data);
// 					}

// 				},
// 				function error(response) {
// 					console.log('Registration failed: ' + response);
// 				}
// 			);
// 		};

// 	}


// 	return new UserFactory();
// }]);