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
		console.log($scope.myPosition);
	});

	$geolocation.watchPosition({
		timeout: 60000,
		maximumAge: 250,
		enableHighAccuracy: true
	});

	$scope.Markers = [];
	
	$scope.add = function() {

		$scope.Markers.push({
			latitude: $scope.myPosition.coords.latitude,
			longitude: $scope.myPosition.coords.longitude,
			title: 'test',
			id: new Date().valueOf()
		});
       
    };

	$scope.$watch('myPosition.coords', function (newValue, oldValue){

		$scope.map = {
			center: {
				latitude: newValue.latitude,
				longitude: newValue.longitude
			},
			zoom: 16
		};
	});	
});