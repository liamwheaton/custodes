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
	.post(pinController.postPins)
	.get(pinController.getPins);

// router.route('/pins/:pin_id')
// 	// .get(authController.isAuthenticated, pinController.getPin)
// 	.put(authController.isAuthenticated, pinController.putPin)
// 	.delete(authController.isAuthenticated, pinController.deletePin);

router.route('/users')
	.post(userController.postUsers)
	.get(authController.isAuthenticated, userController.getUsers);

router.route('/users/:username')
	.get(userController.getUserByUsername);
	
router.route('/authenticate')
	.post(userController.authenticateUser);

app.use('/api', router);

app.use(express.static(path.join(__dirname, '../client')));

console.log('Listening on 3000');
app.listen(process.env.PORT || 3000);