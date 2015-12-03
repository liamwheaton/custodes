angular.module('app.controllers')

.controller('regCtrl', function($scope, $rootScope, $location, AuthenticationService) {

	$scope.pageClass = 'page-reg';

	AuthenticationService.ClearCredentials();

	$scope.signUp = function() {

		AuthenticationService.SignUp($scope.username, $scope.password, function(response) {
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