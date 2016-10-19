var mongoose = require('mongoose'),
    fs = require('fs'),
	path = require('path'),
	models_path = path.join( __dirname, "../models"),
	// regex to get .js files 
	reg = new RegExp( ".js$", "i" ),
	
	//set database name
    dbURI = 'mongodb://localhost/mean_db';
	
// connect to the database
mongoose.connect( dbURI );

//connection events
//When successfully connected
mongoose.connection.on( 'connected', function () {
	console.log( 'Mongoose default connection open to ${ dbURI }' );
});

//If connection error
mongoose.connection.on( 'error', function ( err ) {
	console.error( 'Mongoose default connection error: ${ err }' );
});

// On connection disconnect
mongoose.connection.on( 'disconnected', function () {
	console.log( 'Mongoose default connection disconnected' );
});

//if the Node process ends, close the Mongoose connection
process.on( 'SIGINT', function() {
	mongoose.connection.close( function () {
		console.log( 'Mongoose default connection disconnected through app termination' );
		process.exit( 0 );
	});
});

//import all .js files in models folder
fs.readdirSync( models_path ).forEach( function( file ) {
	if( reg.test( file ) ) {
		require( path.join( models_path, file ) );
	}
});