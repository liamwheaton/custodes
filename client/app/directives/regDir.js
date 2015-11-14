angular.module('app.directives')

.directive('regForm', function(){
	return {
		restrict: 'A',
		templateUrl: '../../app/directives/templates/regTemp.html' 
	};
});