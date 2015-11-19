angular.module('app.controllers')

.controller('loginCtrl', function($scope, $http) {

	$scope.pageClass = 'page-login';

	$http.get('/users').success(function(response){
		console.log('data recieved');
		$scope.users = response;
	});

});