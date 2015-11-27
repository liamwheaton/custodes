angular.module('app.controllers')

.controller('regCtrl', function($scope, $rootScope, $location, AuthenticationService){
	$scope.pageClass = 'page-reg';

	// reset login status
	AuthenticationService.ClearCredentials();

	$scope.SignUp = function() {

		$scope.dataLoading = true;

		// call register method
		AuthenticationService.SignUp($scope.username, $scope.password, function(response){
			if (response.success) {
				AuthenticationService.SetCredentials($scope.username, $scope.password);
				$location.path('/map');
			} else {
				$scope.error = response.message;
				$scope.dataLoading = false;
			}
		}); 

	};

});







// noderestful
// .controller('regCtrl', function($scope, User, $location) {
// 	$scope.pageClass = 'page-reg';

// 	$scope.user = {};
// 	$scope.saveUser = function(){
// 		User.post($scope.user).then(function(){
// 			$location.path('/user/login');
// 		});
// 	};
// });