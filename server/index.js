// Define dependencies
var express = require('express');
var mongoose =require('mongoose');
var bodyParser = require('body-parser');
var methodOverride =require('method-override');
var _ = require('lodash');


// Create the app
var app = express();

// Add the middleware for REST API
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Overrride'));

// CORS Support ****Research this
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// Connect to Mongo
mongoose.connect('mongodb://localhost/custodes');
mongoose.connection.once('open', function(){

	// Load models
	app.models = require('./models/index.js');

	// Load routes
	var routes = require('./routes');
	
	// Iterate over each route in directory and assign the specified controller and url route
	_.each(routes, function(controller, route){
		app.use(route, controller(app, route));
	});

	console.log('Listening on port 3000');
	app.listen(3000);
});