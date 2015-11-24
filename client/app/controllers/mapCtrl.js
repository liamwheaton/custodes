angular.module('app.controllers')

.controller('mapCtrl', function($scope, User, $routeParams, uiGmapGoogleMapApi, $geolocation) {

	$scope.pageClass = 'page-map';

	$scope.class = 'close';

	$scope.changeClass = function(){
		if ($scope.class === 'close')
			$scope.class = 'open';
		else 
			$scope.class = 'close';
	};

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

	// uiGmapGoogleMapApi.then(function(maps) {

 //    });
	
});