angular.module('app.routes')

.config(function($routeProvider, RestangularProvider, uiGmapGoogleMapApiProvider) { 

	uiGmapGoogleMapApiProvider.configure({
		key: 'AIzaSyBY72HDRm-tIkHB7naH0pykymeIwl3ibGI'
	});

	RestangularProvider.setBaseUrl('http://127.0.0.1:3000');

	$routeProvider
	
		.when('/', {
			controller: 'landingCtrl',
			templateUrl: 'views/landing.html'
		})

		.when('/user/login', {
			controller: 'loginCtrl',
			templateUrl: 'views/login.html'
		})

		.when('/user/register', {
			controller: 'regCtrl',
			templateUrl: 'views/register.html'
		})

		.when('/user/:id/edit', {
			controller: 'editCtrl',
			templateUrl: 'views/edit.html'
		})

		.when('/user/:id/delete', {
			controller: 'deleteCtrl'
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
		RestangularConfigurer.setRestangularFields({
			id: '_id'
		});
	});
})
.factory('PinRestangular', function(Restangular){
	return Restangular.withConfig(function(RestangularConfigurer){
		RestangularConfigurer.setRestangularFields({
			id: '_id'
		});
	});
})
.factory('User', function(UserRestangular){
	return UserRestangular.service('user');
})
.factory('Pin', function(UserRestangular){
	return UserRestangular.service('pin');
});