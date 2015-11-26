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

		// var marker1 = {id:1, latitude: -36.849562600000006, longitude: 174.7529218};
		// $scope.markers = [];
		// $scope.markers[0] = marker1;

		
		
		// $scope.marker = {
		// 	coords:{
		// 		latitude: newValue.latitude,
		// 		longitude: newValue.longitude
		// 	}
		// };

	});

	console.log($rootScope);
	
	
	
});