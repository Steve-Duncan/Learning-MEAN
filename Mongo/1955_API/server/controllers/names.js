var mongoose = require('mongoose');
var Name = mongoose.model('Name');

module.exports = {
	//show all
	show_all: function(req, res){
		Name.find({}, function (err, data){
			if (err){
				console.log(err);
				res.send(err);
				return;
			};
			res.json(data);
		})
	},

	//show record for selected user
	show_one: function(req, res){
		Name.findOne(req.params, function(err, data){
			if (err){
				console.log(err);
				res.send(err);
				return;
			};
			res.json(data);
		});
	},

	//create new record
	create: function(req, res){
		var name = new Name(req.params);
		name.save(function(err){
			if(err){
				console.log(err);
				res.send(err);
				return;
			};
			res.redirect('/');
		});
	},

	//remove record
	remove: function(req, res){
		Name.remove(req.params, function(err){
			if(err){
				console.log(err);
				res.send(err);
				return;
			};
			res.redirect('/');
		});
	},
};