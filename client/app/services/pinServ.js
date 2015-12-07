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

    pinService.Retrieve = function(callback) {

        $http.get('/api/pins')
            .success(function(Pin) {
                
                callback(Pin);
            })
            .error(function(Pin) {
                callback(Pin);
            });

    };

    return pinService;

});