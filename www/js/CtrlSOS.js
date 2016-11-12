angular.module('starter')

.controller('SOSCtrl', function($scope, $ionicPopup,$stateParams,$filter,Info) {
  
   $scope.infos = Info;
   var infosRef = new Firebase("https://triggered-4e761.firebaseio.com/SOS");
   var lastid=0;
    // When button is clicked, the popup will be shown...
   $scope.showPopup = function(tipo) {
      $scope.data = {}
      infosRef.limit(1).once("child_added", function (snapshot) {
        lastid=(snapshot.val().id==undefined)?1:snapshot.val().id+1;
        console.log(lastid);
      });
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
                            "lat":pos.coords.latitude,
                            "lon": pos.coords.longitude,
                            "usu":"pepe",
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



