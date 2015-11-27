angular.module('app.directives')

.directive('centerBtn', function(){
	return {
		restrict: 'A',
		template: '<button class="center mapbtn" ng-click="recenter()"><i class="fa fa-crosshairs"></i></button>' 
	};
});