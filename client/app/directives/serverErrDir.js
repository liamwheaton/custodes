angular.module('app.directives')

.directive('serverError', function($http, $q) {
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function(scope, element, attrs, ctrl) {
			return element.on('change keyup', function() {
				return scope.$apply(function() {
			  		return ctrl.$setValidity('server', true);
				});
			});
		}
	};
});