angular.module('app.controllers')

.controller('loginCtrl', function($scope, User, $routeParams) {

	$scope.pageClass = 'page-login';

	$scope.users = User.one($routeParams.id).get().$object;

});