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

var User = mongoose.model('User', userSchema);

modue.exports = {
	User: User
};