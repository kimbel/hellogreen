/** PRIVATE LICENSE **/

var Mongoose = require('mongoose');

module.exports = function(url, database) {

	// Build the connection string 
	var mongoURI = 'mongodb://' + url + '/' + database; 

	// Create the database connection 
	Mongoose.connect(url, database);

	// CONNECTION EVENTS 
	// When successfully connected 
	Mongoose.connection.on('connected', function() {
	  	console.log('Mongoose connection open');
	}); 

	// If the connection throws an error 
	Mongoose.connection.on('error',function(err) { 
		console.log('Mongoose connection error: ' + err);
	}); 

	// When the connection is disconnected 
	Mongoose.connection.on('disconnected', function() { 
	  	console.log('Mongoose connection disconnected'); 
	});

	// If the Node process ends, close the Mongoose connection 
	process.on('SIGINT', function() {  
		Mongoose.connection.close(function() { 
			console.log('Mongoose connection disconnected through app termination'); 
		    process.exit(0); 
		}); 
	});
};