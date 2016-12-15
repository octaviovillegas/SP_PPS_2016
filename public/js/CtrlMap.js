angular.module('starter')

.controller('mapaCtrl', function($scope, $stateParams,$firebaseArray,$timeout,Info, $ionicPopup,$filter,Admin) {

  $scope.marcasMapa =Info;
  var infosRef = new Firebase("https://triggered-4e761.firebaseio.com/SOS");
  var lastid=0;
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

    infosRef.limit(1).once("child_added", function (snapshot) {
      lastid=(snapshot.val().id==undefined)?1:snapshot.val().id+1;
      console.log(lastid);
    });
   
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
                            "usuName": firebase.auth().currentUser.displayName,
                            "id":lastid,
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



