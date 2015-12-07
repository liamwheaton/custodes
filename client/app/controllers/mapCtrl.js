angular.module('app.controllers')

.controller('mapCtrl', function($scope, $rootScope, $location, $http, AuthenticationService, uiGmapGoogleMapApi, $geolocation, PinService) {
	
	// Drawer class animation

	$scope.pageClass = 'page-map';
	$scope.class = 'close';

	$scope.changeClass = function(){
		if ($scope.class === 'close')
			$scope.class = 'open';
		else 
			$scope.class = 'close';
	};

	// Logout Function

	$scope.logout = function() {
        AuthenticationService.ClearCredentials();
        $location.path('/');
    };

	// Map Geolocation

	$geolocation.getCurrentPosition({
		timeout: 60000
	}).then(function(position) {
		$scope.myPosition = position;
	});

	$geolocation.watchPosition({
		timeout: 60000,
		maximumAge: 250,
		enableHighAccuracy: true
	});

	$scope.$watch('myPosition.coords', function (newValue, oldValue){

		$scope.map = {
			center: {
				latitude: newValue.latitude,
				longitude: newValue.longitude
			},
			zoom: 16
		};
	});

	// Add marker function

	$scope.Markers = [];

	$scope.add = function() {

		var pinData = {
			id: Math.random(),
			username: $rootScope.globals.currentUser.username,
			latitude: $scope.myPosition.coords.latitude, 
			longitude: $scope.myPosition.coords.longitude
			// location: [$scope.myPosition.coords.longitude, $scope.myPosition.coords.latitude]
		};

		console.log(pinData);

		PinService.Add( pinData, function(response) {
				if(response.success) {
					
				} else {
					$scope.error = response.message;
				}
		});

		$scope.Markers.push({
			latitude: $scope.myPosition.coords.latitude,
			longitude: $scope.myPosition.coords.longitude,
			username: $rootScope.globals.currentUser.username,
			id: Math.random()
		});

       console.log($scope);
    };
    
    // Open window function

    $scope.onClick = function(marker, eventName, model) {
    	model.show = !model.show;
    };

	// Recenter function

	$scope.recenter = function() {
		$scope.$watch('myPosition.coords', function (newValue, oldValue){

			$scope.map = {
				center: {
					latitude: newValue.latitude,
					longitude: newValue.longitude
				},
				zoom: 16
			};
		});
	};
});