app.controller('HomeController', ['$scope', '$location', '$cookies', 'userFactory', function($scope, $location, $cookies, userFactory) {

	(function (){
		if ($cookies.get('user_id') == undefined) {
		 	$location.url('/login');
		}
		else {
			userFactory.show($cookies.get('user_id'), function(response) {
				$scope.user = {
					email: response.email,
					first_name: response.first_name,
					last_name: response.last_name,
					birthday: response.birthday,
					joined_on: response.createdAt
				}
			});
		}
	})();

	// user logout; remove the cookie user_id and redirect
	$scope.logout = function () {
		$cookies.remove('user_id');
		$location.url('/login');
	}

}]);