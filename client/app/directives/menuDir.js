angular.module('app.directives')

.directive('drawer', function(){
	return {
		restrict: 'A',
		templateUrl: '../../app/directives/templates/menuTemp.html' 
	};
});