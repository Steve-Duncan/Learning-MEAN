//instantiate module
var app = angular.module('login_registration', ['ngRoute', 'ngCookies', 'ngMessages']);

//configure routes
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
 
        .when('/login', {
            templateUrl: "partials/login.html",
            controller: "UserController"
        })

        .when('/home', {
            templateUrl: "partials/home.html",
            controller: "HomeController"
        })
        
        .when('/register', {
            templateUrl: "partials/register.html",
            controller: "UserController"
        })
        .otherwise({
            redirectTo: '/'
        });
}]);