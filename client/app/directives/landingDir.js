angular.module('app.directives')

.directive('landingOptions', function(){
	return {
		restrict: 'A',
		templateUrl: '../../app/directives/templates/landingTemp.html' 
	};
});