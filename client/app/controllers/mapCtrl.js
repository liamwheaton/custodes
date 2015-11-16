angular.module('app.controllers')

.controller('mapCtrl', function($scope) {

	$scope.pageClass = 'page-map';

	$scope.class = 'close';

	$scope.changeClass = function(){
		if ($scope.class === 'close')
			$scope.class = 'open';
		else 
			$scope.class = 'close';
	};
});