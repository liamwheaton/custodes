var mongoose = require('mongoose');

// Create schema
var PinSchema = new mongoose.Schema({
	userId: String,
	title: String,
	id: Number,
	latitude: Number,
	longitude: Number,
	message: String
});

//Add userId to pin
// PinSchema.pre('save', function(next){
	
// });
// Export schema
module.exports = mongoose.model('Pin', PinSchema);
