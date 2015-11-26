// Server 2.0

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var path = require('path');

// import controllers
var pinController = require('./controllers/pinController.js');
var userController = require('./controllers/userController.js');
var authController = require('./controllers/authController.js');

// connect to database
mongoose.connect('mongodb://127.0.0.1/custodes');

// create express app
var app = express();

// Body parser stuff
app.use(bodyParser.urlencoded({
  extended: true
}));
 
app.use(bodyParser.json({
}));

// initialize passport
app.use(passport.initialize());

// Create router
var router = express.Router();

router.route('/pins')
	.post(authController.isAuthenticated, pinController.postPins)
	.get(pinController.getPins);

router.route('/pins/:pin_id')
	.get(authController.isAuthenticated, pinController.getPin)
	.put(authController.isAuthenticated, pinController.putPin)
	.delete(authController.isAuthenticated, pinController.deletePin);

router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);
 
router.route('/authenticate')
  .post(userController.authenticateUser);


app.use('/api', router);

app.use(express.static(path.join(__dirname, '../client')));

console.log('Listening on 3000');
app.listen(process.env.PORT || 3000);





// Server 1.0

// // Define dependencies
// var express = require('express');
// var mongoose =require('mongoose');
// var bodyParser = require('body-parser');
// var methodOverride =require('method-override');
// var _ = require('lodash');
// var passport = require('passport');


// // Create the app
// var app = express();

// // Add the middleware for REST API
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(methodOverride('X-HTTP-Method-Overrride'));

// // CORS Support ****Research this
// app.use(function(req, res, next){
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
// 	res.header('Access-Control-Allow-Headers', 'Content-Type');
// 	next();
// });

// // Connect to Mongo
// mongoose.connect('mongodb://127.0.0.1/custodes', function(err) {
// 	if (err) throw err;
// });
// mongoose.connection.once('open', function(){

// 	// Load models
// 	app.models = require('./models/index.js');

// 	// Load routes
// 	var routes = require('./routes');
	
// 	// Iterate over each route in directory and assign the specified controller and url route
// 	_.each(routes, function(controller, route){
// 		app.use(route, controller(app, route));
// 	});

// 	console.log('Listening on port 3000');
// 	app.listen(3000);
// });