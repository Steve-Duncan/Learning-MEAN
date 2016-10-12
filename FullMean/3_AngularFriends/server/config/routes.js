console.log('routes');
var friends = require('./../controllers/friends');

// var app = angular.module('friendsApp', ['ngRoute']);


// What is this 'friends' object we are referencing below??
module.exports = function(app){
  app.get('/friends', friends.index);
  app.get('/friends/:id', friends.show);
  app.post('/friends', friends.create);
  app.put('/friends/:id', friends.update);
  app.delete('/friends/:id', friends.delete);
}
// this adds route listeners to friends for 5 of the 7 RESTful routes, excluding new and edit.

