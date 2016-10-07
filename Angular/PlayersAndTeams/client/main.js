var app = angular.module('playersApp', ['ngRoute']);

//configure routes
app.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'partials/players.html',
			controller: 'PlayersController'
		})
		.when('/teams',{
			templateUrl: 'partials/teams.html',
			controller: 'TeamsController'
		})
		.when('/associations',{
			templateUrl: 'partials/associations.html',
			controller: 'AssociationsController'
		})
		.otherwise({
			redirectTo: '/players'
	});
});

//configure player factory
app.factory('playerFactory',['$http', function($http){
	var factory = {};
	//load array with sample data
	var players = [
		{name: 'Takuma', team: 'Cowboys'},
		{name: 'John', team: '49ers'},
		{name: 'Yoko', team: 'Red Pandas'}
	];

	//return player list to controller
	factory.index = function(callback){
		callback(players);
	}

	//create new player
	factory.create = function(newPlayer){
		newPlayer.team = '';
		players.push(newPlayer);
		// callback(players);
	}

	//delete a player
	factory.delete = function(index, callback){
		players.splice(index, 1);
		callback(players);
	}

	//assign a player to a team
	factory.addPlayerToTeam = function(data){
		players[data.player].team = data.team;
	}

	//remove player from a team
	factory.removePlayerFromTeam = function(index){
		players[index].team = '';
	}

	return factory;
}]);

//configure team factory
app.factory('teamFactory', ['$http', function($http){
	var factory = {};
	//load array with sample data
	var teams = [
		{name: 'Cowboys'},
		{name: '49ers'},
		{name: 'Red Pandas'},
		{name: 'TrailBlazers'}
	];

	//return team list to controller
	factory.index = function(callback){
		callback(teams);
	}

	//create a new team
	factory.create = function(newTeam){
		teams.push(newTeam);
	}

	//delete a team
	factory.delete = function(index){
		teams.splice(index, 1);
	}

	return factory;
}]);

//configure players controller
app.controller('PlayersController', ['$scope', 'playerFactory', '$location', function ($scope, playerFactory, $location){
	function getPlayers(data){
		$scope.players = data;
	}

	//get players from players factory
	playerFactory.index(getPlayers);

	//call factory to create new player
	$scope.createPlayer = function(){
		playerFactory.create($scope.newPlayer);
		$scope.newPlayer = {};
	}

	//call factory to delete player
	$scope.deletePlayer = function(index){
		playerFactory.delete(index, getPlayers);
	}
}]);

//configure teams controller
app.controller('TeamsController', ['$scope', 'teamFactory', function ($scope, teamFactory){
	function getTeams(data){
		$scope.teams = data;
	}

	//get teams from team factory
	teamFactory.index(getTeams);

	//call factory to create new team
	$scope.createTeam = function(){
		teamFactory.create($scope.newTeam);
		$scope.newTeam = {};	
	}

	//call factory to delete team
	$scope.deleteTeam = function(index){
		teamFactory.delete(index, getTeams);
	}
}])

//configure associations controller
app.controller('AssociationsController', ['$scope', 'playerFactory', 'teamFactory', function($scope, playerFactory, teamFactory){
	$scope.players = [];
	$scope.teams = [];

	//get players and teams
	function getPlayers(data){
		$scope.players = data;
	}
	function getTeams(data){
		$scope.teams = data;
	}

	playerFactory.index(getPlayers);
	teamFactory.index(getTeams);

	//assign player to team
	$scope.addPlayerToTeam = function(index){
		playerFactory.addPlayerToTeam($scope.newAssoc);
	}

	//remove player from team
	$scope.removePlayerFromTeam = function(index){
		playerFactory.removePlayerFromTeam(index);
	}
}])