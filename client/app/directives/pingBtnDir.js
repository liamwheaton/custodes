angular.module('app.directives')

.directive('pingBtn', function(){
	return {
		restrict: 'A',
		template: '<button class="ping mapbtn"><i class="fa fa-car"></i></button>' 
	};
});