var passport = require('passport');

// Passport basic strategy
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user.js');

passport.use(new BasicStrategy(
	function(username, password, next) {
		User.findOne({ username: username}, function (err, user){ //Is this the mongo User ref?
			if (err) { return next(err); }

			// No user found in database
			if(!user) { return next(null, false); }

			// Verify password
			user.verifyPassword(password, function(err, isMatch){
				if(err) { return next(err); }

				// If password doesn't match do not return next
				if (!isMatch) { return next(null, false); }

				// If success return next
				return next(null, user);
			});
		});
	}
));

// Export isAuthenticated function
// Tell passport to use basic strat
// Do not store session variables
exports.isAuthenticated = passport.authenticate('basic', { session : false });