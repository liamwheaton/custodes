angular.module('app.directives')

.directive('navBar', function(){
	return {
		restrict: 'A',
		templateUrl: '../../app/directives/templates/navTemp.html' 
	};
});