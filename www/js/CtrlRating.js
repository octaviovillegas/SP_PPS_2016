angular.module('starter')

.controller('RatingCtrl', function($scope, $ionicPopup,$stateParams,$filter,Info, $timeout, $firebaseArray) {


  $scope.info =Info;
  console.log($scope.info.tipo);
  $scope.usu = firebase.auth().currentUser.uid;

  // set the rate and max variables
  $scope.rating = {};
  $scope.rating.rate = 3;
  $scope.rating.max = 5;


  $scope.showPopup = function(id) {

    //Rating
    var infosRef = new Firebase("https://triggered-4e761.firebaseio.com/Ratings");
    var ratings = $firebaseArray(infosRef);
    console.info(ratings);
    var flagPuntuado = false;

    ratings.$loaded(function(){
      $.each(ratings, function(i){
        if(ratings[i].SosId == id){
          flagPuntuado = true;
        }
      })
      
      if(!flagPuntuado){
        if(!$scope.rating.comment){
          $scope.rating.comment = "";
        }
        var myPopup = $ionicPopup.show({
               template: 'Puntuacion y comentario<br>'
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
                               ratings.$add({
                                 "rate":$scope.rating.rate,
                                  "SosId":id,
                                  "comentario":$scope.rating.comment,
                                  "date": $filter('date')(new Date(), 'dd/MM/yyyy'),
                                  "usuario": firebase.auth().currentUser.displayName
                                });               
                            }, 
                            function(error) {                    
                                alert('Unable to get location: ' + error.message);
                            }, options);
                                 
                        }
                  }
               ]
          });
        }else{
          var myPopup2= $ionicPopup.show({
             template: '<center> Este SOS ya fue puntuado </center>',
             title: 'SOS'
          });
          $timeout(function(){
            myPopup2.close();

          }, 1000);
        }
      })
    }
});



