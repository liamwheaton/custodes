var mongoose = require('mongoose');

// Create schema
var PinSchema = new mongoose.Schema({
	userId: String,
	latitude: Number,
	longitude: Number,
	message: String
});

// Export schema
module.exports = mongoose.model('Pin', PinSchema);
