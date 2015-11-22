angular.module('app.controllers')

.controller('regCtrl', function($scope, User, $location) {
	$scope.pageClass = 'page-reg';

	$scope.user = {};
	$scope.saveUser = function(){
		User.post($scope.user).then(function(){
			$location.path('/user/login');
		});
	};
});