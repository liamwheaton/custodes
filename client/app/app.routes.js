angular.module('app.routes')

.config(function($routeProvider) {

	$routeProvider
	
		.when('/', {
			controller: 'landingCtrl',
			templateUrl: 'views/landing.html'
		})

		.when('/login', {
			controller: 'loginCtrl',
			templateUrl: 'views/login.html'
		})

		.when('/register', {
			controller: 'regCtrl',
			templateUrl: 'views/register.html'
		})

		.when('/map', {
			controller: 'mapCtrl',
			templateUrl: 'views/map.html'
		})

		.otherwise({
			redirectTo: '/'
		});


});