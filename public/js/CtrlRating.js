angular.module('starter')

.controller('RatingCtrl', function($scope, $ionicPopup,$stateParams,$filter,Info,Ratings) {
	 $scope.infos =Info;
   // set the rate and max variables
  $scope.rating = {};
  $scope.rating.rate = 3;
  $scope.rating.max = 5;
  $scope.showPopup = function(tipo) {
  var myPopup = $ionicPopup.show({
         template: 'Seguro que queres mandar un SOS?<br>'
         +'<div>'
		 +'<rating ng-model="rating.rate" max="rating.max"></rating>'
		 +'<textarea ng-model="rating.comment"></textarea>'
		 +'</div>',
         title: 'Rate',
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
                         Ratings.$add({
                           "rate":$scope.rating.rate,
                            "usu":"pepe",
                            "comentario":$scope.rating.comment,
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
	}
});



