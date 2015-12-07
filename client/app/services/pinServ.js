angular.module('app.services')
  
.factory('PinService', function($http){

    var pinService = {};

    pinService.Add = function(pinData, callback){

        $http.post('/api/pins', pinData)
            .success(function(response) {
                callback(response);
            })
            .error(function(response) {
                callback(response);
            });
    };

    return pinService;

});