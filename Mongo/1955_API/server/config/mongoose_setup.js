var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

//connect to database
mongoose.connect('mongodb://localhost/namesAPI');

//set path for models files
var models_path = path.join(__dirname, './../models');

//require any js files in models dir 
fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('js') > 0){
		require(models_path + '/' + file);
	};
});