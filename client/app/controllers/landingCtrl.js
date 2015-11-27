angular.module('app.controllers')

.controller('landingCtrl', function($scope, AuthenticationService, $rootScope) {
	$scope.pageClass = 'page-landing';
	console.log($rootScope);
});