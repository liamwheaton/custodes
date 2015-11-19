var User = require('../models/user.js').User;

exports.addUser = function(user, next) {
	var newUser = new User({
		username: user.username,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		password: user.password,		
	});

	newUser.save(function(err) {
		if (err) {
			return next(err);
		}
		next(null);
	});
};

