// set up ========================

var express = require('express');
var app = express();                               // create our app w/ express
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cookieParser = require('cookie-parser');

// database =================

//require('./configs/database.config')('localhost', 'hellogreen');

// configuration =================

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cookieParser());

// load the routes =================

require('./routes/index.route')(app);

// listen (start app with node server.js) ======================================
var server = app.listen(3000, 'localhost', function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log("App listening at http://%s:%s", host, port);
});

module.exports = app;
