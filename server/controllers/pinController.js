// var restful = require('node-restful');
var User = require('../models/user.js'); 
var Pin = require('../models/pin.js'); 
var mongoose = require('../node_modules/mongoose');

// POST Pins

exports.postPins = function(req, res) {

    if(!req.body.latitude || !req.body.latitude) {
        res.json({ message: 'Error processing request' });
        return;
    }

    var pin = new Pin({
        id: req.body.id,
        username: req.body.username,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    pin.save(function(err) {
        if(err) {
            res.json({ message: 'Error saving' });
            return;
        }
        res.json({ success: 'Pin saved' });
    });
};

// GET pins

exports.getPins = function(req, res) {
    Pin.find({}, function(err, pins) {
        if (err)
            res.send(err);
        res.json(pins);
    });
};


// DELETE Pins

// exports.deletePin = function(req, res) {
//  // When votevount reaches a certain point or timer elapses delete
// };

//UPDATE Pin count

// exports.putPin = function(req, res) {
//  // update the votecount?
// };



// POST *****************

// exports.postPins = function(req, res) {

//     // New pin instance
//     var pin = new Pin();

//     // Set the pin properties from POST
//     console.log(req.body.message);
//     console.log(req.body.latitude);
//     console.log(req.body.longitude);

//     pin.latitude = req.body.latitude;
//     pin.longitude = req.body.longitude;
//     pin.message = req.body.message;

//     //passport will automatically set the user id
//     pin.userId = req.user._id;

//     // Save pin and check f
//     pin.save(function(err) {
//         if (err){
//             res.send(err);
//             return;
//         }

//         res.json({
//             success: 'Pin added successfully',
//             data: pin
//         });
//     });
// };

// // GET Pins *************

// exports.getPins = function(req, res) {
// 	// Use pin model to find all pins
// 	//from user username
// 	Pin.find({}).lean().exec(function(err, pins){
// 		if(err){
// 			res.send(err);
// 			return;
// 		}
// 		// Set username on each pin 
// 		var counter = 0;
// 		var l = pins.length;

// 		// Create closure to access pin
// 		var closure = function(pin){
// 			return function(err, user){
// 				counter++;

// 				if(err)
// 					res.send(err);

// 				pin.username = user.username;

// 				// when users have been set
// 				if(counter === l) {
// 					res.json(pins);
// 					return;
// 				}
// 			};
// 		};
// 		// Iterate through pins to find associated usernames
// 		for (var i = 0; i < l; i++) {
// 			User.findById(pins[i].userId, closure(pins[i]));
// 		}
// 	});
// };
// // ==============
// //GET pins by distance to user?
// // ==============
// // Create endpoint /api/pins/:pin_id for GET
// exports.getPin = function(req, res) {
//     // Use the Pin model to find a specific pin
//     console.log(req.user._id);
//     Pin.find({
//         userId: req.user._id,
//         _id: req.params.pin_id
//     }, function(err, pin) {
//         if (err)
//             res.send(err);

//         res.json(pin);
//     });
// };
// // Update a Pin *****************

// exports.putPin = function(req, res) {
// 	// update the votecount?
// };

// // DELETE pin ********************

// exports.deletePin = function(req, res) {
// 	// When votevount reaches a certain point or timer elapses delete
// };


