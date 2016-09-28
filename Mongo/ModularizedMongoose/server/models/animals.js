var mongoose = require('mongoose');

//create schema for animals
var AnimalSchema = new mongoose.Schema({
	type: {type: String},
	color: {type: String},
	weight: {type: Number},
	range: {type: String}
}, {timestamps: true});

//name the schema 'Animal'
mongoose.model('Animal', AnimalSchema);

