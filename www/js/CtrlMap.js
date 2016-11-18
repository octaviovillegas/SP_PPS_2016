angular.module('starter')

.controller('mapaCtrl', function($scope, $stateParams,$firebaseArray,$timeout,Info, $ionicPopup,$filter,Admin) {

  $scope.marcasMapa =Info;

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


  $scope.infos = Info;

   
    // When button is clicked, the popup will be shown...
   $scope.showPopup = function(tipo) {
    console.log(firebase.User);
      $scope.data = {}
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         template: 'Seguro que queres mandar un SOS?',
         title: 'Enviar SOS',
         scope: $scope,
      
         buttons: [
            { text: 'Cancel' }, 
            {text: '<b>Save</b>',
             type: 'button-positive',
                  onTap: function(e) {
                    var options = {
                        enableHighAccuracy: true
                    };
                    var latlon;
                      navigator.geolocation.getCurrentPosition(function(pos) {
                         $scope.infos.$add({
                           "tipo": tipo,
                            "lat": pos.coords.latitude,
                            "lon": pos.coords.longitude,
                            "usu": firebase.auth().currentUser.uid,
                            "date": $filter('date')(new Date(), 'dd/MM/yyyy')
                          });               
                      }, 
                      function(error) {                    
                          alert('Unable to get location: ' + error.message);
                      }, options);

                          
                           
                  }
            }
         ]
      });

      myPopup.then(function(res) {
        
      });    
   };

});



