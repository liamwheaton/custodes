angular.module('app.controllers')

.controller('loginCtrl', function($scope, $http) {

	$scope.pageClass = 'page-login';

	$scope.users = [
	{
		username: 'user1',
		password: 'user1'
	},
	{
		username: 'user2',
		password: 'user2'
	}
	];

});