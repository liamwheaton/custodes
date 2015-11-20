var restful = require('node-restful');

module.exports = function(app, route) {

	// Add REST
	var rest = restful.model(
		'user',
		app.models.user
		).methods(['get', 'put', 'post', 'delete']);

	// Register endpoint
	rest.register(app, '/user');

	// Return middleware
	return function(req, res, next) {
		next();
	};

};