// var restful = require('node-restful');

var User = require('../models/user.js');

// GET users

exports.getUsers = function(req, res) {

	User.find(function(err, users) {
		if (err)
			res.send(err);
		res.json(users);
	});
};


// POST users

exports.postUsers = function(req, res) {
	
	if(!req.body.username || !req.body.password) {
		res.json({ message: 'No username or password - Error processing request' });
		return;
	} 
	var user = new User({
		username: req.body.username,
		password: req.body.password
	});

	user.save(function(err) {
		if(err) {
			res.json({ message: 'Save error - Failed to create account' });
			return;
		}
		res.json({ success: 'Account created' });
	});
};

// Auth user

exports.authenticateUser = function(req, res) {

	if(!req.body.username || !req.body.password ) {
		res.json({ message: 'Error processing request' });
		return;
	}
	User.findOne({ username: req.body.username }, function(err, user) {
		if(!user) {
			res.json({ message: 'That username does not exist' });
			return;
		}
		user.verifyPassword(req.body.password, function(err, isMatch) {
			if(err) {
				res.json({ message: err });
				return;
			} else if(!isMatch) {
				res.json({ message: 'Password incorrect' });
				return;
			} else {
				res.json({ success: 'Authenticated' });
			}
		});
	});
};





//NodeRestful

// module.exports = function(app, route) {

// 	// Add REST
// 	var rest = restful.model(
// 		'user',
// 		app.models.user
// 		).methods(['get', 'put', 'post', 'delete']);

// 	// Register endpoint
// 	rest.register(app, route);

// 	// Return middleware
// 	return function(req, res, next) {
// 		next();
// 	};

// };