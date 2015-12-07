var mongoose = require('mongoose');

var PinSchema = new mongoose.Schema({

	id: { type: Number },
	userId: { type: String },
	username: { type: String},
	latitude: { type: Number },
	longitude: { type: Number},
	voteUp: { type: Number },
	voteDown: { type: Number }
});

//Add userId to pin
// PinSchema.pre('save', function(next){
	
// });
// Export schema
module.exports = mongoose.model('Pin', PinSchema);
