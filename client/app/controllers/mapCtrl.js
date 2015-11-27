angular.module('app.controllers')

.controller('mapCtrl', function($scope, $rootScope, $location, AuthenticationService, uiGmapGoogleMapApi, $geolocation) {

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
 
        //we clear the credentials from storage
        AuthenticationService.ClearCredentials();
 
        //we relocate to login page
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
			zoom: 16,
			bounds: {}
		};

		// markers

		var createRandomMarker = function(i, bounds, idKey) {

			var lat_min = bounds.southwest.latitude,
			lat_range = bounds.northeast.latitude - lat_min,
			lng_min = bounds.southwest.longitude,
			lng_range = bounds.northeast.longitude - lng_min;

			if (idKey === null) {
				idKey = "id";
			}

			var latitude = lat_min + (Math.random() * lat_range);
			var longitude = lng_min + (Math.random() * lng_range);
			var ret = {
				latitude: latitude,
				longitude: longitude,
				title: 'm' + i,
				id: i
			};
			ret[idKey] = i;
			return ret;
		};

		$scope.randomMarkers = [];
		// Get the bounds from the map once it's loaded
		$scope.$watch(function() {
			return $scope.map.bounds;
		}, function(nv, ov) {
		// Only need to regenerate once
			if (!ov.southwest && nv.southwest) {
				var markers = [];
				for (var i = 0; i < 50; i++) {
				  markers.push(createRandomMarker(i, $scope.map.bounds));
				}
				$scope.randomMarkers = markers;
			}
		}, true);
		console.log($scope);
		// Recenter function

		$scope.recenter = function(){
			$geolocation.getCurrentPosition({
		        timeout: 60000
		     }).then(function(position) {
		        $scope.myPosition = position;
	
		     });

		};

	});

	
});