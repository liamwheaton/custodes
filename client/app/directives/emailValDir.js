angular.module('app.directives')

.directive('emailValidate', function($http, $q){
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ngModel) {

			ngModel.$asyncValidators.email = function(modelValue, viewValue) {

				return $http.get('/api/users/' + viewValue).then(

					function(response) {
						if (response.data) {
						
							return $q.reject("Email in use");
						}
						return true;
					});

			};
		}
	};
});