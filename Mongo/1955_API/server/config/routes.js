var namesController = require('./../controllers/names');

module.exports = function (app){

	//render all names
	app.get('/', namesController.show_all);

	//add new name
	app.get('/new/:name/', namesController.create);

	//remove a name
	app.get('/remove/:name/', namesController.remove);

	//show document for particular person
	app.get('/:name', namesController.show_one);
};