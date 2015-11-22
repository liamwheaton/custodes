angular.module('app.controllers')

.controller('mapCtrl', function($scope, User, $routeParams, uiGmapGoogleMapApi) {

	$scope.map = {
		center: {
			latitude: 45,
			longitude: -73
		},
		zoom: 8
	};

	$scope.pageClass = 'page-map';

	$scope.class = 'close';

	$scope.changeClass = function(){
		if ($scope.class === 'close')
			$scope.class = 'open';
		else 
			$scope.class = 'close';
	};

	$scope.users = User.one($routeParams.id).get().$object;

	uiGmapGoogleMapApi.then(function(maps) {

    });
	
});