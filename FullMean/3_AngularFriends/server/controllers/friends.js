console.log('friends controller');
// WE NEED TO ADD A FEW lines of code here!
// How does a controller talk to mongoose and get a model?

var mongoose = require('mongoose');
var Friend = mongoose.model('Friend');

// Build out the methods in the friendsControllers below
function FriendsController(){
  this.index = function(req,res){
    //your code here
    Friend.find({}, function(err, friends){
      if(err) {
        console.log('Failed to find:', err);
      } else {
        console.log('Found:', friends)
        res.json(friends);
      }
    })    
  },

  this.create = function(req,res){
    var friend = new Friend(req.body);
    friend.save(function(err){
      if (err){
        console.log('Failed to create:', err);
        res.render('/friends/new', {errors: friend.errors});
      } else {
        console.log('Successfully added record to db');
        // res.json({placeholder:'create'});
        res.redirect('/friends');
      }
    })  
  },

  this.update = function(req,res){
    Friend.findOne({_id: req.params.id}, function (err, friend){
      if (err){
        console.log ('something went wrong', err);
      } else {
        friend.first_name = req.body.first_name;
        friend.last_name = req.body.last_name;
        friend.birthday = req.body.birthday;

        friend.save(function (err){
          if (err) {
            console.log('something went wrong ', err);
            res.render('/friends/edit', {errors: friends.errors});
          } else {
            // if save was successful awesome!
            // res.json({placeholder:'update'});
            res.redirect('/friends/' + req.params.id);
          };       
        });
      };  
    });
  },
    
  this.delete = function(req,res){
    Friend.remove(req.params, function(err){
      if(err){
        console.log('Unable to delete record', err);
        res.render('/friends', {errors: friends.errors});
        return;
      };
      // res.json({placeholder:'delete'});
      res.redirect('/');
    });
  },
   
  this.show = function(req,res){
    Friend.findOne({ _id: req.params.id }, function(err, friend) {
      if (err) {
        console.log("Failed to find record: ", err);
        res.redirect('/friends');
      }
      else {
        console.log("Found record");
        res.json(friend);
      }
    })
  };
}
module.exports = new FriendsController(); // what does this export?