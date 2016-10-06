var app = angular.module('usersApp',['ngRoute']);

//configure routes
app.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'partials/customizeUsers.html'
		})
		.when('/listUsers',{
			templateUrl: 'partials/listUsers.html'
		})
		.otherwise({
			redirectTo: '/'
	});
});



//create factory and attach to module
app.factory('userFactory',['$http', function($http){
	var factory = {};
	var users = [];

	factory.index = function(callback){
		callback(users);
	}

	factory.getUsers = function(callback){
		callback(users);
	}

	factory.create = function(newUser, callback){
		users.push(newUser);
		callback(users);
	}
	factory.delete = function(index, callback){
		users.splice(index, 1);
		callback(users);
	}
	
	
	return factory;
}]);


//create users controller and attach to module
app.controller('UsersController', ['$scope', 'userFactory', '$location', function ($scope, userFactory, $location){
	
	function getUsers(data){
		$scope.users = data;
		// $scope.newUser = {};
	}

	userFactory.index(getUsers);

	$scope.createUser = function(){
		userFactory.create($scope.newUser, getUsers);
		$scope.newUser = {};
		$location.url('/listUsers')
	}

	$scope.deleteUser = function(index){
		userFactory.delete(index, getUsers);
	}

}]);

//create list controller and attach to module
app.controller('ListController', ['$scope', 'userFactory',  function ($scope, userFactory){
	function getUsers(data){
		$scope.users = data;
		$scope.newUser = {};
	}
	userFactory.index(getUsers);

}])