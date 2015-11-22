angular.module('app.controllers', []);
angular.module('app.directives', []);
angular.module('app.resources', []);
angular.module('app.services', []);
angular.module('app.filters', []);
angular.module('app.routes', []);
angular.module('app.views', []);

angular.module('app', [

    'ngRoute',
    'ngAnimate',
    'ngResource',
    'ngSanitize',
    'restangular',

    'app.controllers',
    'app.directives',
    'app.resources',
    'app.services',
    'app.filters',
    'app.routes',
    'app.views'
]);

angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);

});
angular.module('app.routes')

.config(["$routeProvider", "RestangularProvider", function($routeProvider, RestangularProvider) {

        RestangularProvider.setBaseUrl('http://localhost:3000');

        $routeProvider

            .when('/', {
            controller: 'landingCtrl',
            templateUrl: 'views/landing.html'
        })

        .when('/login', {
            controller: 'loginCtrl',
            templateUrl: 'views/login.html'
        })

        .when('/register', {
            controller: 'regCtrl',
            templateUrl: 'views/register.html'
        })

        .when('/map', {
            controller: 'mapCtrl',
            templateUrl: 'views/map.html'
        })

        .otherwise({
            redirectTo: '/'
        });

    }])
    .factory('UserRestangular', ["Restangular", function(Restangular) {
        return Restangular.withConfig(function(RestangularConfigurer) {
            RestangularConfigurer.setRestangularFields({
                id: '_id'
            });
        });
    }])
    .factory('User', ["UserRestangular", function(UserRestangular) {
        return UserRestangular.service('user');
    }]);
angular.module('app.controllers')

.controller('landingCtrl', ["$scope", function($scope) {
    $scope.pageClass = 'page-landing';
}]);
angular.module('app.controllers')

.controller('loginCtrl', ["$scope", "User", function($scope, User) {

    $scope.pageClass = 'page-login';

    $scope.users = User.getList().$object;

}]);
angular.module('app.controllers')

.controller('mainCtrl', ["$scope", function($scope) {
    $scope.siteTitle = 'Custodes';
}]);
angular.module('app.controllers')

.controller('mapCtrl', ["$scope", function($scope) {

    $scope.pageClass = 'page-map';

    $scope.class = 'close';

    $scope.changeClass = function() {
        if ($scope.class === 'close')
            $scope.class = 'open';
        else
            $scope.class = 'close';
    };
}]);
angular.module('app.controllers')

.controller('regCtrl', ["$scope", "$http", function($scope, $http) {
    $scope.pageClass = 'page-reg';

    // $http.get('/user')
}]);

angular.module('app.directives')

.directive('landingOptions', function() {
    return {
        restrict: 'A',
        templateUrl: '../../app/directives/templates/landingTemp.html'
    };
});
angular.module('app.directives')

.directive('loginForm', function() {
    return {
        restrict: 'A',
        templateUrl: '../../app/directives/templates/loginTemp.html'
    };
});
angular.module('app.directives')

.directive('custodesLogo', function() {
    return {
        restrict: 'C',
        templateUrl: '../../app/directives/templates/logoTemp.html'
    };
});
angular.module('app.directives')

.directive('drawer', function() {
    return {
        restrict: 'A',
        templateUrl: '../../app/directives/templates/menuTemp.html'
    };
});
angular.module('app.directives')

.directive('navBar', function() {
    return {
        restrict: 'A',
        templateUrl: '../../app/directives/templates/navTemp.html'
    };
});


angular.module('app.directives')

.directive('regForm', function() {
    return {
        restrict: 'A',
        templateUrl: '../../app/directives/templates/regTemp.html'
    };
});
angular.module('app.directives')

