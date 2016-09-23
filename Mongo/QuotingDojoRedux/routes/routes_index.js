module.exports=function (app, Quote){
	var express = require('express');

	// GET home page. 
	app.get('/', function (req, res, next) {
	  res.render('pages/index', { title: 'Quoting Dojo' });
	});

	// GET quotes page. 
	app.get('/quotes', function (req, res){
		//get quotes from database
		Quote.find({},function (err, all_quotes){
			var quotes = all_quotes
			res.render('pages/quotes', {quotes: quotes, title: 'Quoting Dojo'});
		});		
		 
	});

	//ADD a new quote
	app.post('/quotes', function (req, res, next) {
		result = req.body;
		 	var quote = new Quote({
		 		name: req.body.name,
		 		quote: req.body.quote
		 	});
			quote.save(function (err){
				if(err){
					res.render('pages/error', {message: err.name, errors: err})
				} else {
					res.redirect('/quotes');
				};
			});	
	});

};