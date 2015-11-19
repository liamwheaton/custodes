var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	created: {type: Date, default: Date.now}
});

// Store the schema in a variable

var User = mongoose.model('User', userSchema);

// In order to export from the model

module.exports = {
	User: User
};