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
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'restangular',
	'uiGmapgoogle-maps',
	'ngGeolocation',

	
	'app.controllers',
	'app.directives',
	'app.resources',
	'app.services',
	'app.filters',
	'app.routes',
	'app.views'
])
// Authentification
.run(function($http, $rootScope, $location, $cookieStore){

	// Object to hold globals, recover from cookieStore 
	$rootScope.globals = $cookieStore.get('globals') || {};

	// if current user is set, set http requests
	if($rootScope.globals.currentUser) {
		$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
	}

	// Check if user is logged in on location route changes
	// $rootScope.$on('$locationChangeStart', function(event, next, current){

	// 	// redirect if not logged in
	// 	if (($location.path() !== '/login' && $location.path() !== '/register') && !$rootScope.globals.currentUser) {
	// 		$location.path('/login');
	// 	}
	// });

});

angular.element(document).ready(function() {
	angular.bootstrap(document, ['app']);

});



