var mongoose = require('mongoose');

// Create schema
var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

// Export schema
module.exports = UserSchema;

