var app = angular.module("friendsApp", ['ngRoute']);
app.config(function ($routeProvider) {
	$routeProvider
		.when('/new', {
			templateUrl: "partials/new.html"
		})
		.when('/edit/:id', {
			templateUrl: "partials/edit.html"
		})
})