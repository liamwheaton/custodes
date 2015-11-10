angular.module('app.directives')

.directive('custodesLogo', function(){
	return {
		restrict: 'A',
		templateUrl: '../../app/directives/templates/logoTemp.html' 
	};
});