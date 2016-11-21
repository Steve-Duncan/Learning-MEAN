//user controller
app.controller('UserController', ['$scope', '$location', '$cookies', 'userFactory', function($scope, $location, $cookies, userFactory) {

	$scope.login = function(){
		console.log('In userController, calling factory login method');
		// call factory login method
		userFactory.login($scope.loginUser, function(status, response) {
			console.log('Back in UserController')	
			if (status == false) {
				// login failed
				// empty the password
				$scope.loginUser.password = "";
				$scope.loginError = response;
				
				} else {

				// clear login form and errors
					$scope.loginUser = {}; 
					$scope.loginError = {};
					// set cookies of user's id for retrieving users information later on
					console.log('Login successful; storing username in cookies')
					$cookies.put('username', response.username);
					console.log('Cookie set for', response.username)
					// send to the wall view
					$location.url('/wall');
				} 
		});
	};

	$scope.register = function() {
		console.log('In userController register method');

		if ($scope.newUser.password != $scope.newUser.password_confirm){
			//clear password fields
			// $scope.newUser.password = ''
			// $scope.newUser.password_confirm = ''
			$scope.match_fail = "Passwords do not match. Try again."
			
		} else {
			$scope.match_fail = '';
			console.log('Calling factory register method');
			userFactory.register($scope.newUser, function(status, response) {
				if (status == false){
					// show errors to the user;
					$scope.registerErrors = response;
				} else {
					// clear registration form and errors
					$scope.newUser = {}; 
					$scope.registerErrors = {};
					// set cookies of user's id for retrieving users information later on
					$cookies.put('username', response.username);
			
					console.log('Back from factory; response:', response)
					//send to the wall view
					$location.url('/wall');
				}
			});
		}
	};

 }]);