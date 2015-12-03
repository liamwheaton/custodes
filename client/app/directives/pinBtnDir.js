angular.module('app.directives')

.directive('pinBtn', function(){
	return {
		restrict: 'A',
		template: '<button class="pin mapbtn" ng-click="add()"><i class="fa fa-video-camera"></i></button>' 
	};
});