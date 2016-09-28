//this is a controller file

var mongoose = require('mongoose');
var Animal = mongoose.model('Animal');

module.exports = {

	//render the index page
	index: function (req, res){
		Animal.find({},function (err, data){
			if (err){
				console.log(err);
				return;
			};
			res.render('index', {animals: data});
		});		
	},

	//add a new animal
	create: function (req, res){
	 	var animal = new Animal({
	 		type: req.body.type,
	 		color: req.body.color,
	 		weight: req.body.weight,
	 		range: req.body.range
	 	});
		animal.save(function (err){
			if(err){
				console.log('something went wrong');
			} else {
				res.redirect('/');
			};
		});	
	},

	//show one animal
	show: function (req, res){
		Animal.find({_id:req.params.id}, function (err, animal){
			res.render('info', {animal: animal});
		});	
	},

	//edit an animal
	update: function (req, res) {
		Animal.findOne({_id: req.params.id}, function (err, animal){
			if (err){
				console.log ('something went wrong', err);
			} else {
				animal.type = req.body.type;
				animal.color = req.body.color;
				animal.weight = req.body.weight;
				animal.range = req.body.range;

				animal.save(function (err){
					if (err) {
						console.log('something went wrong ', err);
					} else {
						// if save was successful awesome!
						res.redirect('/animals/' + req.params.id);
					};
				
				});
			};	
		});
	},

	//delete an animal
	delete: function (req, res){
		Animal.remove({_id: req.params.id}, function(err){
			if (err){
				console.log('something went wrong ', err);
			} else {
				res.redirect('/');
			};
		})
	}
			
};