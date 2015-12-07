var User = require('../models/user.js');

// GET users

exports.getUsers = function(req, res) {

	User.find(function(err, users) {
		if (err)
			res.send(err);
		res.json(users);
	});
};

// Get user by username

exports.getUserByUsername = function(req, res) {
	User.findOne({
		username: req.params.username
	}, function(err, user) {
		if (err)
			res.send(err);

		res.json(user);
	});
};

// exports.getUserByEmail = function(req, res) {
// 	User.findOne({
// 		email: req.params.email
// 	}, function(err, user) {
// 		if (err)
// 			res.send(err);

// 		res.json(user);
// 	});
// };

// POST users

exports.postUsers = function(req, res) {
	
	if(!req.body.username || !req.body.email || !req.body.password) {
		res.json({ message: 'Error processing request' });
		return;
	} 
	var user = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	});

	user.save(function(err) {
		if(err) {
			res.json({ message: 'Error saving' });
			return;
		}
		res.json({ success: 'Account created' });
	});
};

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