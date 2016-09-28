//import controller file
var animalsController = require('./../controllers/animals')

module.exports =function (app){

	//render index page
	app.get('/', function (req, res){
		console.log('In routes, trying to call controller...');
		animalsController.index(req, res);
	});

	//render page to add another animal
	app.get('/animals', function (req, res){
		res.render('add')
	});

	//add new animal to database
	app.post('/animals', function (req, res){
		animalsController.create(req, res);
	});

	//show an animal
	app.get('/animals/:id', function (req, res){
		animalsController.show(req, res);	
	});

	//update the animal to the database
	app.post('/animals/:id/update', function (req, res){
		animalsController.update(req, res);
	});

	//remove an animal
	app.post('/animals/:id/delete', function (req, res){
		animalsController.delete(req, res);
	});
};