angular.module('app.services')
  
.factory('PinService', function($http){

    var pinService = {};

    pinService.Add = function(latitude, longitude, callback){

        $http.post('/api/pins', {
            userId: '',
            id: '',
            latitude: latitude,
            longitude: longitude,
            message: 'Test message'
        })
        
        .success(function(response){
           
            callback(response);
        })
        .error(function(response){
            callback(response);
        });
    };

    return pinService;

});