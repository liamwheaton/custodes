angular.module('app.routes')

.config(function($routeProvider, RestangularProvider) { 

	RestangularProvider.setBaseUrl('http://localhost:3000');

	$routeProvider
	
		.when('/', {
			controller: 'landingCtrl',
			templateUrl: 'views/landing.html'
		})

		.when('/users/login', {
			controller: 'loginCtrl',
			templateUrl: 'views/login.html'
		})

		.when('/users/register', {
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

})
.factory('UserRestangular', function(Restangular){
	return Restangular.withConfig(function(RestangularConfigurer){
		RestangularConfigurer.SetRestangularfields({
			id: '_id'
		});
	});
})
.factory('User', function(UserRestangular){
	return UserRestangular.service('user');
});