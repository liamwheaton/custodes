angular.module('app.controllers')

.controller('loginCtrl', function($rootScope, $scope, $location, AuthenticationService) {

	$scope.pageClass = 'page-login';

	AuthenticationService.ClearCredentials();

	$scope.login = function() {
		
		AuthenticationService.Login($scope.username, $scope.password, function(response){
			if (response.success) {
				AuthenticationService.SetCredentials($scope.username, $scope.password);
				$location.path('/map');
			} else {
				$scope.error = response.message;
			}
		});
	};
	console.log($scope);
});