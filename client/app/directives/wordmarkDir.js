angular.module('app.directives')

.directive('wordMark', function(){
	return {
		restrict: 'A',
		templateUrl: '../../app/directives/templates/wordmarkTemp.html'
	};
});