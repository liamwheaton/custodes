angular.module('app.directives')

.directive('usernameValidate', function($http, $q){
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ngModel) {

			ngModel.$asyncValidators.username = function(modelValue, viewValue) {

				return $http.get('/api/users/' + viewValue).then(

					function(response) {
						if (response.data) {
						
							return $q.reject("Username in use");
						}
						return true;
					});

			};
		}
	};
});