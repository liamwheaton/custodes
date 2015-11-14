angular.module('app.directives')

.directive('custodesLogo', function(){
	return {
		restrict: 'C',
		templateUrl: '../../app/directives/templates/logoTemp.html'
	};
});