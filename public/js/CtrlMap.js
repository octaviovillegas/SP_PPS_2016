angular.module('starter')

.controller('mapaCtrl', function($scope, $stateParams,$firebaseArray,$timeout,Info) {

  var options = {
                  enableHighAccuracy: true
                };

  navigator.geolocation.getCurrentPosition(function(pos) {
                         $scope.inicial=({
                            "lat":pos.coords.latitude,
                            "lon": pos.coords.longitude
                          });               
                      },
                      function(error) {                    
                          alert('Unable to get location: ' + error.message);
                      }, options);

  $scope.marcasMapa =Info;
});



