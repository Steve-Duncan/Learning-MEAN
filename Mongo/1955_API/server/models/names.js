var mongoose = require('mongoose');

//create schema for names
var NameSchema = new mongoose.Schema({
	name: {type: String}
});

//name the schema 'Name'
mongoose.model('Name', NameSchema);