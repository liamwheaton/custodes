var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Create schema
var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});


// Execute before each save() call
UserSchema.pre('save', function(next){
	var user = this;

	// If user is not modified break out
	if(!user.isModified('password')) return next();

	// Otherwise generate salt for the password
	bcrypt.genSalt(5, function(err, salt){
		if(err) return next(err);

		// Assign hash to user password
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

// Compare/verify passwords method
UserSchema.methods.verifyPassword = function(password, cb) {
	bcrypt.compare(password, this.password, function(err, isMatch){
		if(err) return cb(err);
		cb(null, isMatch);
	});
};

// Export schema
module.exports = mongoose.model('User', UserSchema);

