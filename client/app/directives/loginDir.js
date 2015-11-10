angular.module('app.directives')

.directive('loginForm', function(){
	return {
		restrict: 'A',
		templateUrl: '../../app/directives/templates/loginTemp.html' 
	};
});