angular.module('app.routes')

.config(function($routeProvider) {

	$routeProvider
	
		.when('/', {
			controller: 'loginCtrl',
			templateUrl: 'views/landing.html'
		})

		.when('/map', {
			controller: 'mapCtrl',
			templateUrl: 'views/map.html'
		})

		.otherwise({
			redirectTo: '/'
		});


});