.directive('wordMark', function() {
    return {
        restrict: 'A',
        templateUrl: '../../app/directives/templates/wordmarkTemp.html'
    };
});
angular.module("app.views").run(["$templateCache", function($templateCache) {
    $templateCache.put("views/landing.html", "<div class=\"landing-view\" ng-controller=\"landingCtrl\">\n\n	<div>\n		<div class=\"custodes-logo\"></div>\n		<div word-mark></div>\n	</div>\n\n	<div landing-options></div>\n\n	<footer>\n		<div>	\n			<p>© Custodes</p>\n			<a href=\"#\"><i class=\"fa fa-facebook-official\"></i></a>\n			<a href=\"#\"><i class=\"fa fa-twitter-square\"></i></a>\n		</div>\n	</footer>\n	\n</div>\n\n");
    $templateCache.put("views/login.html", "<div class=\"form-view\" ng-controller=\"loginCtrl\">\r\n\r\n	<div class=\"custodes-logo\"></div>\r\n\r\n	<div class=\"content\">\r\n		<div class=\"wrapper\">\r\n			<h1>Login</h1>\r\n		</div>\r\n\r\n		<div login-form></div>\r\n\r\n	</div>\r\n\r\n	<ul ng-repeat=\"user in users\">\r\n		<li>{{ user.username }}</li>\r\n	</ul>\r\n\r\n	<footer>\r\n		<div>	\r\n			<p>© Custodes</p>\r\n			<a href=\"#\"><i class=\"fa fa-facebook-official\"></i></a>\r\n			<a href=\"#\"><i class=\"fa fa-twitter-square\"></i></a>\r\n		</div>\r\n	</footer>\r\n\r\n</div>\r\n");
    $templateCache.put("views/map.html", "<div nav-bar></div>\r\n<div id=\"map\"></div>\r\n<div drawer></drawer>\r\n\r\n");
    $templateCache.put("views/register.html", "<div class=\"form-view\" ng-controller=\"loginCtrl\">\r\n\r\n	<div class=\"custodes-logo\"></div>\r\n\r\n	<div class=\"content\">\r\n		<div class=\"wrapper\">\r\n			<h1>Register</h1>\r\n		</div>\r\n\r\n		<div reg-form></div>\r\n\r\n	</div>\r\n\r\n	<footer>\r\n		<div>	\r\n			<p>© Custodes</p>\r\n			<a href=\"#\"><i class=\"fa fa-facebook-official\"></i></a>\r\n			<a href=\"#\"><i class=\"fa fa-twitter-square\"></i></a>\r\n		</div>\r\n	</footer>\r\n\r\n</div>");
    $templateCache.put("directives/templates/landingTemp.html", "<div class=\"wrapper\">\r\n		\r\n	<a class=\"btn\" href=\"#/map\">Live map</a>\r\n	<a class=\"btn\" href=\"#/login\">Login</a>\r\n	<a class=\"btn\" href=\"#/register\">Sign up</a>\r\n	\r\n</div>");
    $templateCache.put("directives/templates/loginTemp.html", "<div class=\"wrapper\">\r\n\r\n	<form class=\"form-login\" method=\"post\" action=\"/users/login\">\r\n		<div class=\"form-row\">\r\n			<input type=\"text\" value=\"\" placeholder=\"username\" required>\r\n		</div>\r\n\r\n		<div class=\"form-row\">\r\n			<input type=\"password\" value=\"\" placeholder=\"password\" required>\r\n		</div>\r\n\r\n		<button class=\"btn\" href=\"#\">Login</button>\r\n		<a class=\"link\" href=\"#\">I\'ve forgotten my details</a>\r\n		\r\n	</form>\r\n	\r\n	<ul ng-repeat=\'user in users\'>\r\n		<li>{{ user.username }}</li>\r\n	</ul>\r\n	\r\n</div>");
    $templateCache.put("directives/templates/logoTemp.html", "<div class=\"wrapper\">\r\n	<div class=\"logo\">\r\n		<?xml version=\"1.0\" encoding=\"utf-8\"?><svg  version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"viewBox=\"0 0 67.3 65.3\" enable-background=\"new 0 0 67.3 65.3\" xml:space=\"preserve\"><path fill=\"#EEEEEE\" d=\"M35.6,50.5c0,0-0.8,6.8,3.7,11.9l6.5-8.6c0,0-1.2-1.6-1.4-2.8C44.4,51,39.9,54.3,35.6,50.5z\"/><path fill=\"#EEEEEE\" d=\"M46.7,42.5l10.8-12.3c0,0,9.3,3.3,7.5,17.3l-17.9,0.1C47.1,47.6,47.7,45.2,46.7,42.5z\"/><circle fill=\"#EEEEEE\" cx=\"40.4\" cy=\"45.6\" r=\"6.3\"/><path fill=\"#EEEEEE\" d=\"M54.6,32.1l-8.2,9.7c0,0-4.2-5.1-9.3-2.3c-4.1,2.3-4.9,7.1-2.2,10.3c0,0-5.3,7.7-4.2,13.7H12 c0,0,8.2-5,9.1-16.4s7.1-16.3,7.1-16.3S39.5,20.3,54.6,32.1z\"/><path fill=\"#EEEEEE\" d=\"M20.9,43l-9.3-0.1c0,0,0.7-19.6,19.6-26.3c1.5-0.5,14-4.9,26.5,3.7l-6.4,8.7c0,0-9.3-6.5-20.3-1.1 C22.4,32.1,20.9,43,20.9,43z\"/><g id=\"XMLID_2_\"><g><path fill=\"#FE766A\" d=\"M60,5.7l-7.1,10.7c-21.9-7.6-36.4,5.3-40,17.7h-11C5.9,15.5,22.5,1.7,42.2,1.7C48.6,1.7,54.6,3.1,60,5.7z\"/></g> <g></g></g></svg>\r\n	</div>\r\n</div>");
    $templateCache.put("directives/templates/menuTemp.html", "<nav id=\"drawer\" ng-class=\"class\">\r\n	\r\n	<h1>USER</h1>\r\n\r\n	<div class=\"profile\">\r\n\r\n		<h1>YOUR PROFILE</h1>\r\n\r\n		<ul>\r\n			<li>PINGS SENT</li>\r\n			<li>PINS DROPPED</li>\r\n			<li>CONFIRMS GIVEN</li>\r\n			<li>CONFIRMS RECIEVED</li>\r\n		</ul>\r\n\r\n	</div>\r\n	\r\n	<div class=\"controls\">\r\n\r\n		<a href=\"#\">EDIT PROFILE</a>\r\n		<a href=\"#\">LOGOUT</a>\r\n		<a href=\"#\">SAFETY</a>\r\n		<a href=\"#\">TERMS AND CONDITIONS</a>\r\n		\r\n	</div>\r\n	\r\n</nav>");
    $templateCache.put("directives/templates/navTemp.html", "<div class=\"bar\">\r\n	<div>\r\n		<?xml version=\"1.0\" encoding=\"utf-8\"?> <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"viewBox=\"0 0 66.1 63.7\" enable-background=\"new 0 0 66.1 63.7\" xml:space=\"preserve\"> <g id=\"_x36_\"> </g> <g id=\"_x35_\"> </g> <g id=\"_x34_\"> </g> <g id=\"_x33_\"> </g> <g id=\"_x32_\"> </g> <g id=\"_x31_\"> <path fill=\"#EEEEEE\" d=\"M34.9,49.8c0,0-0.8,6.8,3.7,11.9l6.5-8.6c0,0-1.2-1.6-1.4-2.8C43.7,50.4,39.2,53.6,34.9,49.8z\"/> <path fill=\"#EEEEEE\" d=\"M46,41.8l10.8-12.3c0,0,9.3,3.3,7.5,17.3L46.4,47C46.4,47,47,44.6,46,41.8z\"/> <circle fill=\"#EEEEEE\" cx=\"39.7\" cy=\"44.9\" r=\"6.3\"/> <path fill=\"#EEEEEE\" d=\"M53.9,31.5l-8.2,9.7c0,0-4.2-5.1-9.3-2.3c-4.1,2.3-4.9,6.9-2.2,10.1c0,0-5.3,7.5-4.2,13.5H11.3 c0,0,8.2-4.9,9.1-16.2s7.1-16.2,7.1-16.2S38.8,19.6,53.9,31.5z\"/> <path fill=\"#EEEEEE\" d=\"M20.2,42.3l-9.3-0.1c0,0,0.7-19.6,19.6-26.3c1.5-0.5,14-4.9,26.5,3.7l-6.4,8.7c0,0-9.3-6.5-20.3-1.1 C21.7,31.5,20.2,42.3,20.2,42.3z\"/> <g id=\"XMLID_1_\"> <g> <path fill=\"#EEEEEE\" d=\"M59.3,5l-7.1,10.7c-21.9-7.6-36.4,5.3-40,17.7h-11C5.2,14.8,21.8,1,41.5,1C47.9,1,53.9,2.4,59.3,5z\"/> </g> <g> </g> </g> </g> </svg>\r\n	</div>\r\n	<h3>MENU</h3>\r\n	<a id=\"drawer-toggle\" ng-click=\"changeClass()\">\r\n		<svg id=\"burgericon\" xmlns=\"http://www.w3.org/2000/svg\" width=\"60\" height=\"40\">\r\n		    <g class=\"icon\">\r\n		      <rect class=\"frstbar\" ng-class=\"class\" x=\"10\" y=\"8\" width=\"35\" height=\"7\" rx=\"1\" ry=\"1\" fill=\"#eeeeee\" />\r\n		      <rect class=\"scndbar\" ng-class=\"class\" x=\"10\" y=\"20\" width=\"35\" height=\"7\" rx=\"1\" ry=\"1\" fill=\"#eeeeee\" />\r\n		      <rect class=\"thrdbar\" ng-class=\"class\" x=\"10\" y=\"33\" width=\"35\" height=\"7\" rx=\"1\" ry=\"1\" fill=\"#eeeeee\" />\r\n		    </g>\r\n		  </svg>\r\n	</a>\r\n</div>");
    $templateCache.put("directives/templates/regTemp.html", "<div class=\"wrapper\">\r\n\r\n	<form class=\"form-login\" method=\"post\">\r\n\r\n		<div class=\"form-row\">\r\n			<input type=\"text\" value=\"\" placeholder=\"Username\" required>\r\n		</div>\r\n\r\n		<div class=\"form-row\">\r\n			<input type=\"email\" value=\"\" placeholder=\"E-mail\" required>\r\n		</div>\r\n\r\n		<div class=\"form-row\">\r\n			<input type=\"password\" value=\"\" placeholder=\"Password\" required>\r\n		</div>\r\n\r\n		<div class=\"form-row\">\r\n			<input type=\"password\" value=\"\" placeholder=\"Confirm password\">\r\n		</div>\r\n\r\n		<div class=\"terms\">\r\n			<input type=\"checkbox\">\r\n			<label for=\"\">Accept</label>\r\n			<a href=\"#\">Terms and Conditions</a>\r\n		</div>\r\n\r\n		<button class=\"btn\" href=\"#\">Sign up</button>\r\n			\r\n	</form>\r\n	\r\n</div>");
    $templateCache.put("directives/templates/wordmarkTemp.html", "<div class=\"wrapper\">\r\n	\r\n	<?xml version=\"1.0\" encoding=\"utf-8\"?> <svg version=\"1.1\" id=\"_x37_\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"viewBox=\"0 0 194.9 65\" enable-background=\"new 0 0 194.9 65\" xml:space=\"preserve\"> <g> <path fill=\"#EEEEEE\" d=\"M24.2,30.7l0.1,0.2c0,4.3-0.8,7.6-2.6,9.8c-1.8,2.2-4.4,3.3-7.8,3.3s-6.2-1.2-8.3-3.7 c-2.1-2.5-3.1-6-3.1-10.6V17.9c0-4.5,1-8.1,3-10.6c2-2.5,4.7-3.8,8-3.8c3.5,0,6.2,1.1,8,3.3c1.8,2.2,2.7,5.5,2.8,9.9l-0.1,0.2h-6.3 c0.1-2.6-0.2-4.4-0.9-5.6c-0.7-1.1-1.9-1.7-3.6-1.7c-1.5,0-2.6,0.7-3.4,2C9.3,13,8.9,15,8.9,17.8v11.8c0,2.8,0.4,4.8,1.2,6.2 c0.8,1.3,2,2,3.6,2c1.6,0,2.7-0.5,3.3-1.6c0.6-1.1,0.9-2.9,0.8-5.5H24.2z\"/> <path fill=\"#EEEEEE\" d=\"M49.2,4.1v26.7c0,4.2-1,7.4-3.1,9.7c-2.1,2.3-4.8,3.4-8.2,3.4c-3.4,0-6.1-1.1-8.2-3.4 c-2.1-2.3-3.1-5.5-3.1-9.7V4.1h6.5v26.7c0,2.4,0.4,4.2,1.3,5.3c0.8,1.1,2,1.7,3.5,1.7c1.6,0,2.8-0.5,3.6-1.6 c0.8-1.1,1.2-2.9,1.2-5.4V4.1H49.2z\"/> <path fill=\"#EEEEEE\" d=\"M67.2,33.1c0-1.5-0.3-2.7-1-3.6c-0.7-0.9-1.9-1.8-3.5-2.6c-3.5-1.4-6.1-3-7.8-4.8c-1.7-1.8-2.6-4.3-2.6-7.6 c0-3.2,1-5.8,3-7.9c2-2,4.6-3,7.7-3c3.2,0,5.7,1.1,7.7,3.4c2,2.3,2.9,5.1,2.9,8.5l0,0.2h-6.3c0-1.8-0.4-3.3-1.1-4.4 c-0.8-1.1-1.8-1.7-3.2-1.7c-1.3,0-2.3,0.5-3,1.4c-0.7,0.9-1.1,2.1-1.1,3.5c0,1.3,0.4,2.4,1.2,3.2c0.8,0.8,2.2,1.8,4.2,2.8 c3.2,1.3,5.5,2.9,7.1,4.8c1.6,1.9,2.4,4.5,2.4,7.8c0,3.4-1,6.1-2.9,8c-1.9,1.9-4.5,2.9-7.7,2.9c-3.2,0-5.9-1.1-8.2-3.3 c-2.3-2.2-3.5-5.3-3.4-9.4l0-0.2h6.3c0,2.4,0.4,4.2,1.3,5.2c0.9,1.1,2.2,1.6,3.9,1.6c1.4,0,2.4-0.4,3.1-1.3 C66.9,35.7,67.2,34.6,67.2,33.1z\"/> <path fill=\"#EEEEEE\" d=\"M95.5,10.2H88v33.1h-6.5V10.2H74V4.1h21.5V10.2z\"/> <path fill=\"#EEEEEE\" d=\"M119.2,29.2c0,4.6-1.1,8.2-3.2,10.8c-2.1,2.6-4.9,3.9-8.5,3.9c-3.5,0-6.3-1.3-8.4-3.9 c-2.1-2.6-3.2-6.2-3.2-10.8v-11c0-4.6,1.1-8.2,3.2-10.8c2.1-2.6,4.9-3.9,8.4-3.9c3.5,0,6.3,1.3,8.5,3.9c2.1,2.6,3.2,6.2,3.2,10.8 V29.2z M112.8,18.1c0-2.8-0.4-4.9-1.3-6.4c-0.9-1.4-2.2-2.1-3.9-2.1c-1.7,0-3,0.7-3.8,2.1c-0.9,1.4-1.3,3.6-1.3,6.4v11.1 c0,2.8,0.4,5,1.3,6.4c0.9,1.4,2.2,2.1,3.8,2.1c1.7,0,3-0.7,3.8-2.1c0.9-1.4,1.3-3.6,1.3-6.4V18.1z\"/> <path fill=\"#EEEEEE\" d=\"M122.3,43.3V4.1h10.1c3.4,0,6.2,1.5,8.5,4.6c2.2,3,3.3,7,3.3,11.8V27c0,4.8-1.1,8.7-3.3,11.8 c-2.2,3-5,4.6-8.5,4.6H122.3z M128.8,10.2v27h3.2c1.8,0,3.2-0.9,4.2-2.8c1-1.9,1.5-4.3,1.5-7.4v-6.7c0-3.1-0.5-5.5-1.5-7.4 c-1-1.9-2.4-2.8-4.2-2.8H128.8z\"/> <path fill=\"#EEEEEE\" d=\"M165.4,26.1h-11.2v11.1h13.2v6.1h-19.7V4.1h19.6v6.1h-13.1V20h11.2V26.1z\"/> <path fill=\"#EEEEEE\" d=\"M186,33.1c0-1.5-0.3-2.7-1-3.6c-0.7-0.9-1.9-1.8-3.5-2.6c-3.5-1.4-6.1-3-7.8-4.8c-1.7-1.8-2.6-4.3-2.6-7.6 c0-3.2,1-5.8,3-7.9c2-2,4.6-3,7.7-3c3.2,0,5.7,1.1,7.7,3.4c2,2.3,2.9,5.1,2.9,8.5l0,0.2H186c0-1.8-0.4-3.3-1.1-4.4 c-0.8-1.1-1.8-1.7-3.2-1.7c-1.3,0-2.3,0.5-3,1.4c-0.7,0.9-1.1,2.1-1.1,3.5c0,1.3,0.4,2.4,1.2,3.2c0.8,0.8,2.2,1.8,4.2,2.8 c3.2,1.3,5.5,2.9,7.1,4.8c1.6,1.9,2.4,4.5,2.4,7.8c0,3.4-1,6.1-2.9,8c-1.9,1.9-4.5,2.9-7.7,2.9c-3.2,0-5.9-1.1-8.2-3.3 c-2.3-2.2-3.5-5.3-3.4-9.4l0-0.2h6.3c0,2.4,0.4,4.2,1.3,5.2c0.9,1.1,2.2,1.6,3.9,1.6c1.4,0,2.4-0.4,3.1-1.3 C185.6,35.7,186,34.6,186,33.1z\"/> </g> <g> <path fill=\"#FE766A\" d=\"M13.1,58.3L13.1,58.3l1.6-8.7h2.1l-2.5,12.6h-2l-2-8.3h0l-2,8.3h-2L3.8,49.6h2.1l1.5,8.7l0,0l2-8.7h1.6 L13.1,58.3z\"/> <path fill=\"#FE766A\" d=\"M23.3,59.5h-3.7l-0.7,2.7h-2.2l3.7-12.6h2.2l3.7,12.6H24L23.3,59.5z M20.1,57.5h2.7l-1.3-5h0L20.1,57.5z\"/> <path fill=\"#FE766A\" d=\"M34,51.6h-3v10.7h-2.1V51.6h-3v-2H34V51.6z\"/> <path fill=\"#FE766A\" d=\"M42.6,58L42.6,58c0,1.4-0.3,2.5-1,3.3c-0.7,0.8-1.7,1.2-3,1.2c-1.3,0-2.3-0.5-3.1-1.5 c-0.8-1-1.2-2.2-1.2-3.8v-2.5c0-1.5,0.4-2.8,1.2-3.8c0.8-1,1.8-1.5,3-1.5c1.3,0,2.3,0.4,3.1,1.2c0.7,0.8,1.1,1.9,1.1,3.3l0,0.1 h-2.1c0-0.8-0.2-1.5-0.5-1.9c-0.3-0.4-0.9-0.7-1.6-0.7c-0.6,0-1.1,0.3-1.5,0.9c-0.4,0.6-0.6,1.4-0.6,2.4v2.5c0,1,0.2,1.8,0.6,2.4 c0.4,0.6,0.9,0.9,1.6,0.9c0.7,0,1.2-0.2,1.5-0.6c0.3-0.4,0.5-1.1,0.5-1.9H42.6z\"/> <path fill=\"#FE766A\" d=\"M52.4,62.3h-2.1V57h-4.3v5.3h-2.1V49.6h2.1v5.4h4.3v-5.4h2.1V62.3z\"/> <path fill=\"#FE766A\" d=\"M56.4,62.3h-2.1V49.6h2.1V62.3z\"/> <path fill=\"#FE766A\" d=\"M66.9,62.3h-2.1l-4.3-8.6l0,0v8.6h-2.1V49.6h2.1l4.3,8.6l0,0v-8.6h2.1V62.3z\"/> <path fill=\"#FE766A\" d=\"M76.7,60.5c-0.3,0.5-0.8,0.9-1.5,1.3c-0.7,0.4-1.5,0.6-2.5,0.6c-1.3,0-2.4-0.5-3.2-1.4 c-0.8-1-1.2-2.2-1.2-3.7v-2.6c0-1.5,0.4-2.8,1.2-3.7c0.8-1,1.8-1.4,3.1-1.4c1.3,0,2.3,0.4,3,1.1c0.7,0.7,1,1.7,1.1,3l0,0.1h-2 c0-0.7-0.2-1.2-0.5-1.6c-0.3-0.4-0.8-0.6-1.4-0.6c-0.7,0-1.2,0.3-1.6,0.9c-0.4,0.6-0.6,1.4-0.6,2.3v2.7c0,1,0.2,1.7,0.6,2.3 c0.4,0.6,1,0.9,1.7,0.9c0.5,0,0.9-0.1,1.2-0.2c0.3-0.1,0.5-0.3,0.7-0.4v-2.3h-1.9v-1.8h4V60.5z\"/> <path fill=\"#FE766A\" d=\"M88.9,51.6h-3v10.7h-2.1V51.6h-3v-2h8.1V51.6z\"/> <path fill=\"#FE766A\" d=\"M98.4,62.3h-2.1V57h-4.3v5.3h-2.1V49.6h2.1v5.4h4.3v-5.4h2.1V62.3z\"/> <path fill=\"#FE766A\" d=\"M106.7,56.7h-4.4v3.6h5.2v2h-7.3V49.6h7.3v2h-5.1v3.2h4.4V56.7z\"/> <path fill=\"#FE766A\" d=\"M120.3,58.3L120.3,58.3l1.6-8.7h2.1l-2.5,12.6h-2l-2-8.3h0l-2,8.3h-2L111,49.6h2.1l1.5,8.7l0,0l2-8.7h1.6 L120.3,58.3z\"/> <path fill=\"#FE766A\" d=\"M130.5,59.5h-3.7l-0.7,2.7h-2.2l3.7-12.6h2.2l3.6,12.6h-2.2L130.5,59.5z M127.3,57.5h2.7l-1.3-5h0 L127.3,57.5z\"/> <path fill=\"#FE766A\" d=\"M141.1,51.6h-3v10.7h-2.1V51.6h-3v-2h8.1V51.6z\"/> <path fill=\"#FE766A\" d=\"M149.6,58L149.6,58c0,1.4-0.3,2.5-1,3.3c-0.7,0.8-1.7,1.2-3,1.2c-1.3,0-2.3-0.5-3.1-1.5 c-0.8-1-1.2-2.2-1.2-3.8v-2.5c0-1.5,0.4-2.8,1.2-3.8c0.8-1,1.8-1.5,3-1.5c1.3,0,2.3,0.4,3.1,1.2c0.7,0.8,1.1,1.9,1.1,3.3l0,0.1 h-2.1c0-0.8-0.2-1.5-0.5-1.9c-0.3-0.4-0.9-0.7-1.6-0.7c-0.6,0-1.1,0.3-1.5,0.9c-0.4,0.6-0.6,1.4-0.6,2.4v2.5c0,1,0.2,1.8,0.6,2.4 c0.4,0.6,0.9,0.9,1.6,0.9c0.7,0,1.2-0.2,1.5-0.6c0.3-0.4,0.5-1.1,0.5-1.9H149.6z\"/> <path fill=\"#FE766A\" d=\"M159.4,62.3h-2.1V57h-4.3v5.3h-2.1V49.6h2.1v5.4h4.3v-5.4h2.1V62.3z\"/> <path fill=\"#FE766A\" d=\"M164.1,49.6l2.7,9.3h0l2.7-9.3h2.8v12.6h-2.1v-3.8l0.2-5.6l0,0l-2.9,9.4h-1.4l-2.8-9.3l0,0l0.2,5.5v3.8 h-2.1V49.6H164.1z\"/> <path fill=\"#FE766A\" d=\"M181,56.7h-4.4v3.6h5.2v2h-7.3V49.6h7.3v2h-5.1v3.2h4.4V56.7z\"/> <path fill=\"#FE766A\" d=\"M191.6,62.3h-2.1l-4.3-8.6l0,0v8.6H183V49.6h2.1l4.3,8.6l0,0v-8.6h2.1V62.3z\"/> </g> </svg>\r\n\r\n</div>");
}]);