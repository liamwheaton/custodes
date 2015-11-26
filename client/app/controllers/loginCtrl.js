angular.module('app.controllers')

.controller('loginCtrl', function($rootScope, $scope, $location, AuthenticationService) {

	$scope.pageClass = 'page-login';

	// Reset login status
	AuthenticationService.ClearCredentials();

	$scope.login = function() {
		// Loading spinner
		$scope.dataLoading = true;

		// Log in with service
		AuthenticationService.Login($scope.username, $scope.password, function(response){
			if (response.success) {
				// Set credentials
				AuthenticationService.SetCredentials($scope.username, $scope.password);

				// redirect to map
				$location.path('/map');
			} else {
				// error
				$scope.error = response.message;

				$scope.dataLoading = false;
			}
		});
	};


	console.log($rootScope);
});