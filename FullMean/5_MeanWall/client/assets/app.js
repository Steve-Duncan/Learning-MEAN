//instantiate module and inject dependencies
var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngMessages']);


//configure routes
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
		.when('/login', {
            templateUrl: "partials/login.html",
            controller: "UserController"
        })

        .when('/register', {
			templateUrl: "partials/register.html",
			controller: "UserController"
		})

        .when('/wall', {
            templateUrl: "partials/wall.html",
            controller: "WallController"
        })

        .otherwise({
            redirectTo: '/login'
        });
}]);