//user controller
app.controller('UserController', ['$scope', '$location', '$cookies', 'userFactory', function($scope, $location, $cookies, userFactory) {
  $scope.newUser = {
    password: "",
    confirm_password: ""
  };

  $scope.login = function() {
    console.log('In userController, calling factory login method');
   
    userFactory.login($scope.loginUser, function(status, response) {
      if (status == false) {
         // empty the password
        $scope.loginUser.password = "";
        $scope.loginError = response;
      } else {
        // clear login form and errors
        $scope.loginUser = {}; 
        $scope.loginError = {};
        // set cookies of user's id for retrieving users information later on
        $cookies.put('user_id', response._id);
        $location.url('/home');
      }
    });
  }

  $scope.register = function() {
    console.log('In userController, calling factory register method');
    if ($scope.newUser.password != $scope.newUser.confirm_password){
      $scope.match_fail = "Passwords do not match. Try again."
    } else {
      $scope.match_fail = '';
    
    userFactory.register($scope.newUser, function(status, response) {
      if (status == false){
        // show errors to the user;
          $scope.registerErrors = response;
        } else {
          // clear registeration form and errors
          $scope.newUser = {}; 
          $scope.registerErrors = {};
          // set cookies of user's id for retrieving users information later on
          $cookies.put('user_id', response._id);
          $location.url('/home');
        }
      console.log('Back from factory; response:', response)
    });
    }
  }

}]);
