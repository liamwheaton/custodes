angular.module('app.directives')

.directive('centerBtn', function(){
	return {
		restrict: 'A',
		template: '<button class="center mapbtn"><i class="fa fa-crosshairs"></i></button>' 
	};
});