module.exports=function (app, Animal){
	app.get('/', function (request, response){
		//get users from database
		Animal.find({},function (err, all_animals){
			var animals = all_animals
			// console.log ('finding animals...', animals)
			response.render('pages/index', {animals: animals});
		});		
	});

	//render page to add another animal
	app.get('/animals', function (request, response){
		response.render('pages/add')
	});

	//add new animal to database
	app.post('/animals', function (request, response){
		result = request.body;
	 	var animal = new Animal({
	 		type: request.body.type,
	 		color: request.body.color,
	 		weight: request.body.weight,
	 		range: request.body.range
	 	});
		animal.save(function (err){
			if(err){
				console.log('something went wrong');
			} else {
				console.log('successfully added an animal');
				response.redirect('/');
			};
		});	
	});

	//show an animal
	app.get('/animals/:id', function (request, response){
		console.log('find animal with id: ', request.params.id)
		Animal.find({_id:request.params.id}, function (err, animal){
			response.render('pages/info', {animal: animal});
		});		
	});

	// edit an animal
	app.get('/animals/:id/edit', function (request, response){
		console.log('in edit animals...')
		Animal.find({_id:request.params.id}, function (err, animal){
			if (err){
				console.log('something went wrong: ', err);
			} else {
				response.render('pages/info', {animal: animal})
			};
		});
	});

	//update the animal to the database
	app.post('/animals/:id/edit', function (request, response){
		console.log('saving animal...')
		Animal.findOne({_id: request.params.id}, function (err, animal){
			if (err){
				console.log ('something went wrong', err);
			} else {
				animal.type = request.body.type;
				animal.color = request.body.color;
				animal.weight = request.body.weight;
				animal.range = request.body.range;

				animal.save(function (err){
					if (err) {
						console.log('something went wrong ', err);
					} else {
						// if save was successful awesome!
						response.redirect('/animals/' + request.params.id);
					};
				
				});
			};	
		});
	});

	//remove an animal
	app.post('/animals/:id/delete', function (request, response){
		Animal.remove({_id: request.params.id}, function(err){
			if (err){
				console.log('something went wrong ', err);
			} else {
				response.redirect('/');
			};
		})
	});
};